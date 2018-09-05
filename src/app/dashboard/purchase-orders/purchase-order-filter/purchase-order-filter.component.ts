import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatBottomSheetRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import moment from 'moment';

import * as fromRoot from "../../../shared/reducers";
import * as purchaseOrderActions from "../../../shared/actions/purchase-order.actions";
import { User } from '../../../shared/models';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-purchase-order-filter',
  templateUrl: './purchase-order-filter.component.html',
  styleUrls: ['./purchase-order-filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class PurchaseOrderFilterComponent implements OnInit {

  public filterForm: FormGroup;
  public users: User[] = [];
  public loggedUser: User = new User({});
  public startMax: Date = new Date(moment().subtract(1, 'days').format());
  public endMin: Date;
  public endMax: Date = new Date();

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderFilterComponent>
  ) {
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role && user.role != 'distributor') {
        this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderFilterDataAction);
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this._store.select(fromRoot.getPurchaseOrderDistributors).subscribe(users => this.users = users);
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["start"]) {
        this.start.patchValue(new Date(params["start"]), { emitEvent: false });
      }
      if (params["end"]) {
        this.end.patchValue(new Date(params["end"]), { emitEvent: false });
      }
      if (params["user_id"]) {
        this.user_id.patchValue(params["user_id"], { emitEvent: false });
      }
    });
    this.start.valueChanges.subscribe(value => {
      this.end.value ? null : this.end.patchValue(new Date(), { emitEvent: false });
      this.endMin = new Date(moment(this.start.value).add(1, "days").format());
    });
    this.end.valueChanges.subscribe(value => {
      this.start.value ? null : this.start.patchValue(moment(this.start.value).subtract(1, 'days').format(), { emitEvent: false });
    });
  }

  buildForm() {
    this.filterForm = this._fb.group({
      start: null,
      end: null,
      user_id: null
    });
  }

  get start(): FormControl {
    return this.filterForm.get('start') as FormControl;
  }

  get end(): FormControl {
    return this.filterForm.get('end') as FormControl;
  }

  get user_id(): FormControl {
    return this.filterForm.get('user_id') as FormControl;
  }

  closeSheet() {
    this._router.navigate(["dashboard", "purchase-orders"], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        end: moment(this.end.value).format('YYYY-MM-DD'),
        start: moment(this.start.value).format('YYYY-MM-DD'),
        user_id: this.user_id.value
      },
    });
    this.bottomSheetRef.dismiss();
  }

}

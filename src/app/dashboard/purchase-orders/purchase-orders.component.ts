import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';

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
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class PurchaseOrdersComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public filterForm: FormGroup;

  public startMax: Date = new Date(moment().subtract(1, 'days').format());
  public endMin: Date;
  public endMax: Date = new Date();
  
  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (!this._activatedRoute.snapshot.queryParams["status"]) {
        if (user.role == 'distributor') {
          this._router.navigate(["dashboard", "purchase-orders"], { queryParams: { status: 'can_modify' } });
        }
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["start_date"]) {
        this.start.patchValue(new Date(params["start_date"]));
      }
      if (params["end_date"]) {
        this.end.patchValue(new Date(params["end_date"]));
      }
    });
    this.start.valueChanges.subscribe(value => {
      this.end.value ? null : this.end.patchValue(new Date(), { emitEvent: false })
      this.endMin = new Date(moment(this.start.value).add(1, "days").format());
      this._router.navigate(["dashboard", "purchase-orders"], {
        queryParams: { ...this._activatedRoute.snapshot.queryParams, "start_date": moment(this.start.value).format('YYYY-MM-DD') },
      });
    });
    this.end.valueChanges.subscribe(value => {
      this._router.navigate(["dashboard", "purchase-orders"], {
        queryParams: { ...this._activatedRoute.snapshot.queryParams, "end_date": moment(this.end.value).format('YYYY-MM-DD') },
      });
    });
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  buildForm() {
    this.filterForm = this._fb.group({
      start: null,
      end: null
    });
  }

  get start(): FormControl {
    return this.filterForm.get('start') as FormControl;
  }

  get end(): FormControl {
    return this.filterForm.get('end') as FormControl;
  }

  getQueryParams(type: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: type }
  }

}

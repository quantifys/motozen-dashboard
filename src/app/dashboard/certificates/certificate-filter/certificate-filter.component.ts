import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatBottomSheetRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';
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
  selector: 'app-certificate-filter',
  templateUrl: './certificate-filter.component.html',
  styleUrls: ['./certificate-filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class CertificateFilterComponent implements OnInit {

  public filterForm: FormGroup;
  public loggedUser: User = new User({});
  public users: User[] = [];

  public startMax: Date = new Date(moment().subtract(1, 'days').format());
  public endMin: Date;
  public endMax: Date = new Date();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _bottomSheetRef: MatBottomSheetRef<CertificateFilterComponent>
  ) {
    this._store.dispatch(new userActions.FetchAllUsersAction);
    this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
    this._store.select(fromRoot.getAllUsers).subscribe(users => this.users = users);
  }

  ngOnInit() {
    this.buildForm();
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["start"]) {
        this.start.patchValue(new Date(params["start"]), { emitEvent: false });
      }
      if (params["end"]) {
        this.end.patchValue(new Date(params["end"]), { emitEvent: false });
      }
      if (params["user_id"]) {
        this.user_id.patchValue(+params["user_id"], { emitEvent: false });
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
      user_id: null,
      search: null,
      search_type: null
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

  get search(): FormControl {
    return this.filterForm.get('search') as FormControl;
  }

  get search_type(): FormControl {
    return this.filterForm.get('search_type') as FormControl;
  }

  closeSheet() {
    this._router.navigate(["dashboard", "certificates"], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        end: this.end.value ? moment(this.end.value).format('YYYY-MM-DD') : null,
        start: this.start.value ? moment(this.start.value).format('YYYY-MM-DD') : null,
        user_id: this.user_id.value ? this.user_id.value : null
      },
    });
    this._bottomSheetRef.dismiss();
  }

}

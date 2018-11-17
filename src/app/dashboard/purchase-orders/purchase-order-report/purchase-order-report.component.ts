import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatBottomSheetRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import moment from 'moment';

import * as fromRoot from '../../../shared/reducers';
import * as reportActions from '../../../shared/actions/reports.actions';
import { User, State } from 'src/app/shared/models';
import { RtoService } from 'src/app/shared/services/rto.service';
import { CsvReportService } from 'src/app/shared/services/csv-report.service';

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
  selector: 'app-purchase-order-report',
  templateUrl: './purchase-order-report.component.html',
  styleUrls: ['./purchase-order-report.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class PurchaseOrderReportComponent implements OnInit, OnDestroy {

  public reportForm: FormGroup;
  public users: User[] = [];
  public loggedUser: User = new User({});
  public startMax: Date = new Date(moment().subtract(1, 'days').format());
  public endMin: Date;
  public endMax: Date = new Date();
  public states: State[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderReportComponent>,
    private _rtoService: RtoService,
    private _csvService: CsvReportService
  ) {
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role && user.role != 'distributor') {
        this._store.dispatch(new reportActions.FetchPOSummaryMFGFormDataAction);
      } else {
        this._store.dispatch(new reportActions.POSummaryClearAction);
      }
    });
    this.states = this._rtoService.getStates();
    this._csvService.subscribeToPOSummary();
  }

  ngOnInit() {
    this.buildForm();
    this._store.select(fromRoot.getDistributorsForSummary).subscribe(users => this.users = users);
    this.start.valueChanges.subscribe(value => {
      this.end.value ? null : this.end.patchValue(new Date(), { emitEvent: false });
      this.endMin = new Date(moment(this.start.value).add(1, "days").format());
    });
    this.end.valueChanges.subscribe(value => {
      this.start.value ? null : this.start.patchValue(moment(this.start.value).subtract(1, 'days').format(), { emitEvent: false });
    });
  }

  ngOnDestroy() {
    this._csvService.unsubscribe();
  }

  buildForm() {
    this.reportForm = this._fb.group({
      start: [null, Validators.required],
      end: [null, Validators.required],
      dist_id: null,
      state_code: null,
      interval: ['month', Validators.required]
    });
  }

  get start(): FormControl {
    return this.reportForm.get('start') as FormControl;
  }

  get end(): FormControl {
    return this.reportForm.get('end') as FormControl;
  }

  get dist_id(): FormControl {
    return this.reportForm.get('dist_id') as FormControl;
  }

  get state_code(): FormControl {
    return this.reportForm.get('state_code') as FormControl;
  }

  get interval(): FormControl {
    return this.reportForm.get('interval') as FormControl;
  }

  closeSheet() {
    let formData: any = {
      dist_id: this.dist_id.value,
      start: this.start.value ? moment(this.start.value).format('YYYY-MM-DD') : null,
      end: this.end.value ? moment(this.end.value).format('YYYY-MM-DD') : null,
      state_code: this.state_code.value,
      interval: this.interval.value
    };
    formData["dist_id"] ? null : delete formData["dist_id"]
    formData["start"] ? null : delete formData["start"]
    formData["end"] ? null : delete formData["end"]
    formData["state_code"] ? null : delete formData["state_code"]
    formData["interval"] ? null : formData["interval"] = 'month'
    this._store.dispatch(new reportActions.FetchPOSummaryMFGAction(formData));
    this.bottomSheetRef.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatBottomSheetRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';

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
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class TransactionFilterComponent implements OnInit {

  public filterForm: FormGroup;

  public startMax: Date = new Date(moment().subtract(1, 'days').format());
  public endMin: Date;
  public endMax: Date = new Date();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<TransactionFilterComponent>
  ) { }

  ngOnInit() {
    this.buildForm();
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["start"]) {
        this.start.patchValue(new Date(params["start"]), { emitEvent: false });
      }
      if (params["end"]) {
        this.end.patchValue(new Date(params["end"]), { emitEvent: false });
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
      start: [null, Validators.required],
      end: [null, Validators.required]
    });
  }

  get start(): FormControl {
    return this.filterForm.get('start') as FormControl;
  }

  get end(): FormControl {
    return this.filterForm.get('end') as FormControl;
  }

  closeSheet() {
    this._router.navigate(["dashboard", "transactions"], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        end: moment(this.end.value).format('YYYY-MM-DD'),
        start: moment(this.start.value).format('YYYY-MM-DD')
      },
    });
    this.bottomSheetRef.dismiss();
  }

}

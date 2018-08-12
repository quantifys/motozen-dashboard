import { Component, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS, MatBottomSheetRef } from '@angular/material';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

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

  public startMax: Date = new Date(moment().subtract(1, 'days').format());
  public endMin: Date;
  public endMax: Date = new Date();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderFilterComponent>
  ) { }

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

  closeSheet() {
    this.bottomSheetRef.dismiss();
  }

}

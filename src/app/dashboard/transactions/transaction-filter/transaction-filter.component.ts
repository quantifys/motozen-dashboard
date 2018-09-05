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

  public transactables: any[] = [
    {
      display: 'Salary slip',
      value: 'SalarySlip'
    },
    {
      display: 'Income',
      value: 'Income'
    },
    {
      display: 'Expense',
      value: 'Expense'
    },
    {
      display: 'Receive note',
      value: 'ReceiveNote'
    },
    {
      display: 'Purchase order',
      value: 'PurchaseOrder'
    }
  ];
  public categories: any[] = [
    {
      display: 'Expense',
      value: 'expense'
    },
    {
      display: 'Income',
      value: 'income'
    }
  ];

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
      if (params["transactable_type"]) {
        this.transactable_type.patchValue(params["transactable_type"], { emitEvent: false });
      }
      if (params["category"]) {
        this.category.patchValue(params["category"], { emitEvent: false });
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
      end: [null, Validators.required],
      transactable_type: null,
      category: null
    });
  }

  get start(): FormControl {
    return this.filterForm.get('start') as FormControl;
  }

  get end(): FormControl {
    return this.filterForm.get('end') as FormControl;
  }

  get transactable_type(): FormControl {
    return this.filterForm.get('transactable_type') as FormControl;
  }

  get category(): FormControl {
    return this.filterForm.get('category') as FormControl;
  }

  closeSheet() {
    let newParams: any = {};
    this.transactable_type.value ? newParams["transactable_type"] = this.transactable_type.value : null
    this.category.value ? newParams["category"] = this.category.value : null
    this._router.navigate(["dashboard", "transactions"], {
      queryParams: {
        page: this._activatedRoute.snapshot.queryParams["page"],
        per_page: this._activatedRoute.snapshot.queryParams["per_page"],
        end: moment(this.end.value).format('YYYY-MM-DD'),
        start: moment(this.start.value).format('YYYY-MM-DD'),
        ...newParams
      },
    });
    this.bottomSheetRef.dismiss();
  }

  clearFilters() {
    this._router.navigate(["dashboard", "transactions"], {
      queryParams: {
        page: this._activatedRoute.snapshot.queryParams["page"],
        per_page: this._activatedRoute.snapshot.queryParams["per_page"]
      },
    });
    this.bottomSheetRef.dismiss();
  }

}

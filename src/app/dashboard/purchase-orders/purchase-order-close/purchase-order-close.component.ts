import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';

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
  selector: 'app-purchase-order-close',
  templateUrl: './purchase-order-close.component.html',
  styleUrls: ['./purchase-order-close.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PurchaseOrderCloseComponent implements OnInit, OnDestroy {

  private formSubscription$: Subscription = new Subscription();
  public total: number = 0;
  public closeForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderCloseComponent>
  ) { }

  ngOnInit() {
    this.buildForm();
    this.formSubscription$ = this.closeForm.valueChanges.subscribe(value =>
      this.total = Math.round(this.shipping_amt.value + (this.shipping_amt.value * this.shipping_gst.value * 0.01)));
  }

  ngOnDestroy() {
    this.formSubscription$.unsubscribe();
  }

  buildForm() {
    this.closeForm = this._fb.group({
      id: null,
      tracking_no: [null, Validators.required],
      shipping_date: [null, Validators.required],
      shipping_amt: [null, [Validators.required, Validators.min(0)]],
      shipping_gst: [null, [Validators.required, Validators.min(0), Validators.max(30)]],
      shipping_gstn: [null, [Validators.minLength(15), Validators.maxLength(15), Validators.pattern("[a-zA-Z0-9]+")]]
    });
  }

  get shipping_amt(): FormControl {
    return this.closeForm.get('shipping_amt') as FormControl;
  }

  get shipping_gst(): FormControl {
    return this.closeForm.get('shipping_gst') as FormControl;
  }

  get shipping_gstn(): FormControl {
    return this.closeForm.get('shipping_gstn') as FormControl;
  }

  closePO() {
    // let formData: any = this.closeForm.value;
    // formData["shipping_date"] = moment(formData["shipping_date"]).format("")
    this._store.dispatch(new purchaseOrderActions.ClosePurchaseOrderAction({
      purchase_order: this.closeForm.value
    }));
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

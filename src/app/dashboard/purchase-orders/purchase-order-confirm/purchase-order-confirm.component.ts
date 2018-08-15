import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';

@Component({
  selector: 'app-purchase-order-confirm',
  templateUrl: './purchase-order-confirm.component.html',
  styleUrls: ['./purchase-order-confirm.component.scss']
})
export class PurchaseOrderConfirmComponent implements OnInit, OnDestroy {

  private formSubscription$: Subscription = new Subscription();
  public total: number = 0;
  public confirmForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderConfirmComponent>
  ) { }

  ngOnInit() {
    this.buildForm();
    this.formSubscription$ = this.confirmForm.valueChanges.subscribe(value =>
      this.total = Math.round(this.amount_paid.value + (this.amount_paid.value * this.amount_gst.value * 0.01)));
  }

  ngOnDestroy() {
    this.formSubscription$.unsubscribe();
  }

  buildForm() {
    this.confirmForm = this._fb.group({
      amount_paid: [null, [Validators.required, Validators.min(0)]],
      amount_gst: [null, [Validators.required, Validators.min(0), Validators.max(30)]],
    });
  }

  get amount_paid(): FormControl {
    return this.confirmForm.get('amount_paid') as FormControl;
  }

  get amount_gst(): FormControl {
    return this.confirmForm.get('amount_gst') as FormControl;
  }

  confirm() {
    this._store.dispatch(new purchaseOrderActions.ConfirmPurchaseOrderAction({
      purchase_order: this.confirmForm.value
    }));
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

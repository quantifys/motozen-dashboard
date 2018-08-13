import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';

@Component({
  selector: 'app-purchase-order-open',
  templateUrl: './purchase-order-open.component.html',
  styleUrls: ['./purchase-order-open.component.scss']
})
export class PurchaseOrderOpenComponent {

  public type: boolean = false;

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderOpenComponent>
  ) { }

  action() {
    this._store.dispatch(new purchaseOrderActions.OpenPurchaseOrderAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}


@Component({
  selector: 'app-purchase-order-delete',
  templateUrl: './purchase-order-open.component.html',
})
export class PurchaseOrderDeleteComponent {

  public type: boolean = true;
  
  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new purchaseOrderActions.DeletePurchaseOrderAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}
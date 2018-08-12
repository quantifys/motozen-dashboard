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
export class PurchaseOrderOpenComponent implements OnInit {

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<PurchaseOrderOpenComponent>
  ) { }

  ngOnInit() {
  }

  open() {
    this._store.dispatch(new purchaseOrderActions.OpenPurchaseOrderAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }
}

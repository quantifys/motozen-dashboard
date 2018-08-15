import { Component, OnInit } from '@angular/core';
import html2pdf from 'html2pdf.js';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { PurchaseOrder } from '../../../shared/models';

@Component({
  selector: 'app-purchase-order-preview',
  templateUrl: './purchase-order-preview.component.html',
  styleUrls: ['./purchase-order-preview.component.scss']
})
export class PurchaseOrderPreviewComponent implements OnInit {

  public purchaseOrder: PurchaseOrder = new PurchaseOrder({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      if (user.role == 'store_dispatch') {
        let id: string = this._activatedRoute.snapshot.queryParams["id"];
        if (id) {
          this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderAction(id));
        }
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(purchaseOrder => this.purchaseOrder = purchaseOrder);
  }

  downloadPurchaseOrder() {
    var element = document.getElementById('page-container');
    var opt = {
      margin: 8,
      image: { type: 'png', quality: 1 },
      filename: `${this.purchaseOrder.serial_no}.pdf`,
    };
    html2pdf().from(element).set(opt).save();
  }

}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { PurchaseOrder } from '../../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.scss']
})
export class PurchaseOrderDetailComponent implements OnInit {

  public purchaseOrder: PurchaseOrder = new PurchaseOrder({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "purchase-orders"]);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(purchaseOrder => this.purchaseOrder = purchaseOrder);
  }

}

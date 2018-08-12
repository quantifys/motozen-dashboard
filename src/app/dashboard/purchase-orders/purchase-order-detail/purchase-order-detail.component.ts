import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { PurchaseOrder, User } from '../../../shared/models';
import { PurchaseOrderOpenComponent } from '../purchase-order-open/purchase-order-open.component';
import { PurchaseOrderConfirmComponent } from '../purchase-order-confirm/purchase-order-confirm.component';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.scss']
})
export class PurchaseOrderDetailComponent implements OnInit, OnDestroy {

  public purchaseOrder: PurchaseOrder = new PurchaseOrder({});
  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
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

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  openPurchaseOrder() {
    this.bottomSheet.open(PurchaseOrderOpenComponent);
  }

  confirmPurchaseOrder() {
    this.bottomSheet.open(PurchaseOrderConfirmComponent);
  }
}

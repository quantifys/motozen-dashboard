import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { PurchaseOrder, User } from '../../../shared/models';
import { PurchaseOrderOpenComponent, PurchaseOrderDeleteComponent } from '../purchase-order-open/purchase-order-open.component';
import { PurchaseOrderConfirmComponent } from '../purchase-order-confirm/purchase-order-confirm.component';
import { PurchaseOrderCloseComponent } from '../purchase-order-close/purchase-order-close.component';
import { PurchaseOrderService } from '../../../shared/services/purchase-order.service';

@Component({
  selector: 'app-purchase-order-detail',
  templateUrl: './purchase-order-detail.component.html',
  styleUrls: ['./purchase-order-detail.component.scss']
})
export class PurchaseOrderDetailComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  private routerSubscription$: Subscription = new Subscription();
  private purchaseOrderSubscription$: Subscription = new Subscription();
  public purchaseOrder: PurchaseOrder = new PurchaseOrder({});
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet,
    private _poService: PurchaseOrderService
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new purchaseOrderActions.FetchPurchaseOrderAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "purchase-orders"]);
      }
    });
  }

  ngOnInit() {
    this.purchaseOrderSubscription$ = this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(purchaseOrder => this.purchaseOrder = purchaseOrder);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this.routerSubscription$.unsubscribe();
    this.purchaseOrderSubscription$.unsubscribe();
  }

  deletePurchaseOrder() {
    this.bottomSheet.open(PurchaseOrderDeleteComponent);
  }

  openPurchaseOrder() {
    this.bottomSheet.open(PurchaseOrderOpenComponent);
  }

  confirmPurchaseOrder() {
    this.bottomSheet.open(PurchaseOrderConfirmComponent);
  }

  closePurchaseOrder() {
    this.bottomSheet.open(PurchaseOrderCloseComponent);
  }

  poActions(type: boolean) {
    type ? this._poService.downloadPurchaseOrder() : this._poService.printPurchaseOrder()
  }
}

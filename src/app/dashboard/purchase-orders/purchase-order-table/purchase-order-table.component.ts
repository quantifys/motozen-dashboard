import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';
import swal from 'sweetalert2';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { PurchaseOrder, User } from '../../../shared/models';

@Component({
  selector: 'purchase-order-table',
  templateUrl: './purchase-order-table.component.html',
  styleUrls: ['./purchase-order-table.component.scss']
})
export class PurchaseOrderTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private purchaseOrderSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public purchaseOrders: PurchaseOrder[] = [];
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"] && params["status"]) {
        this.fetchPurchaseOrders();
      }
    });
  }

  ngOnInit() {
    this.purchaseOrderSubscription$ = this._store.select(fromRoot.getAllPurchaseOrders).subscribe(purchaseOrders => {
      this.loading = false;
      this.purchaseOrders = purchaseOrders;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getPurchaseOrderPageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.purchaseOrderSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchPurchaseOrders() {
    this.loading = true;
    this._store.dispatch(new purchaseOrderActions.FetchAllPurchaseOrdersAction(this.queryParams));
  }

  deletePurchaseOrder(id: number) {
    swal({
      title: 'Are you sure?',
      text: 'Delete purchase order!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        this._store.dispatch(new purchaseOrderActions.DeletePurchaseOrderAction(id));
      }
    });
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    console.log("Getting page..");
    this._router.navigate(["dashboard", "purchase-orders"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}

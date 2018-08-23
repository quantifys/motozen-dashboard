import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as requisitionOrderActions from '../../../shared/actions/requisition-order.actions';
import { RequisitionOrder } from '../../../shared/models';

@Component({
  selector: 'requisition-order-table',
  templateUrl: './requisition-order-table.component.html',
  styleUrls: ['./requisition-order-table.component.scss']
})
export class RequisitionOrderTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private requisitionOrderSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public requisitionOrders: RequisitionOrder[] = [];
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"] && params["status"]) {
        this.fetchRequisitionOrders();
      }
    });
  }

  ngOnInit() {
    this.requisitionOrderSubscription$ = this._store.select(fromRoot.getAllRequisitionOrders).subscribe(requisitionOrders => {
      this.loading = false;
      this.requisitionOrders = requisitionOrders;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getRequisitionOrderPageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.requisitionOrderSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchRequisitionOrders() {
    this.loading = true;
    this._store.dispatch(new requisitionOrderActions.FetchAllRequisitionOrdersAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "requisition-orders"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }
}

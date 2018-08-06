import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import * as fromRoot from '../../../shared/reducers';
import * as purchaseOrderActions from '../../../shared/actions/purchase-order.actions';
import { PurchaseOrder, PageData } from '../../../shared/models';
import swal from 'sweetalert2';

@Component({
  selector: 'purchase-order-table',
  templateUrl: './purchase-order-table.component.html',
  styleUrls: ['./purchase-order-table.component.scss']
})
export class PurchaseOrderTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public purchaseOrders: PurchaseOrder[] = [];
  public pageData: BehaviorSubject<PageData> = new BehaviorSubject(new PageData({}));
  public loading: boolean = false;
  public config: PaginationInstance = {
    id: 'certificatesPaginate',
    itemsPerPage: this.pageData.value.per_page,
    currentPage: 1,
    totalItems: this.purchaseOrders.length
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this.pageData.subscribe(data => {
      this.config.itemsPerPage = data.per_page;
      this.config.totalItems = data.total;
    });
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.fetchPurchaseOrders();
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getAllPurchaseOrders).subscribe(purchaseOrders => {
      this.loading = false;
      this.purchaseOrders = purchaseOrders;
    });
    this._store.select(fromRoot.getPurchaseOrderPageStatus).subscribe(pageData => this.pageData.next(pageData));
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }

  fetchPurchaseOrders() {
    let formData: any = {
      status: this.queryParams["status"] ? this.queryParams["status"] : null,
      start: this.queryParams["start_date"] ? this.queryParams["start_date"] : null,
      end: this.queryParams["end_date"] ? this.queryParams["end_date"] : null,
      page: this.config.currentPage,
      per_page: 15
    };
    this._store.dispatch(new purchaseOrderActions.FetchAllPurchaseOrdersAction(formData));
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

  getPage(page: number) {
    this.config.currentPage = page;
    this.fetchPurchaseOrders();
  }

}

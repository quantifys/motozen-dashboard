import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as inventoryActions from '../../../shared/actions/inventory.actions';
import { Inventory } from '../../../shared/models';

@Component({
  selector: 'inventory-table',
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private inventorySubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public inventories: Inventory[] = [];
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
      if (params["page"] && params["per_page"] && params["category"]) {
        this.fetchInventories();
      }
    });
  }

  ngOnInit() {
    this.inventorySubscription$ = this._store.select(fromRoot.getAllInventories).subscribe(inventories => {
      this.loading = false;
      this.inventories = inventories;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getInventoryPageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.inventorySubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchInventories() {
    this.loading = true;
    this._store.dispatch(new inventoryActions.FetchAllInventoriesAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "inventory"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }
}

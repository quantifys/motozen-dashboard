import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as vendorActions from '../../../shared/actions/vendor.actions';
import { Vendor } from '../../../shared/models';

@Component({
  selector: 'vendor-table',
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.scss']
})
export class VendorTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private vendorSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public vendors: Vendor[] = [];
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
        this.fetchVendors();
      }
    });
  }

  ngOnInit() {
    this.vendorSubscription$ = this._store.select(fromRoot.getAllVendors).subscribe(vendors => {
      this.loading = false;
      this.vendors = vendors;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getVendorPageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.vendorSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchVendors() {
    this.loading = true;
    this._store.dispatch(new vendorActions.FetchAllVendorsAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "vendors"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}

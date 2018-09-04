import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';
import { PurchaseOrderFilterComponent } from './purchase-order-filter/purchase-order-filter.component';


@Component({
  selector: 'app-purchase-orders',
  templateUrl: './purchase-orders.component.html',
  styleUrls: ['./purchase-orders.component.scss']
})
export class PurchaseOrdersComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      let newParams: any = {};
      if (!this._activatedRoute.snapshot.queryParams["page"]) {
        newParams["page"] = 1;
      }
      if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
        newParams["per_page"] = 10;
      }
      if (!this._activatedRoute.snapshot.queryParams["status"] && user.role) {
        switch (user.role) {
          case "distributor":
            newParams["status"] = "can_modify";
            break;
          case "store_purchases":
            newParams["status"] = "can_modify";
            break;
          case "accounts":
            newParams["status"] = "opened";
            break;
          case "store_dispatch":
            newParams["status"] = "processing";
            break;
          case "store_logistics":
            newParams["status"] = "dispatch_ready";
            break;
          case "sales":
            newParams["status"] = "inprocess";
            break;
          default:
            this._router.navigate(["403-forbidden"]);
            break;
        }
      }
      user.role ? this._router.navigate(["dashboard", "purchase-orders"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } }) : null
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  getQueryParams(type: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: type }
  }

  openFilters() {
    this.bottomSheet.open(PurchaseOrderFilterComponent);
  }

}
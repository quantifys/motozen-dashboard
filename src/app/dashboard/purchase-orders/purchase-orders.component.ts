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
      if (!this._activatedRoute.snapshot.queryParams["status"]) {
        switch (user.role) {
          case "distributor":
            this._router.navigate(["dashboard", "purchase-orders"], { queryParams: { status: 'can_modify' } });
            break;
          case "store_purchases":
            this._router.navigate(["dashboard", "purchase-orders"], { queryParams: { status: 'can_modify' } });
            break;
          case "accounts":
            this._router.navigate(["dashboard", "purchase-orders"], { queryParams: { status: 'opened' } });
            break;
          case "store_dispatch":
            this._router.navigate(["dashboard", "purchase-orders"], { queryParams: { status: 'processing' } });
            break;
          default:
            this._router.navigate(["404-not-authorized"]);
            break;
        }
      }
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
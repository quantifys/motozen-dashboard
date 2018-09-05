import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';
import { DateFilterComponent } from '../date-filter/date-filter.component';

@Component({
  selector: 'app-requisition-orders',
  templateUrl: './requisition-orders.component.html',
  styleUrls: ['./requisition-orders.component.scss']
})
export class RequisitionOrdersComponent implements OnInit, OnDestroy {

  public loggedUser: User = new User({});
  private userSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _bottomSheet: MatBottomSheet
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (user.role == 'store_purchases' || user.role == 'plant_supervisor') {
          let newParams: any = {};
          if (!this._activatedRoute.snapshot.queryParams["page"]) {
            newParams["page"] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
            newParams["per_page"] = 10;
          }
          if (!this._activatedRoute.snapshot.queryParams["status"]) {
            newParams["status"] = "can_modify";
          }
          this._router.navigate(["dashboard", "requisition-orders"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } })
        } else {
          this._router.navigate(["403-forbidden"]);
        }
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  getQueryParams(status: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: status }
  }

  openFilters() {
    this._bottomSheet.open(DateFilterComponent, {
      data: {
        route: 'requisition-orders'
      }
    });
  }

}

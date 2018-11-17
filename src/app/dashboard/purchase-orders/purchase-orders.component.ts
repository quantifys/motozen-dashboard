import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import moment from 'moment';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';
import * as reportActions from '../../shared/actions/reports.actions';
import { PurchaseOrderFilterComponent } from './purchase-order-filter/purchase-order-filter.component';
import { PurchaseOrderReportComponent } from './purchase-order-report/purchase-order-report.component';
import { CsvReportService } from 'src/app/shared/services/csv-report.service';


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
    private bottomSheet: MatBottomSheet,
    private _csvService: CsvReportService
  ) {
    this._store.dispatch(new reportActions.POSummaryClearAction);
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (user.role == 'manufacturer' || user.role == 'distributor' || user.role == 'store_purchases' || user.role == 'accounts' || user.role == 'store_dispatch' || user.role == 'store_logistics' || user.role == 'sales') {
          let newParams: any = {};
          if (!this._activatedRoute.snapshot.queryParams["page"]) {
            newParams["page"] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
            newParams["per_page"] = 10;
          }
          if (!this._activatedRoute.snapshot.queryParams["status"] && user.role) {
            switch (user.role) {
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
                newParams["status"] = "can_modify";
                break;
            }
          }
          this._router.navigate(["dashboard", "purchase-orders"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } })
        } else {
          this._router.navigate(["403-forbidden"]);
        }
      }
    });
  }

  ngOnInit() {
    this._csvService.subscribeToPODetails();
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
    this._csvService.unsubscribe();
  }

  getQueryParams(type: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: type }
  }

  openFilters() {
    this.bottomSheet.open(PurchaseOrderFilterComponent);
  }

  openReports() {
    this.bottomSheet.open(PurchaseOrderReportComponent);
  }

  detailsReport() {
    let data: any = this._activatedRoute.snapshot.queryParams;
    data.start ? data.start : delete data["start"];
    data.end ? data.end : delete data["end"];
    data.user_id ? data.user_id : delete data["user_id"];
    data.status ? data.status : delete data["status"];
    this._store.dispatch(new reportActions.FetchPODetailsReportAction(data));
  }

}
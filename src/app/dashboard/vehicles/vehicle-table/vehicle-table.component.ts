import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as vehicleActions from '../../../shared/actions/vehicle.actions';
import { Vehicle } from '../../../shared/models';

@Component({
  selector: 'vehicle-table',
  templateUrl: './vehicle-table.component.html',
  styleUrls: ['./vehicle-table.component.scss']
})
export class VehicleTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private vehicleSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public vehicles: Vehicle[] = [];
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
      if (params["page"] && params["per_page"]) {
        this.fetchVehicles();
      }
    });
  }

  ngOnInit() {
    this.vehicleSubscription$ = this._store.select(fromRoot.getAllVehicles).subscribe(vehicles => {
      this.loading = false;
      this.vehicles = vehicles;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getVehiclePageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.vehicleSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchVehicles() {
    this.loading = true;
    this._store.dispatch(new vehicleActions.FetchAllVehiclesAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "vehicles"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }
}

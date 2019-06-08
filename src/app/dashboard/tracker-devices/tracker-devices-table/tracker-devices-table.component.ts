import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as trackerDeviceActions from '../../../shared/actions/tracker-device.actions';
import { TrackerDevice } from 'src/app/shared/models';

@Component({
  selector: 'app-tracker-devices-table',
  templateUrl: './tracker-devices-table.component.html',
  styleUrls: ['./tracker-devices-table.component.scss']
})
export class TrackerDevicesTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private devicesSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public devices: TrackerDevice[] = [];
  public loading = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params['page']) {
        this.pageEvent.pageIndex = +params['page'] - 1;
      }
      if (params['per_page']) {
        this.pageEvent.pageSize = +params['per_page'];
      }
      if (params['page'] && params['per_page'] && params['status']) {
        this.fetchTrackerDevices();
      }
    });
  }

  ngOnInit() {
    this.devicesSubscription$ = this._store.select(fromRoot.getAllTrackerDevices).subscribe(devices => {
      this.loading = false;
      this.devices = devices;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getTrackerDevicePageStatus)
      .subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
    this.devicesSubscription$.unsubscribe();
  }


  fetchTrackerDevices() {
    this.loading = true;
    const data: any = {};
    Object.assign(data, this.queryParams);
    data['order'] = {
      serial_no: 'desc'
    };
    this._store.dispatch(new trackerDeviceActions.FetchAllTrackerDevicesAction(data));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(['dashboard', 'vts-devices'], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import { Device } from '../../../shared/models/device.model';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private devicesSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public devices: Device[] = [];
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
        this.fetchDevices();
      }
    });
  }

  ngOnInit() {
    this.devicesSubscription$ = this._store.select(fromRoot.getAllDevices).subscribe(devices => {
      this.loading = false;
      this.devices = devices;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getDevicePageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
    this.devicesSubscription$.unsubscribe();
  }


  fetchDevices() {
    this.loading = true;
    const data: any = {};
    Object.assign(data, this.queryParams);
    data['order'] = {
      sld_number: 'desc'
    };
    this._store.dispatch(new deviceActions.FetchAllDevicesAction(data));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(['dashboard', 'devices'], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }
}

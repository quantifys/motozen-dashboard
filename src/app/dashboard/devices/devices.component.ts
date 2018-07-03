import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import * as deviceActions from '../../shared/actions/device.actions';
import { Device } from '../../shared/models';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public status: string = '';
  public devices: Device[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _store: Store<fromRoot.State>
  ) {
    this._store.dispatch(new deviceActions.FetchAllDevicesAction);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.status = params["status"];
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getAllDevices).subscribe(devices => this.devices = devices);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }

}

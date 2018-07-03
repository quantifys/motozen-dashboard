import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import { Device } from '../../../shared/models';
import { Location } from '@angular/common';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {

  public device: Device = new Device({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _store: Store<fromRoot.State>
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new deviceActions.FetchDeviceAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "devices"]);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentDevice).subscribe(device => this.device = device);
  }

}

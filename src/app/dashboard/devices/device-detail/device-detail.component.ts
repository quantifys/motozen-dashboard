import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import { Device, User } from '../../../shared/models';
import { Location } from '@angular/common';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.scss']
})
export class DeviceDetailComponent implements OnInit {

  public device: Device = new Device({});
  public loggedUser: User = new User({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    public bottomSheet: MatBottomSheet,
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
    this._store.select(fromRoot.getLoggedUser).subscribe(user => this.loggedUser = user);
  }

  deleteDevice() {
    this.bottomSheet.open(DeviceDeleteComponent);
  }

}

@Component({
  template: `
  <div class="container-fluid mt-3">
  <h5 class="text-center border-bottom mb-3 pb-2">Are you sure you want to delete this device?</h5>
  <div class="text-center mb-3">
    <button mat-stroked-button color="warn" (click)="action()">Yes</button>
    <button class="ml-1" mat-button (click)="close()">No</button>
  </div>
</div>
  `,
})
export class DeviceDeleteComponent {

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<DeviceDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new deviceActions.DeleteDeviceAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}
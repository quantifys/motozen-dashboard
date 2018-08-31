import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as vehicleActions from '../../../shared/actions/vehicle.actions';
import { Vehicle } from '../../../shared/models';
import { MatBottomSheetRef, MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {

  public vehicle: Vehicle = new Vehicle({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new vehicleActions.FetchVehicleAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "vehicles"]);
      }
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getCurrentVehicle).subscribe(vehicle => this.vehicle = vehicle);
  }

  deleteVehicle() {
    this.bottomSheet.open(VehicleDeleteComponent);
  }

}

@Component({
  template: `<div class="container-fluid mt-3">
  <h5 class="text-center border-bottom mb-3 pb-2">Are you sure you want to delete this vehicle?</h5>
  <div class="text-center mb-3">
    <button mat-stroked-button color="warn" (click)="action()">Yes</button>
    <button class="ml-1" mat-button (click)="close()">No</button>
  </div>
</div>`,
})
export class VehicleDeleteComponent {

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<VehicleDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new vehicleActions.DeleteVehicleAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}
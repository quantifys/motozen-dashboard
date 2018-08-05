import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as vehicleActions from '../../../shared/actions/vehicle.actions';
import { Vehicle } from '../../../shared/models';

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
    private _store: Store<fromRoot.State>
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

}

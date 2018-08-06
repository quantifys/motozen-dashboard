import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PaginationInstance } from 'ngx-pagination';

import * as fromRoot from '../../shared/reducers';
import * as vehicleActions from '../../shared/actions/vehicle.actions';
import { User, Vehicle } from '../../shared/models';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public vehicles: Vehicle[] = [];
  public loading: boolean = false;
  public config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.vehicles.length
  };

  constructor(
    private _router: Router,
    private _store: Store<fromRoot.State>
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      if (user.role) {
        if (user.role != 'manufacturer' && user.role != "sales") {
          this._router.navigate(["404-not-found"]);
        }
      }
    });
  }

  ngOnInit() {
    this.fetchVehicles();
    this._store.select(fromRoot.getAllVehicles).subscribe(vehicles => this.vehicles = vehicles);
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  fetchVehicles() {
    this._store.dispatch(new vehicleActions.FetchAllVehiclesAction);
  }

}
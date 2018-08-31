import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromVehicle from '../actions/vehicle.actions';
import { Vehicle } from '../models';

@Injectable()
export class VehicleEffects {

  private vehicle: Vehicle = new Vehicle({});

  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _store: Store<fromRoot.State>,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentVehicle).subscribe(vehicle => this.vehicle = vehicle);
  }

  @Effect()
  fetchVehicles$: Observable<Action> = this._action$.ofType(fromVehicle.FETCH_ALL_VEHICLES_ACTION).pipe(
    map((action: fromVehicle.FetchAllVehiclesAction) => action.payload),
    exhaustMap(body => this._tokenService.get(`vehicles`)
      .pipe(
        map(response => new fromVehicle.FetchAllVehiclesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromVehicle.FetchAllVehiclesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchVehicle$: Observable<Action> = this._action$.ofType(fromVehicle.FETCH_VEHICLE_ACTION).pipe(
    map((action: fromVehicle.FetchVehicleAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`vehicles/${id}`)
      .pipe(
        map(response => new fromVehicle.FetchVehicleCompleteAction(response.json().message)),
        catchError(error => of(new fromVehicle.FetchVehicleFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewVehicle$: Observable<Action> = this._action$.ofType(fromVehicle.CREATE_VEHICLE_ACTION).pipe(
    map((action: fromVehicle.CreateVehicleAction) => action.payload),
    exhaustMap(body => this._tokenService.post('vehicles', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "vehicles", "view"], { queryParams: { id: response.json().message.id } })
          return new fromVehicle.CreateVehicleCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromVehicle.CreateVehicleFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteVehicle$: Observable<Action> = this._action$.ofType(fromVehicle.DELETE_VEHICLE_ACTION).pipe(
    map((action: fromVehicle.DeleteVehicleAction) => action),
    exhaustMap(() => this._tokenService.delete(`vehicles/${this.vehicle.id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "vehicles"]);
          return new fromVehicle.DeleteVehicleCompleteAction(this.vehicle.id);
        }),
        catchError(error => of(new fromVehicle.DeleteVehicleFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateVehicle$: Observable<Action> = this._action$.ofType(fromVehicle.UPDATE_VEHICLE_ACTION).pipe(
    map((action: fromVehicle.UpdateVehicleAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`vehicles/${this.vehicle.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "vehicles", "view"], { queryParams: { id: response.json().message.id } });
          return new fromVehicle.UpdateVehicleCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromVehicle.UpdateVehicleFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteVehicleIcat$: Observable<Action> = this._action$.ofType(fromVehicle.DELETE_VEHICLE_ICAT_ACTION).pipe(
    map((action: fromVehicle.DeleteVehicleIcatAction) => action.payload),
    exhaustMap(body => this._tokenService.delete(`vehicles/${body.vehicle_id}/icats/${body.icat_id}`)
      .pipe(
        map(() => new fromVehicle.DeleteVehicleIcatCompleteAction(body.icat_id)),
        catchError(error => of(new fromVehicle.DeleteVehicleIcatFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateVehicleIcat$: Observable<Action> = this._action$.ofType(fromVehicle.UPDATE_VEHICLE_ICAT_ACTION).pipe(
    map((action: fromVehicle.UpdateVehicleIcatAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`vehicles/${body.id}/icats`, { vehicle: { icats: body.icats } })
      .pipe(
        map(response => new fromVehicle.UpdateVehicleIcatCompleteAction(response.json().message)),
        catchError(error => of(new fromVehicle.UpdateVehicleIcatFailedAction(error.json().message)))
      ))
  );

}
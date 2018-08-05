import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromVehicle from '../actions/vehicle.actions';

@Injectable()
export class VehicleEffects {
  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) { }

  @Effect()
  fetchVehicles$: Observable<Action> = this._action$.pipe(ofType(fromVehicle.FETCH_ALL_VEHICLES_ACTION),
    mergeMap((action: fromVehicle.FetchAllVehiclesAction) => this._tokenService.post(`vehicles/list`, action.payload)
      .pipe(map(response => new fromVehicle.FetchAllVehiclesCompleteAction(response.json().message),
        catchError(error => of(new fromVehicle.FetchAllVehiclesFailedAction(error.json().message)))))));

  @Effect()
  fetchVehicle$: Observable<Action> = this._action$.pipe(ofType(fromVehicle.FETCH_VEHICLE_ACTION),
    mergeMap((action: fromVehicle.FetchVehicleAction) => this._tokenService.get(`vehicles/${action.payload}`)
      .pipe(map(response => new fromVehicle.FetchVehicleCompleteAction(response.json().message),
        catchError(error => of(new fromVehicle.FetchVehicleFailedAction(error.json().message)))))));

  @Effect()
  createNewVehicle$: Observable<Action> = this._action$.pipe(ofType(fromVehicle.CREATE_VEHICLE_ACTION),
    mergeMap((action: fromVehicle.CreateVehicleAction) => this._tokenService.post('vehicles', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "vehicles", "view"], { queryParams: { id: response.json().message.id } })
        return new fromVehicle.CreateVehicleCompleteAction(response.json().message)
      },
        catchError(error => of(new fromVehicle.CreateVehicleFailedAction(error.json().message)))))));

  @Effect()
  deleteVehicle$: Observable<Action> = this._action$.pipe(ofType(fromVehicle.DELETE_VEHICLE_ACTION),
    mergeMap((action: fromVehicle.DeleteVehicleAction) => this._tokenService.delete(`vehicles/${action.payload}`)
      .pipe(map(response => new fromVehicle.DeleteVehicleCompleteAction(response.json().message),
        catchError(error => of(new fromVehicle.DeleteVehicleFailedAction(error.json().message)))))));

  @Effect()
  updateVehicle$: Observable<Action> = this._action$.pipe(ofType(fromVehicle.UPDATE_VEHICLE_ACTION),
    mergeMap((action: fromVehicle.UpdateVehicleAction) => this._tokenService.patch(`vehicles/${action.payload.vehicle.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "vehicles", "view"], { queryParams: { id: response.json().message.id } });
        return new fromVehicle.UpdateVehicleCompleteAction(response.json().message); 
      },
        catchError(error => of(new fromVehicle.UpdateVehicleFailedAction(error.json().message)))))));

}
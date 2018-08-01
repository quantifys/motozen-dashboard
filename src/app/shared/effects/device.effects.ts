import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromDevice from '../actions/device.actions';

@Injectable()
export class DeviceEffects {
  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) { }

  @Effect()
  fetchDevices$: Observable<Action> = this._action$.pipe(ofType(fromDevice.FETCH_ALL_DEVICES_ACTION),
    mergeMap((action: fromDevice.FetchAllDevicesAction) => this._tokenService.post(`devices/list`, action.payload)
      .pipe(map(response => new fromDevice.FetchAllDevicesCompleteAction(response.json().message),
        catchError(error => of(new fromDevice.FetchAllDevicesFailedAction(error.json().message)))))));

  @Effect()
  fetchDevice$: Observable<Action> = this._action$.pipe(ofType(fromDevice.FETCH_DEVICE_ACTION),
    mergeMap((action: fromDevice.FetchDeviceAction) => this._tokenService.get(`devices/${action.payload}`)
      .pipe(map(response => new fromDevice.FetchDeviceCompleteAction(response.json().message),
        catchError(error => of(new fromDevice.FetchDeviceFailedAction(error.json().message)))))));

  @Effect()
  createNewDevice$: Observable<Action> = this._action$.pipe(ofType(fromDevice.CREATE_DEVICE_ACTION),
    mergeMap((action: fromDevice.CreateDeviceAction) => this._tokenService.post('devices', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "devices", "view"], { queryParams: { id: response.json().message.id } })
        return new fromDevice.CreateDeviceCompleteAction(response.json().message)
      },
        catchError(error => of(new fromDevice.CreateDeviceFailedAction(error.json().message)))))));

  @Effect()
  deleteDevice$: Observable<Action> = this._action$.pipe(ofType(fromDevice.DELETE_DEVICE_ACTION),
    mergeMap((action: fromDevice.DeleteDeviceAction) => this._tokenService.delete(`devices/${action.payload}`)
      .pipe(map(response => new fromDevice.DeleteDeviceCompleteAction(response.json().message),
        catchError(error => of(new fromDevice.DeleteDeviceFailedAction(error.json().message)))))));

  @Effect()
  updateDevice$: Observable<Action> = this._action$.pipe(ofType(fromDevice.UPDATE_DEVICE_ACTION),
    mergeMap((action: fromDevice.UpdateDeviceAction) => this._tokenService.patch(`devices/${action.payload.device.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "devices", "view"], { queryParams: { id: response.json().message.id } });
        return new fromDevice.UpdateDeviceCompleteAction(response.json().message); 
      },
        catchError(error => of(new fromDevice.UpdateDeviceFailedAction(error.json().message)))))));

}
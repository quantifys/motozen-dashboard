import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromDevice from '../actions/device.actions';
import { Device } from '../models';

@Injectable()
export class DeviceEffects {

  private device: Device = new Device({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentDevice).subscribe(device => this.device = device);
  }

  @Effect()
  fetchDevices$: Observable<Action> = this._action$.ofType(fromDevice.FETCH_ALL_DEVICES_ACTION).pipe(
    map((action: fromDevice.FetchAllDevicesAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`devices/list`, body)
      .pipe(
        map(response => new fromDevice.FetchAllDevicesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromDevice.FetchAllDevicesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchDevice$: Observable<Action> = this._action$.ofType(fromDevice.FETCH_DEVICE_ACTION).pipe(
    map((action: fromDevice.FetchDeviceAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`devices/${id}`)
      .pipe(
        map(response => new fromDevice.FetchDeviceCompleteAction(response.json().message)),
        catchError(error => of(new fromDevice.FetchDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createDevice$: Observable<Action> = this._action$.ofType(fromDevice.CREATE_DEVICE_ACTION).pipe(
    map((action: fromDevice.CreateDeviceAction) => action.payload),
    exhaustMap(body => this._tokenService.post('devices', body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'devices', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromDevice.CreateDeviceCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromDevice.CreateDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteDevice$: Observable<Action> = this._action$.ofType(fromDevice.DELETE_DEVICE_ACTION).pipe(
    map((action: fromDevice.DeleteDeviceAction) => action),
    exhaustMap(() => this._tokenService.delete(`devices/${this.device.id}`)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'devices']);
          return new fromDevice.DeleteDeviceCompleteAction(this.device.id);
        }),
        catchError(error => of(new fromDevice.DeleteDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateDevice$: Observable<Action> = this._action$.ofType(fromDevice.UPDATE_DEVICE_ACTION).pipe(
    map((action: fromDevice.UpdateDeviceAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`devices/${this.device.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'devices', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromDevice.UpdateDeviceCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromDevice.UpdateDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  transferDevices$: Observable<Action> = this._action$.ofType(fromDevice.TRANSFER_DEVICE_ACTION).pipe(
    map((action: fromDevice.TransferDevicesAction) => action.payload),
    exhaustMap(body => this._tokenService.post('devices/transfer', body)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'devices']);
          return new fromDevice.TransferDevicesCompleteAction(this.device.id);
        }),
        catchError(error => of(new fromDevice.TransferDevicesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchDeviceTransferFormData$: Observable<Action> = this._action$.ofType(fromDevice.FETCH_DEVICE_TRANSFER_FORMDATA_ACTION).pipe(
    map((action: fromDevice.FetchDeviceTransferFormDataAction) => action),
    exhaustMap(() => this._tokenService.get('devices/transfer/new')
      .pipe(
        map(response => new fromDevice.FetchDeviceTransferFormDataCompleteAction(response.json().message)),
        catchError(error => of(new fromDevice.FetchDeviceTransferFormDataFailedAction(error.json().message)))
      ))
  );

}

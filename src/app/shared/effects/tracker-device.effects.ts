import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromTrackerDevice from '../actions/tracker-device.actions';
import { TrackerDevice } from '../models';

@Injectable()
export class TrackerDeviceEffects {

  private device: TrackerDevice = new TrackerDevice({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentTrackerDevice).subscribe(device => this.device = device);
  }

  @Effect()
  fetchTrackerDevices$: Observable<Action> = this._action$.ofType(fromTrackerDevice.FETCH_ALL_TRACKER_DEVICES_ACTION).pipe(
    map((action: fromTrackerDevice.FetchAllTrackerDevicesAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`tracker_devices/list`, body)
      .pipe(
        map(response => new fromTrackerDevice.FetchAllTrackerDevicesCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromTrackerDevice.FetchAllTrackerDevicesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchTrackerDevice$: Observable<Action> = this._action$.ofType(fromTrackerDevice.FETCH_TRACKER_DEVICE_ACTION).pipe(
    map((action: fromTrackerDevice.FetchTrackerDeviceAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`tracker_devices/${id}`)
      .pipe(
        map(response => new fromTrackerDevice.FetchTrackerDeviceCompleteAction(response.json().message)),
        catchError(error => of(new fromTrackerDevice.FetchTrackerDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createTrackerDevice$: Observable<Action> = this._action$.ofType(fromTrackerDevice.CREATE_TRACKER_DEVICE_ACTION).pipe(
    map((action: fromTrackerDevice.CreateTrackerDeviceAction) => action.payload),
    exhaustMap(body => this._tokenService.post('tracker_devices', body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'tracker_devices', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromTrackerDevice.CreateTrackerDeviceCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromTrackerDevice.CreateTrackerDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteTrackerDevice$: Observable<Action> = this._action$.ofType(fromTrackerDevice.DELETE_TRACKER_DEVICE_ACTION).pipe(
    map((action: fromTrackerDevice.DeleteTrackerDeviceAction) => action),
    exhaustMap(() => this._tokenService.delete(`tracker_devices/${this.device.id}`)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'tracker_devices']);
          return new fromTrackerDevice.DeleteTrackerDeviceCompleteAction(this.device.id);
        }),
        catchError(error => of(new fromTrackerDevice.DeleteTrackerDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateTrackerDevice$: Observable<Action> = this._action$.ofType(fromTrackerDevice.UPDATE_TRACKER_DEVICE_ACTION).pipe(
    map((action: fromTrackerDevice.UpdateTrackerDeviceAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`tracker_devices/${this.device.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(['dashboard', 'tracker_devices', 'view'], { queryParams: { id: response.json().message.id } });
          return new fromTrackerDevice.UpdateTrackerDeviceCompleteAction(response.json().message);
        }),
        catchError(error => of(new fromTrackerDevice.UpdateTrackerDeviceFailedAction(error.json().message)))
      ))
  );

  @Effect()
  transferTrackerDevices$: Observable<Action> = this._action$.ofType(fromTrackerDevice.TRANSFER_TRACKER_DEVICE_ACTION).pipe(
    map((action: fromTrackerDevice.TransferTrackerDevicesAction) => action.payload),
    exhaustMap(body => this._tokenService.post('tracker_devices/transfer', body)
      .pipe(
        map(() => {
          this._router.navigate(['dashboard', 'tracker_devices']);
          return new fromTrackerDevice.TransferTrackerDevicesCompleteAction(this.device.id);
        }),
        catchError(error => of(new fromTrackerDevice.TransferTrackerDevicesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchTrackerDeviceTransferFormData$: Observable<Action> =
    this._action$.ofType(fromTrackerDevice.FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_ACTION).pipe(
      map((action: fromTrackerDevice.FetchTrackerDeviceTransferFormDataAction) => action),
      exhaustMap(() => this._tokenService.get('tracker_devices/transfer/new')
        .pipe(
          map(response => new fromTrackerDevice.FetchTrackerDeviceTransferFormDataCompleteAction(response.json().message)),
          catchError(error => of(new fromTrackerDevice.FetchTrackerDeviceTransferFormDataFailedAction(error.json().message)))
        ))
    );

}

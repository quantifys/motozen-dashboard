import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromVendor from '../actions/vendor.actions';
import { Vendor } from '../models';

@Injectable()
export class VendorEffects {

  private requisitionOrder: Vendor = new Vendor({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentVendor).subscribe(slip => this.requisitionOrder = slip);
  }

  @Effect()
  fetchVendors$: Observable<Action> = this._action$.ofType(fromVendor.FETCH_ALL_VENDORS_ACTION).pipe(
    map((action: fromVendor.FetchAllVendorsAction) => action.payload),
    exhaustMap(body => this._tokenService.post('vendors/list', body)
      .pipe(
        map(response => new fromVendor.FetchAllVendorsCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromVendor.FetchAllVendorsFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchVendor$: Observable<Action> = this._action$.ofType(fromVendor.FETCH_VENDOR_ACTION).pipe(
    map((action: fromVendor.FetchVendorAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`vendors/${id}`)
      .pipe(
        map(response => new fromVendor.FetchVendorCompleteAction(response.json().message)),
        catchError(error => of(new fromVendor.FetchVendorFailedAction(error.json().message)))
      ))
  );

  @Effect()
  activateVendor$: Observable<Action> = this._action$.ofType(fromVendor.ACTIVATE_VENDOR_ACTION).pipe(
    map((action: fromVendor.ActivateVendorAction) => action),
    exhaustMap(() => this._tokenService.post(`vendors/${this.requisitionOrder.id}/activate`, null)
      .pipe(
        map(response => new fromVendor.ActivateVendorCompleteAction(response.json().message)),
        catchError(error => of(new fromVendor.ActivateVendorFailedAction(error.json().message)))
      ))
  );

  @Effect()
  disableVendor$: Observable<Action> = this._action$.ofType(fromVendor.DISABLE_VENDOR_ACTION).pipe(
    map((action: fromVendor.DisableVendorAction) => action),
    exhaustMap(() => this._tokenService.post(`vendors/${this.requisitionOrder.id}/disable`, null)
      .pipe(
        map(response => new fromVendor.DisableVendorCompleteAction(response.json().message)),
        catchError(error => of(new fromVendor.DisableVendorFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewVendor$: Observable<Action> = this._action$.ofType(fromVendor.CREATE_VENDOR_ACTION).pipe(
    map((action: fromVendor.CreateVendorAction) => action.payload),
    exhaustMap(body => this._tokenService.post('vendors', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "vendors", "view"], { queryParams: { id: response.json().message.id } });
          return new fromVendor.CreateVendorCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromVendor.CreateVendorFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteVendor$: Observable<Action> = this._action$.ofType(fromVendor.DELETE_VENDOR_ACTION).pipe(
    map((action: fromVendor.DeleteVendorAction) => action),
    exhaustMap(() => this._tokenService.delete(`vendors/${this.requisitionOrder.id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "vendors"]);
          return new fromVendor.DeleteVendorCompleteAction(this.requisitionOrder.id);
        }),
        catchError(error => of(new fromVendor.DeleteVendorFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updateVendor$: Observable<Action> = this._action$.ofType(fromVendor.UPDATE_VENDOR_ACTION).pipe(
    map((action: fromVendor.UpdateVendorAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`vendors/${this.requisitionOrder.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "vendors", "view"], { queryParams: { id: response.json().message.id } });
          return new fromVendor.UpdateVendorCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromVendor.UpdateVendorFailedAction(error.json().message)))
      ))
  );

}
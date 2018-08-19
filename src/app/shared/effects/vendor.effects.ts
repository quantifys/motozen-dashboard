import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromVendor from '../actions/vendor.actions';
import { Vendor } from '../models';

@Injectable()
export class VendorEffects {

  private vendor: Vendor = new Vendor({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentVendor).subscribe(slip => this.vendor = slip);
  }

  @Effect()
  fetchVendors$: Observable<Action> = this._action$.pipe(ofType(fromVendor.FETCH_ALL_VENDORS_ACTION),
    mergeMap((action: fromVendor.FetchAllVendorsAction) => this._tokenService.post('vendors/list', action.payload)
      .pipe(map(response => new fromVendor.FetchAllVendorsCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromVendor.FetchAllVendorsFailedAction(error.json().message)))))));

  @Effect()
  fetchVendor$: Observable<Action> = this._action$.pipe(ofType(fromVendor.FETCH_VENDOR_ACTION),
    mergeMap((action: fromVendor.FetchVendorAction) => this._tokenService.get(`vendors/${action.payload}`)
      .pipe(map(response => new fromVendor.FetchVendorCompleteAction(response.json().message),
        catchError(error => of(new fromVendor.FetchVendorFailedAction(error.json().message)))))));

  @Effect()
  createNewVendor$: Observable<Action> = this._action$.pipe(ofType(fromVendor.CREATE_VENDOR_ACTION),
    mergeMap((action: fromVendor.CreateVendorAction) => this._tokenService.post('vendors', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "vendors", "view"], { queryParams: { id: response.json().message.id } })
        return new fromVendor.CreateVendorCompleteAction(response.json().message)
      },
        catchError(error => of(new fromVendor.CreateVendorFailedAction(error.json().message)))))));

  @Effect()
  deleteVendor$: Observable<Action> = this._action$.pipe(ofType(fromVendor.DELETE_VENDOR_ACTION),
    mergeMap((action: fromVendor.DeleteVendorAction) => this._tokenService.delete(`vendors/${this.vendor.id}`)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "vendors"]);
        return new fromVendor.DeleteVendorCompleteAction
      },
        catchError(error => of(new fromVendor.DeleteVendorFailedAction(error.json().message)))))));

  @Effect()
  confirmVendor$: Observable<Action> = this._action$.pipe(ofType(fromVendor.ACTIVATE_VENDOR_ACTION),
    mergeMap((action: fromVendor.ActivateVendorAction) => this._tokenService.post(`vendors/${this.vendor.id}/activate`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "vendors"])
        return new fromVendor.ActivateVendorCompleteAction(response.json().message);
      },
        catchError(error => of(new fromVendor.ActivateVendorFailedAction(error.json().message)))))));

  @Effect()
  payVendor$: Observable<Action> = this._action$.pipe(ofType(fromVendor.DISABLE_VENDOR_ACTION),
    mergeMap((action: fromVendor.DisableVendorAction) => this._tokenService.post(`vendors/${this.vendor.id}/disable`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "vendors"])
        return new fromVendor.DisableVendorCompleteAction(response.json().message);
      },
        catchError(error => of(new fromVendor.DisableVendorFailedAction(error.json().message)))))));

  @Effect()
  updateVendor$: Observable<Action> = this._action$.pipe(ofType(fromVendor.UPDATE_VENDOR_ACTION),
    mergeMap((action: fromVendor.UpdateVendorAction) => this._tokenService.patch(`vendors/${action.payload.vendor.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "vendors", "view"], { queryParams: { id: response.json().message.id } });
        return new fromVendor.UpdateVendorCompleteAction(response.json().message);
      },
        catchError(error => of(new fromVendor.UpdateVendorFailedAction(error.json().message)))))));

}
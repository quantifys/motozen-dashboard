import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromInventory from '../actions/inventory.actions';

@Injectable()
export class InventoryEffects {
  constructor(
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) { }

  @Effect()
  fetchInventories$: Observable<Action> = this._action$.pipe(ofType(fromInventory.FETCH_ALL_INVENTORIES_ACTION),
    mergeMap((action: fromInventory.FetchAllInventoriesAction) => this._tokenService.get('inventory_items')
      .pipe(map(response => new fromInventory.FetchAllInventoriesCompleteAction(response.json().message),
        catchError(error => of(new fromInventory.FetchAllInventoriesFailedAction(error.json().message)))))));

  @Effect()
  fetchInventory$: Observable<Action> = this._action$.pipe(ofType(fromInventory.FETCH_INVENTORY_ACTION),
    mergeMap((action: fromInventory.FetchInventoryAction) => this._tokenService.get(`inventory_items/${action.payload}`)
      .pipe(map(response => new fromInventory.FetchInventoryCompleteAction(response.json().message),
        catchError(error => of(new fromInventory.FetchInventoryFailedAction(error.json().message)))))));

  @Effect()
  filterInventory$: Observable<Action> = this._action$.pipe(ofType(fromInventory.FILTER_INVENTORY_ACTION),
    mergeMap((action: fromInventory.FilterInventoryAction) => this._tokenService.get(`inventory_items?category=${action.payload}`)
      .pipe(map(response => new fromInventory.FilterInventoryCompleteAction(response.json().message),
        catchError(error => of(new fromInventory.FilterInventoryFailedAction(error.json().message)))))));

  @Effect()
  createNewInventory$: Observable<Action> = this._action$.pipe(ofType(fromInventory.CREATE_INVENTORY_ACTION),
    mergeMap((action: fromInventory.CreateInventoryAction) => this._tokenService.post('inventory_items', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "inventory", "view"], { queryParams: { id: response.json().message.id } })
        return new fromInventory.CreateInventoryCompleteAction(response.json().message)
      },
        catchError(error => of(new fromInventory.CreateInventoryFailedAction(error.json().message)))))));

  @Effect()
  deleteInventory$: Observable<Action> = this._action$.pipe(ofType(fromInventory.DELETE_INVENTORY_ACTION),
    mergeMap((action: fromInventory.DeleteInventoryAction) => this._tokenService.delete(`inventory_items/${action.payload}`)
      .pipe(map(response => new fromInventory.DeleteInventoryCompleteAction(response.json().message),
        catchError(error => of(new fromInventory.DeleteInventoryFailedAction(error.json().message)))))));

  @Effect()
  updateInventory$: Observable<Action> = this._action$.pipe(ofType(fromInventory.UPDATE_INVENTORY_ACTION),
    mergeMap((action: fromInventory.UpdateInventoryAction) => this._tokenService.patch(`inventory_items/${action.payload.inventory_item.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "inventory", "view"], { queryParams: { id: response.json().message.id } });
        return new fromInventory.UpdateInventoryCompleteAction(response.json().message); 
      },
        catchError(error => of(new fromInventory.UpdateInventoryFailedAction(error.json().message)))))));

}
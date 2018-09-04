import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromInventory from '../actions/inventory.actions';
import { Inventory } from '../models';

@Injectable()
export class InventoryEffects {

  private item: Inventory = new Inventory({});

  constructor(
    private _action$: Actions,
    private _store: Store<fromRoot.State>,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentInventory).subscribe(item => this.item = item);
  }

  @Effect()
  fetchInventories$: Observable<Action> = this._action$.ofType(fromInventory.FETCH_ALL_INVENTORIES_ACTION).pipe(
    map((action: fromInventory.FetchAllInventoriesAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`inventory_items/list`, body)
      .pipe(
        map(response => new fromInventory.FetchAllInventoriesCompleteAction(response.json().message)),
        catchError(error => of(new fromInventory.FetchAllInventoriesFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchInventory$: Observable<Action> = this._action$.ofType(fromInventory.FETCH_INVENTORY_ACTION).pipe(
    map((action: fromInventory.FetchInventoryAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`inventory_items/${id}`)
      .pipe(
        map(response => new fromInventory.FetchInventoryCompleteAction(response.json().message)),
        catchError(error => of(new fromInventory.FetchInventoryFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewInventory$: Observable<Action> = this._action$.ofType(fromInventory.CREATE_INVENTORY_ACTION).pipe(
    map((action: fromInventory.CreateInventoryAction) => action.payload),
    exhaustMap(body => this._tokenService.post('inventory_items', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "inventory", "view"], { queryParams: { id: response.json().message.id } });
          return new fromInventory.CreateInventoryCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromInventory.CreateInventoryFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deleteInventory$: Observable<Action> = this._action$.ofType(fromInventory.DELETE_INVENTORY_ACTION).pipe(
    map((action: fromInventory.DeleteInventoryAction) => action),
    exhaustMap(() => this._tokenService.delete(`inventory_items/${this.item.id}`)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "inventory"]);
          return new fromInventory.DeleteInventoryCompleteAction(this.item.id)
        }),
        catchError(error => {
          console.log(error);
          return of(new fromInventory.DeleteInventoryFailedAction(error.json().message));
        })
      ))
  );

  @Effect()
  updateInventory$: Observable<Action> = this._action$.ofType(fromInventory.UPDATE_INVENTORY_ACTION).pipe(
    map((action: fromInventory.UpdateInventoryAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`inventory_items/${this.item.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "inventory", "view"], { queryParams: { id: response.json().message.id } });
          return new fromInventory.UpdateInventoryCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromInventory.UpdateInventoryFailedAction(error.json().message)))
      ))
  );

}
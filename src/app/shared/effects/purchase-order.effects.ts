import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromPurchaseOrder from '../actions/purchase-order.actions';
import { PurchaseOrder } from '../models';

@Injectable()
export class PurchaseOrderEffects {

  private purchaseOrder: PurchaseOrder = new PurchaseOrder({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(order => this.purchaseOrder = order);
  }

  @Effect()
  fetchPurchaseOrders$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.FETCH_ALL_PURCHASE_ORDERS_ACTION),
    mergeMap((action: fromPurchaseOrder.FetchAllPurchaseOrdersAction) => this._tokenService.post('purchase_orders/list', action.payload)
      .pipe(map(response => new fromPurchaseOrder.FetchAllPurchaseOrdersCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromPurchaseOrder.FetchAllPurchaseOrdersFailedAction(error.json().message)))))));

  @Effect()
  fetchPurchaseOrder$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.FETCH_PURCHASE_ORDER_ACTION),
    mergeMap((action: fromPurchaseOrder.FetchPurchaseOrderAction) => this._tokenService.get(`purchase_orders/${action.payload}`)
      .pipe(map(response => new fromPurchaseOrder.FetchPurchaseOrderCompleteAction(response.json().message),
        catchError(error => of(new fromPurchaseOrder.FetchPurchaseOrderFailedAction(error.json().message)))))));

  @Effect()
  createNewPurchaseOrder$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.CREATE_PURCHASE_ORDER_ACTION),
    mergeMap((action: fromPurchaseOrder.CreatePurchaseOrderAction) => this._tokenService.post('purchase_orders', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "purchase-orders", "view"], { queryParams: { id: response.json().message.id } })
        return new fromPurchaseOrder.CreatePurchaseOrderCompleteAction(response.json().message)
      },
        catchError(error => of(new fromPurchaseOrder.CreatePurchaseOrderFailedAction(error.json().message)))))));

  @Effect()
  deletePurchaseOrder$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.DELETE_PURCHASE_ORDER_ACTION),
    mergeMap((action: fromPurchaseOrder.DeletePurchaseOrderAction) => this._tokenService.delete(`purchase_orders/${action.payload}`)
      .pipe(map(response => new fromPurchaseOrder.DeletePurchaseOrderCompleteAction(response.json().message),
        catchError(error => of(new fromPurchaseOrder.DeletePurchaseOrderFailedAction(error.json().message)))))));
  
  @Effect()
  openPurchaseOrder$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.OPEN_PURCHASE_ORDER_ACTION),
    mergeMap((action: fromPurchaseOrder.OpenPurchaseOrderAction) => this._tokenService.post(`purchase_orders/${this.purchaseOrder.id}/open`, null)
      .pipe(map(response => new fromPurchaseOrder.OpenPurchaseOrderCompleteAction(response.json().message),
        catchError(error => of(new fromPurchaseOrder.OpenPurchaseOrderFailedAction(error.json().message)))))));
  
  @Effect()
  confirmPurchaseOrder$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.CONFIRM_PURCHASE_ORDER_ACTION),
    mergeMap((action: fromPurchaseOrder.ConfirmPurchaseOrderAction) => this._tokenService.post(`purchase_orders/${this.purchaseOrder.id}/processing`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "purchase-orders"])
        return new fromPurchaseOrder.ConfirmPurchaseOrderCompleteAction(response.json().message);
      },
        catchError(error => of(new fromPurchaseOrder.ConfirmPurchaseOrderFailedAction(error.json().message)))))));

  @Effect()
  updatePurchaseOrder$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.UPDATE_PURCHASE_ORDER_ACTION),
    mergeMap((action: fromPurchaseOrder.UpdatePurchaseOrderAction) => this._tokenService.patch(`purchase_orders/${action.payload.purchase_order.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "purchase-orders", "view"], { queryParams: { id: response.json().message.id } });
        return new fromPurchaseOrder.UpdatePurchaseOrderCompleteAction(response.json().message); 
      },
        catchError(error => of(new fromPurchaseOrder.UpdatePurchaseOrderFailedAction(error.json().message)))))));

  @Effect()
  fetchPurchaseOrderFormdata$: Observable<Action> = this._action$.pipe(ofType(fromPurchaseOrder.FETCH_PURCHASE_ORDER_FORMDATA_ACTION),
    mergeMap((action: fromPurchaseOrder.FetchPurchaseOrderFormDataAction) => this._tokenService.get('purchase_orders/new')
      .pipe(map(response => new fromPurchaseOrder.FetchPurchaseOrderFormDataCompleteAction(response.json().message),
        catchError(error => of(new fromPurchaseOrder.FetchPurchaseOrderFormDataFailedAction(error.json().message)))))));

}
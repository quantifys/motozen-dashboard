import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

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
  fetchAllPurchaseOrders$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.FETCH_ALL_PURCHASE_ORDERS_ACTION).pipe(
    map((action: fromPurchaseOrder.FetchAllPurchaseOrdersAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`purchase_orders/list`, body)
      .pipe(
        map(response => new fromPurchaseOrder.FetchAllPurchaseOrdersCompleteAction({
          data: response.json().message,
          total: response.headers.get('total'),
          per_page: response.headers.get('per-page')
        })),
        catchError(error => of(new fromPurchaseOrder.FetchAllPurchaseOrdersFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchPurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.FETCH_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.FetchPurchaseOrderAction) => action.payload),
    exhaustMap(id => this._tokenService.get(`purchase_orders/${id}`)
      .pipe(
        map(response => new fromPurchaseOrder.FetchPurchaseOrderCompleteAction(response.json().message)),
        catchError(error => of(new fromPurchaseOrder.FetchPurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  createNewPurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.CREATE_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.CreatePurchaseOrderAction) => action.payload),
    exhaustMap(body => this._tokenService.post('purchase_orders', body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "purchase-orders", "view"], { queryParams: { id: response.json().message.id } });
          return new fromPurchaseOrder.CreatePurchaseOrderCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromPurchaseOrder.CreatePurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  deletePurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.DELETE_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.DeletePurchaseOrderAction) => action),
    exhaustMap(() => this._tokenService.delete(`purchase_orders/${this.purchaseOrder.id}`)
      .pipe(
        map(() => {
          this._router.navigate(["dashboard", "purchase-orders"]);
          return new fromPurchaseOrder.DeletePurchaseOrderCompleteAction(this.purchaseOrder.id);
        }),
        catchError(error => of(new fromPurchaseOrder.DeletePurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  updatePurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.UPDATE_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.UpdatePurchaseOrderAction) => action.payload),
    exhaustMap(body => this._tokenService.patch(`purchase_orders/${this.purchaseOrder.id}`, body)
      .pipe(
        map(response => {
          this._router.navigate(["dashboard", "purchase-orders", "view"], { queryParams: { id: response.json().message.id } });
          return new fromPurchaseOrder.UpdatePurchaseOrderCompleteAction(response.json().message)
        }),
        catchError(error => of(new fromPurchaseOrder.UpdatePurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  openPurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.OPEN_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.OpenPurchaseOrderAction) => action),
    exhaustMap(() => this._tokenService.post(`purchase_orders/${this.purchaseOrder.id}/open`, null)
      .pipe(
        map(response => new fromPurchaseOrder.OpenPurchaseOrderCompleteAction(response.json().message)),
        catchError(error => of(new fromPurchaseOrder.OpenPurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  confirmPurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.CONFIRM_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.ConfirmPurchaseOrderAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`purchase_orders/${this.purchaseOrder.id}/processing`, body)
      .pipe(
        map(response => new fromPurchaseOrder.ConfirmPurchaseOrderCompleteAction(response.json().message)),
        catchError(error => of(new fromPurchaseOrder.ConfirmPurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  dispatchPurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.DISPATCH_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.DispatchPurchaseOrderAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`purchase_orders/${this.purchaseOrder.id}/dispatch`, body)
      .pipe(
        map(response => new fromPurchaseOrder.DispatchPurchaseOrderCompleteAction(response.json().message)),
        catchError(error => of(new fromPurchaseOrder.DispatchPurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  closePurchaseOrder$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.CLOSE_PURCHASE_ORDER_ACTION).pipe(
    map((action: fromPurchaseOrder.ClosePurchaseOrderAction) => action.payload),
    exhaustMap(body => this._tokenService.post(`purchase_orders/${this.purchaseOrder.id}/close`, body)
      .pipe(
        map(response => new fromPurchaseOrder.ClosePurchaseOrderCompleteAction(response.json().message)),
        catchError(error => of(new fromPurchaseOrder.ClosePurchaseOrderFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchPurchaseOrderFormdata$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.FETCH_PURCHASE_ORDER_FORMDATA_ACTION).pipe(
    map((action: fromPurchaseOrder.FetchPurchaseOrderFormDataAction) => action),
    exhaustMap(() => this._tokenService.get('purchase_orders/new')
      .pipe(
        map(response => new fromPurchaseOrder.FetchPurchaseOrderFormDataCompleteAction(response.json().message)),
        catchError(error => of(new fromPurchaseOrder.FetchPurchaseOrderFormDataFailedAction(error.json().message)))
      ))
  );

  @Effect()
  fetchPurchaseOrderFilterdata$: Observable<Action> = this._action$.ofType(fromPurchaseOrder.FETCH_PURCHASE_ORDER_FILTER_DATA_ACTION).pipe(
    map((action: fromPurchaseOrder.FetchPurchaseOrderFilterDataAction) => action),
    exhaustMap(() => this._tokenService.get('purchase_orders/list/filter-data')
      .pipe(
        map(response => new fromPurchaseOrder.FetchPurchaseOrderFilterDataCompleteAction(response.json().message)),
        catchError(error => of(new fromPurchaseOrder.FetchPurchaseOrderFilterDataFailedAction(error.json().message)))
      ))
  );

}
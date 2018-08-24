import { Router } from '@angular/router';
import { Angular2TokenService } from 'angular2-token';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import * as fromRoot from '../../shared/reducers';
import * as fromRequisitionOrder from '../actions/requisition-order.actions';
import { RequisitionOrder } from '../models';

@Injectable()
export class RequisitionOrderEffects {

  private requisitionOrder: RequisitionOrder = new RequisitionOrder({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _action$: Actions,
    private _tokenService: Angular2TokenService,
    private _router: Router
  ) {
    this._store.select(fromRoot.getCurrentRequisitionOrder).subscribe(slip => this.requisitionOrder = slip);
  }

  @Effect()
  fetchRequisitionOrders$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.FETCH_ALL_REQUISITION_ORDERS_ACTION),
    mergeMap((action: fromRequisitionOrder.FetchAllRequisitionOrdersAction) => this._tokenService.post('req_orders/list', action.payload)
      .pipe(map(response => new fromRequisitionOrder.FetchAllRequisitionOrdersCompleteAction({
        data: response.json().message,
        total: response.headers.get('total'),
        per_page: response.headers.get('per-page')
      }),
        catchError(error => of(new fromRequisitionOrder.FetchAllRequisitionOrdersFailedAction(error.json().message)))))));

  @Effect()
  fetchRequisitionOrder$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.FETCH_REQUISITION_ORDER_ACTION),
    mergeMap((action: fromRequisitionOrder.FetchRequisitionOrderAction) => this._tokenService.get(`req_orders/${action.payload}`)
      .pipe(map(response => new fromRequisitionOrder.FetchRequisitionOrderCompleteAction(response.json().message),
        catchError(error => of(new fromRequisitionOrder.FetchRequisitionOrderFailedAction(error.json().message)))))));

  @Effect()
  fetchRequisitionOrderFormData$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.FETCH_REQUISITION_ORDER_FORM_DATA_ACTION),
    mergeMap((action: fromRequisitionOrder.FetchRequisitionOrderFormDataAction) => this._tokenService.get('inventory_items')
      .pipe(map(response => new fromRequisitionOrder.FetchRequisitionOrderFormDataCompleteAction(response.json().message),
        catchError(error => of(new fromRequisitionOrder.FetchRequisitionOrderFormDataFailedAction(error.json().message)))))));

  @Effect()
  createNewRequisitionOrder$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.CREATE_REQUISITION_ORDER_ACTION),
    mergeMap((action: fromRequisitionOrder.CreateRequisitionOrderAction) => this._tokenService.post('req_orders', action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "requisition-orders", "view"], { queryParams: { id: response.json().message.id } })
        return new fromRequisitionOrder.CreateRequisitionOrderCompleteAction(response.json().message)
      },
        catchError(error => of(new fromRequisitionOrder.CreateRequisitionOrderFailedAction(error.json().message)))))));

  @Effect()
  deleteRequisitionOrder$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.DELETE_REQUISITION_ORDER_ACTION),
    mergeMap((action: fromRequisitionOrder.DeleteRequisitionOrderAction) => this._tokenService.delete(`req_orders/${this.requisitionOrder.id}`)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "requisition-orders"]);
        return new fromRequisitionOrder.DeleteRequisitionOrderCompleteAction
      },
        catchError(error => of(new fromRequisitionOrder.DeleteRequisitionOrderFailedAction(error.json().message)))))));

  @Effect()
  openRequisitionOrder$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.OPEN_REQUISITION_ORDER_ACTION),
    mergeMap((action: fromRequisitionOrder.OpenRequisitionOrderAction) => this._tokenService.post(`req_orders/${this.requisitionOrder.id}/open`, null)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "requisition-orders"])
        return new fromRequisitionOrder.OpenRequisitionOrderCompleteAction(response.json().message);
      },
        catchError(error => of(new fromRequisitionOrder.OpenRequisitionOrderFailedAction(error.json().message)))))));

  @Effect()
  closeRequisitionOrder$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.CLOSE_REQUISITION_ORDER_ACTION),
    mergeMap((action: fromRequisitionOrder.CloseRequisitionOrderAction) => this._tokenService.post(`req_orders/${this.requisitionOrder.id}/close`, null)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "requisition-orders"])
        return new fromRequisitionOrder.CloseRequisitionOrderCompleteAction(response.json().message);
      },
        catchError(error => of(new fromRequisitionOrder.CloseRequisitionOrderFailedAction(error.json().message)))))));

  @Effect()
  updateRequisitionOrder$: Observable<Action> = this._action$.pipe(ofType(fromRequisitionOrder.UPDATE_REQUISITION_ORDER_ACTION),
    mergeMap((action: fromRequisitionOrder.UpdateRequisitionOrderAction) => this._tokenService.patch(`req_orders/${action.payload.req_order.id}`, action.payload)
      .pipe(map(response => {
        this._router.navigate(["dashboard", "requisition-orders", "view"], { queryParams: { id: response.json().message.id } });
        return new fromRequisitionOrder.UpdateRequisitionOrderCompleteAction(response.json().message);
      },
        catchError(error => of(new fromRequisitionOrder.UpdateRequisitionOrderFailedAction(error.json().message)))))));

}
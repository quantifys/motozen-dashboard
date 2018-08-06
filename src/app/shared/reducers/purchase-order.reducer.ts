import { PurchaseOrder } from '../models';

import * as purchaseOrderActions from '../actions/purchase-order.actions';

export interface State {
  allPurchaseOrders: PurchaseOrder[];
  currentPurchaseOrder: PurchaseOrder;
}

const initialState: State = {
  allPurchaseOrders: [],
  currentPurchaseOrder: new PurchaseOrder({})
};

export function reducer(state = initialState, action: purchaseOrderActions.Actions): State {
  let purchaseOrders: PurchaseOrder[] = [];
  switch (action.type) {
    case purchaseOrderActions.FETCH_ALL_PURCHASE_ORDERS_COMPLETE_ACTION:
      purchaseOrders = action.payload.map(purchaseOrder => new PurchaseOrder(purchaseOrder));
      return Object.assign({}, state, {
        allPurchaseOrders: [...purchaseOrders]
      });
    case purchaseOrderActions.FETCH_PURCHASE_ORDER_ACTION:
      return Object.assign({}, state, {
        currentPurchaseOrder: new PurchaseOrder({})
      });
    case purchaseOrderActions.FETCH_PURCHASE_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentPurchaseOrder: new PurchaseOrder(action.payload)
      });
    case purchaseOrderActions.DELETE_PURCHASE_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allPurchaseOrders: [...state.allPurchaseOrders.filter(purchaseOrder => purchaseOrder.id != state.currentPurchaseOrder.id ? purchaseOrder : null)],
        currentPurchaseOrder: new PurchaseOrder({})
      });
    case purchaseOrderActions.DELETE_PURCHASE_ORDER_ACTION:
      return Object.assign({}, state, {
        currentPurchaseOrder: new PurchaseOrder({
          id: action.payload
        })
      });
    case purchaseOrderActions.UPDATE_PURCHASE_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allPurchaseOrders: [...state.allPurchaseOrders.map(purchaseOrder => purchaseOrder.id != action.payload.id ? purchaseOrder : new PurchaseOrder(action.payload))]
      });
    case purchaseOrderActions.CREATE_PURCHASE_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allPurchaseOrders: [...state.allPurchaseOrders, new PurchaseOrder(action.payload)]
      });
    case purchaseOrderActions.DELETE_PURCHASE_ORDER_FAILED_ACTION:
      return Object.assign({}, state, {
        currentPurchaseOrder: new PurchaseOrder({})
      });
    default:
      return state;
  }
}

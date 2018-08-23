import { RequisitionOrder, PageData } from '../models';

import * as requisitionOrderActions from '../actions/requisition-order.actions';

export interface State {
  allRequisitionOrders: RequisitionOrder[];
  currentRequisitionOrder: RequisitionOrder;
  requisitionOrderPageStatus: PageData;
  requisitionOrderFormData: any;
}

const initialState: State = {
  allRequisitionOrders: [],
  currentRequisitionOrder: new RequisitionOrder({}),
  requisitionOrderPageStatus: new PageData({}),
  requisitionOrderFormData: null
};

export function reducer(state = initialState, action: requisitionOrderActions.Actions): State {
  let requisitionOrders: RequisitionOrder[] = [];
  switch (action.type) {
    case requisitionOrderActions.FETCH_ALL_REQUISITION_ORDERS_COMPLETE_ACTION:
      requisitionOrders = action.payload.data.map(requisitionOrder => new RequisitionOrder(requisitionOrder));
      return Object.assign({}, state, {
        allRequisitionOrders: [...requisitionOrders],
        requisitionOrderPageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case requisitionOrderActions.FETCH_REQUISITION_ORDER_ACTION:
      return Object.assign({}, state, {
        currentRequisitionOrder: new RequisitionOrder({})
      });
    case requisitionOrderActions.FETCH_REQUISITION_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentRequisitionOrder: new RequisitionOrder(action.payload)
      });
    case requisitionOrderActions.DELETE_REQUISITION_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allRequisitionOrders: [...state.allRequisitionOrders.filter(requisitionOrder => requisitionOrder.id != state.currentRequisitionOrder.id ? requisitionOrder : null)],
        currentRequisitionOrder: new RequisitionOrder({})
      });
    case requisitionOrderActions.UPDATE_REQUISITION_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allRequisitionOrders: [...state.allRequisitionOrders.map(requisitionOrder => requisitionOrder.id != action.payload.id ? requisitionOrder : new RequisitionOrder(action.payload))]
      });
    case requisitionOrderActions.CREATE_REQUISITION_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allRequisitionOrders: [...state.allRequisitionOrders, new RequisitionOrder(action.payload)]
      });
    case requisitionOrderActions.DELETE_REQUISITION_ORDER_FAILED_ACTION:
      return Object.assign({}, state, {
        currentRequisitionOrder: new RequisitionOrder({})
      });
    case requisitionOrderActions.CONFIRM_REQUISITION_ORDER_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentRequisitionOrder: new RequisitionOrder({})
      });
    case requisitionOrderActions.FETCH_REQUISITION_ORDER_FORM_DATA_COMPLETE_ACTION:
      return Object.assign({}, state, {
        requisitionOrderFormData: action.payload
      });
    default:
      return state;
  }
}

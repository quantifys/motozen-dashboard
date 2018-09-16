import { Vendor, PageData } from '../models';

import * as vendorActions from '../actions/vendor.actions';

export interface State {
  allVendors: Vendor[];
  currentVendor: Vendor;
  vendorPageStatus: PageData;
}

const initialState: State = {
  allVendors: [],
  currentVendor: new Vendor({}),
  vendorPageStatus: new PageData({})
};

export function reducer(state = initialState, action: vendorActions.Actions): State {
  let vendors: Vendor[] = [];
  switch (action.type) {
    case vendorActions.FETCH_ALL_VENDORS_ACTION:
      return Object.assign({}, state, {
        allVendors: []
      });
    case vendorActions.FETCH_ALL_VENDORS_COMPLETE_ACTION:
      vendors = action.payload.data.map(vendor => new Vendor(vendor));
      return Object.assign({}, state, {
        allVendors: [...vendors],
        vendorPageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case vendorActions.FETCH_VENDOR_ACTION:
      return Object.assign({}, state, {
        currentVendor: new Vendor({})
      });
    case vendorActions.FETCH_VENDOR_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVendor: new Vendor(action.payload)
      });
    case vendorActions.DELETE_VENDOR_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVendors: [...state.allVendors.filter(vendor => vendor.id != state.currentVendor.id ? vendor : null)],
        currentVendor: new Vendor({})
      });
    case vendorActions.UPDATE_VENDOR_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVendors: [...state.allVendors.map(vendor => vendor.id != action.payload.id ? vendor : new Vendor(action.payload))]
      });
    case vendorActions.CREATE_VENDOR_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVendors: [...state.allVendors, new Vendor(action.payload)]
      });
    case vendorActions.DELETE_VENDOR_FAILED_ACTION:
      return Object.assign({}, state, {
        currentVendor: new Vendor({})
      });
    case vendorActions.ACTIVATE_VENDOR_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVendor: new Vendor(action.payload)
      });
    case vendorActions.DISABLE_VENDOR_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVendor: new Vendor(action.payload)
      });
    case vendorActions.CLEAR_VENDOR_DATA_ACTION:
      return Object.assign({}, state, {
        currentVendor: new Vendor({})
      });
    default:
      return state;
  }
}

import { Inventory } from '../models';

import * as inventoryActions from '../actions/inventory.actions';

export interface State {
  allInventories: Inventory[];
  currentInventory: Inventory;
}

const initialState: State = {
  allInventories: [],
  currentInventory: new Inventory({})
};

export function reducer(state = initialState, action: inventoryActions.Actions): State {
  let inventories: Inventory[] = [];
  switch (action.type) {
    case inventoryActions.FETCH_ALL_INVENTORIES_COMPLETE_ACTION:
      inventories = action.payload.map(inventory => new Inventory(inventory));
      return Object.assign({}, state, {
        allInventories: [...inventories]
      });
    case inventoryActions.FETCH_INVENTORY_ACTION:
      return Object.assign({}, state, {
        currentInventory: new Inventory({})
      });
    case inventoryActions.FETCH_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentInventory: new Inventory(action.payload)
      });
    case inventoryActions.FILTER_INVENTORY_ACTION:
      inventories = action.payload.map(inventory => new Inventory(inventory));
      return Object.assign({}, state, {
        allInventories: [...inventories]
      });
    case inventoryActions.DELETE_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allInventories: [...state.allInventories.filter(inventory => inventory.id != state.currentInventory.id ? inventory : null)],
        currentInventory: new Inventory({})
      });
    case inventoryActions.DELETE_INVENTORY_ACTION:
      return Object.assign({}, state, {
        currentInventory: new Inventory({
          id: action.payload
        })
      });
    case inventoryActions.UPDATE_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allInventories: [...state.allInventories.map(inventory => inventory.id != action.payload.id ? inventory : new Inventory(action.payload))]
      });
    case inventoryActions.CREATE_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allInventories: [...state.allInventories, new Inventory(action.payload)]
      });
    case inventoryActions.DELETE_INVENTORY_FAILED_ACTION:
      return Object.assign({}, state, {
        currentInventory: new Inventory({})
      });
    default:
      return state;
  }
}

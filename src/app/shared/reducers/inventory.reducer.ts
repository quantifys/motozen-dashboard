import { Inventory, PageData } from '../models';
import * as inventoryActions from '../actions/inventory.actions';

export interface State {
  allInventories: Inventory[];
  currentInventory: Inventory;
  inventoryPageStatus: PageData;
}

const initialState: State = {
  allInventories: [],
  currentInventory: new Inventory({}),
  inventoryPageStatus: new PageData({})
};

export function reducer(state = initialState, action: inventoryActions.Actions): State {
  let inventories: Inventory[] = [];
  switch (action.type) {
    case inventoryActions.FETCH_ALL_INVENTORIES_COMPLETE_ACTION:
      inventories = action.payload.data.map(inventory => new Inventory(inventory));
      return Object.assign({}, state, {
        allInventories: [...inventories],
        inventoryPageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case inventoryActions.FETCH_INVENTORY_ACTION:
      return Object.assign({}, state, {
        currentInventory: new Inventory({})
      });
    case inventoryActions.FETCH_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentInventory: new Inventory(action.payload)
      });
    case inventoryActions.DELETE_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allInventories: [...state.allInventories.filter(inventory => inventory.id != action.payload ? inventory : null)],
        currentInventory: new Inventory({})
      });
    case inventoryActions.UPDATE_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allInventories: [...state.allInventories.map(inventory => inventory.id != action.payload.id ? inventory : new Inventory(action.payload))]
      });
    case inventoryActions.CREATE_INVENTORY_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allInventories: [...state.allInventories, new Inventory(action.payload)]
      });
    case inventoryActions.CLEAR_INVENTORY_DATA_ACTION:
      return Object.assign({}, state, {
        currentInventory: new Inventory({})
      });
    default:
      return state;
  }
}

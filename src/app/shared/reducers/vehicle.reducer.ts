import { Vehicle } from '../models';

import * as vehicleActions from '../actions/vehicle.actions';

export interface State {
  allVehicles: Vehicle[];
  currentVehicle: Vehicle;
}

const initialState: State = {
  allVehicles: [],
  currentVehicle: new Vehicle({})
};

export function reducer(state = initialState, action: vehicleActions.Actions): State {
  let vehicles: Vehicle[] = [];
  switch (action.type) {
    case vehicleActions.FETCH_ALL_VEHICLES_COMPLETE_ACTION:
      vehicles = action.payload.map(vehicle => new Vehicle(vehicle));
      return Object.assign({}, state, {
        allVehicles: [...vehicles]
      });
    case vehicleActions.FETCH_VEHICLE_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle({})
      });
    case vehicleActions.FETCH_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle(action.payload)
      });
    case vehicleActions.DELETE_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVehicles: [...state.allVehicles.filter(vehicle => vehicle.id != state.currentVehicle.id ? vehicle : null)],
        currentVehicle: new Vehicle({})
      });
    case vehicleActions.DELETE_VEHICLE_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle({
          id: action.payload
        })
      });
    case vehicleActions.UPDATE_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVehicles: [...state.allVehicles.map(vehicle => vehicle.id != action.payload.id ? vehicle : new Vehicle(action.payload))],
        showVehicleModal: false
      });
    case vehicleActions.CREATE_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVehicles: [...state.allVehicles, new Vehicle(action.payload)]
      });
    case vehicleActions.DELETE_VEHICLE_FAILED_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle({})
      });
    default:
      return state;
  }
}

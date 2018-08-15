import { Vehicle } from '../models';

import * as vehicleActions from '../actions/vehicle.actions';

export interface State {
  allVehicles: Vehicle[];
  currentVehicle: Vehicle;
  currentVehicleId: number;
  currentVehicleIcatId: number;
}

const initialState: State = {
  allVehicles: [],
  currentVehicle: new Vehicle({}),
  currentVehicleId: null,
  currentVehicleIcatId: null
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
        allVehicles: [...state.allVehicles.filter(vehicle => vehicle.id != state.currentVehicleId ? vehicle : null)],
        currentVehicleId: null
      });
    case vehicleActions.DELETE_VEHICLE_ACTION:
      return Object.assign({}, state, {
        currentVehicleId: action.payload
      });
    case vehicleActions.UPDATE_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle(action.payload)
      });
    case vehicleActions.CREATE_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVehicles: [...state.allVehicles, new Vehicle(action.payload)]
      });
    case vehicleActions.DELETE_VEHICLE_FAILED_ACTION:
      return Object.assign({}, state, {
        currentVehicleId: null
      });
    case vehicleActions.DELETE_VEHICLE_ICAT_ACTION:
      return Object.assign({}, state, {
        currentVehicleId: action.payload.vehicle_id,
        currentVehicleIcatId: action.payload.icat_id
      });
    case vehicleActions.DELETE_VEHICLE_ICAT_COMPLETE_ACTION:
      let vehicle: Vehicle = state.currentVehicle;
      vehicle.icats = vehicle.icats.filter(icat => icat.id !== state.currentVehicleIcatId);
      return Object.assign({}, state, {
        currentVehicle: new Vehicle(vehicle)
      });
    case vehicleActions.UPDATE_VEHICLE_ICAT_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle(action.payload)
      });
    default:
      return state;
  }
}

import { Vehicle, PageData } from '../models';
import * as vehicleActions from '../actions/vehicle.actions';

export interface State {
  allVehicles: Vehicle[];
  currentVehicle: Vehicle;
  vehiclePageStatus: PageData;
}

const initialState: State = {
  allVehicles: [],
  currentVehicle: new Vehicle({}),
  vehiclePageStatus: new PageData({})
};

export function reducer(state = initialState, action: vehicleActions.Actions): State {
  let vehicles: Vehicle[] = [];
  switch (action.type) {
    case vehicleActions.FETCH_ALL_VEHICLES_COMPLETE_ACTION:
      vehicles = action.payload.data.map(vehicle => new Vehicle(vehicle));
      return Object.assign({}, state, {
        allVehicles: [...vehicles],
        vehiclePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
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
        allVehicles: [...state.allVehicles.filter(vehicle => vehicle.id != action.payload ? vehicle : null)]
      });
    case vehicleActions.UPDATE_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle(action.payload)
      });
    case vehicleActions.CREATE_VEHICLE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allVehicles: [...state.allVehicles, new Vehicle(action.payload)]
      });
    case vehicleActions.DELETE_VEHICLE_ICAT_COMPLETE_ACTION:
      let vehicle: Vehicle = state.currentVehicle;
      vehicle.icats = vehicle.icats.filter(icat => icat.id !== action.payload);
      return Object.assign({}, state, {
        currentVehicle: new Vehicle(vehicle)
      });
    case vehicleActions.UPDATE_VEHICLE_ICAT_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle(action.payload)
      });
    case vehicleActions.CLEAR_VEHICLE_DATA_ACTION:
      return Object.assign({}, state, {
        currentVehicle: new Vehicle({})
      });
    default:
      return state;
  }
}

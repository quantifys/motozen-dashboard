import { Device } from '../models';

import * as deviceActions from '../actions/device.actions';

export interface State {
  allDevices: Device[];
  currentDevice: Device;
}

const initialState: State = {
  allDevices: [],
  currentDevice: new Device({})
};

export function reducer(state = initialState, action: deviceActions.Actions): State {
  let devices: Device[] = [];
  switch (action.type) {
    case deviceActions.FETCH_ALL_DEVICES_COMPLETE_ACTION:
      devices = action.payload.map(device => new Device(device));
      return Object.assign({}, state, {
        allDevices: [...devices]
      });
    case deviceActions.FETCH_DEVICE_ACTION:
      return Object.assign({}, state, {
        currentDevice: new Device({})
      });
    case deviceActions.FETCH_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentDevice: new Device(action.payload)
      });
    case deviceActions.DELETE_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allDevices: [...state.allDevices.filter(device => device.id != state.currentDevice.id ? device : null)],
        currentDevice: new Device({})
      });
    case deviceActions.DELETE_DEVICE_ACTION:
      return Object.assign({}, state, {
        currentDevice: new Device({
          id: action.payload
        })
      });
    case deviceActions.UPDATE_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allDevices: [...state.allDevices.map(device => device.id != action.payload.id ? device : new Device(action.payload))],
        showDeviceModal: false
      });
    case deviceActions.CREATE_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allDevices: [...state.allDevices, new Device(action.payload)]
      });
    case deviceActions.DELETE_DEVICE_FAILED_ACTION:
      return Object.assign({}, state, {
        currentDevice: new Device({})
      });
    default:
      return state;
  }
}

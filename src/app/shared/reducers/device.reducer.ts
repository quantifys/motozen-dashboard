import { Device, PageData } from '../models';

import * as deviceActions from '../actions/device.actions';

export interface State {
  allDevices: Device[];
  currentDevice: Device;
  devicePageStatus: PageData;
}

const initialState: State = {
  allDevices: [],
  currentDevice: new Device({}),
  devicePageStatus: new PageData({})
};

export function reducer(state = initialState, action: deviceActions.Actions): State {
  let devices: Device[] = [];
  switch (action.type) {
    case deviceActions.FETCH_ALL_DEVICES_COMPLETE_ACTION:
      devices = action.payload.data.map(device => new Device(device));
      return Object.assign({}, state, {
        allDevices: [...devices],
        devicePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
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
        allDevices: [...state.allDevices.filter(device => device.id != action.payload ? device : null)],
        currentDevice: new Device({})
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
    case deviceActions.TRANSFER_DEVICE_COMPLETE_ACTION:
      devices = state.allDevices.filter(device => action.payload.find(id => device.id == id) ? null : device);
      return Object.assign({}, state, {
        allDevices: [...devices]
      });
    case deviceActions.CLEAR_DEVICE_DATA_ACTION:
      return Object.assign({}, state, {
        currentDevice: new Device({})
      });
    default:
      return state;
  }
}

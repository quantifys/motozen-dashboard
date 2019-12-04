import { TrackerDevice, PageData, User } from '../models';
import * as trackerDeviceActions from '../actions/tracker-device.actions';

export interface State {
  allTrackerDevices: TrackerDevice[];
  currentTrackerDevice: TrackerDevice;
  trackerDevicePageStatus: PageData;
  dealers: User[];
  trackerDevices: TrackerDevice[];
}

const initialState: State = {
  allTrackerDevices: [],
  currentTrackerDevice: new TrackerDevice({}),
  trackerDevicePageStatus: new PageData({}),
  dealers: [],
  trackerDevices: []
};

export function reducer(state = initialState, action: trackerDeviceActions.Actions): State {
  let trackerDevices: TrackerDevice[] = [];
  switch (action.type) {
    case trackerDeviceActions.FETCH_ALL_TRACKER_DEVICES_ACTION:
      return Object.assign({}, state, {
        allTrackerDevices: []
      });
    case trackerDeviceActions.FETCH_ALL_TRACKER_DEVICES_COMPLETE_ACTION:
      trackerDevices = action.payload.data.map(trackerDevice => new TrackerDevice(trackerDevice));
      return Object.assign({}, state, {
        allTrackerDevices: [...trackerDevices],
        trackerDevicePageStatus: new PageData({
          total: action.payload.total,
          per_page: action.payload.per_page,
        })
      });
    case trackerDeviceActions.FETCH_TRACKER_DEVICE_ACTION:
      return Object.assign({}, state, {
        currentTrackerDevice: new TrackerDevice({})
      });
    case trackerDeviceActions.FETCH_TRACKER_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        currentTrackerDevice: new TrackerDevice(action.payload)
      });
    case trackerDeviceActions.DELETE_TRACKER_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allTrackerDevices: [...state.allTrackerDevices.filter(trackerDevice => trackerDevice.id !== action.payload ? trackerDevice : null)],
        currentTrackerDevice: new TrackerDevice({})
      });
    case trackerDeviceActions.UPDATE_TRACKER_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allTrackerDevices: [...state.allTrackerDevices.map(trackerDevice =>
          trackerDevice.id !== action.payload.id ? trackerDevice : new TrackerDevice(action.payload))],
        showTrackerDeviceModal: false
      });
    case trackerDeviceActions.CREATE_TRACKER_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allTrackerDevices: [...state.allTrackerDevices, new TrackerDevice(action.payload)]
      });
    case trackerDeviceActions.TRANSFER_TRACKER_DEVICE_COMPLETE_ACTION:
      return Object.assign({}, state, {
        allTrackerDevices: []
      });
    case trackerDeviceActions.FETCH_TRACKER_DEVICE_TRANSFER_FORMDATA_COMPLETE_ACTION:
      const dealers = action.payload['dealers'] ? action.payload['dealers'] : [];
      const devices = action.payload['devices'] ? action.payload['devices'] : [];
      return Object.assign({}, state, {
        dealers: [...dealers.filter(user => new User(user))],
        trackerDevices: [...devices.filter(trackerDevice => new TrackerDevice(trackerDevice))]
      });
    case trackerDeviceActions.CLEAR_TRACKER_DEVICE_DATA_ACTION:
      return Object.assign({}, state, {
        currentTrackerDevice: new TrackerDevice({})
      });
    default:
      return state;
  }
}

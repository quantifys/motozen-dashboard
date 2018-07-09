import { ActionReducerMap, Action, createSelector } from "@ngrx/store";

import * as fromUser from "./user.reducer";
import * as fromDevice from "./device.reducer";

export interface State {
  users: fromUser.State;
  devices: fromDevice.State;
}

export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer,
  devices: fromDevice.reducer
};

export const users = (state: State) => state.users;
export const getAllUsers = createSelector(users, (state: fromUser.State) => state.allUsers.filter(user => user.id != state.loggedUser.id));
export const getLoggedUser = createSelector(users, (state: fromUser.State) => state.loggedUser);
export const getCurrentUser = createSelector(users, (state: fromUser.State) => state.currentUser);
export const showUserModal = createSelector(users, (state: fromUser.State) => state.showUserModal);

export const devices = (state: State) => state.devices;
export const getAllDevices = createSelector(devices, (state: fromDevice.State) => state.allDevices);
export const getCurrentDevice = createSelector(devices, (state: fromDevice.State) => state.currentDevice);
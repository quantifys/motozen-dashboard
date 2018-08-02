import { ActionReducerMap, createSelector } from "@ngrx/store";

import * as fromUser from "./user.reducer";
import * as fromDevice from "./device.reducer";
import * as fromInventory from "./inventory.reducer";
import * as fromCertificate from "./certificate.reducer";

export interface State {
  users: fromUser.State;
  devices: fromDevice.State;
  inventories: fromInventory.State;
  certificates: fromCertificate.State;
}

export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer,
  devices: fromDevice.reducer,
  inventories: fromInventory.reducer,
  certificates: fromCertificate.reducer
};

export const users = (state: State) => state.users;
export const getAllUsers = createSelector(users, (state: fromUser.State) => state.allUsers.filter(user => user.id != state.loggedUser.id));
export const getLoggedUser = createSelector(users, (state: fromUser.State) => state.loggedUser);
export const getCurrentUser = createSelector(users, (state: fromUser.State) => state.currentUser);
export const showUserModal = createSelector(users, (state: fromUser.State) => state.showUserModal);

export const devices = (state: State) => state.devices;
export const getAllDevices = createSelector(devices, (state: fromDevice.State) => state.allDevices);
export const getCurrentDevice = createSelector(devices, (state: fromDevice.State) => state.currentDevice);

export const inventories = (state: State) => state.inventories;
export const getAllInventories = createSelector(inventories, (state: fromInventory.State) => state.allInventories);
export const getCurrentInventory = createSelector(inventories, (state: fromInventory.State) => state.currentInventory);

export const certificates = (state: State) => state.certificates;
export const getAllCertificates = createSelector(certificates, (state: fromCertificate.State) => state.allCertificates);
export const getCurrentCertificate = createSelector(certificates, (state: fromCertificate.State) => state.currentCertificate);
export const getCertificateFormdata = createSelector(certificates, (state: fromCertificate.State) => state.certificateFormdata);
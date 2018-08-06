import { ActionReducerMap, createSelector } from "@ngrx/store";

import * as fromUser from "./user.reducer";
import * as fromDevice from "./device.reducer";
import * as fromVehicle from "./vehicle.reducer";
import * as fromInventory from "./inventory.reducer";
import * as fromCertificate from "./certificate.reducer";
import * as fromPurchaseOrder from "./purchase-order.reducer";

export interface State {
  users: fromUser.State;
  devices: fromDevice.State;
  vehicles: fromVehicle.State;
  inventories: fromInventory.State;
  certificates: fromCertificate.State;
  purchaseOrders: fromPurchaseOrder.State;
}

export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer,
  devices: fromDevice.reducer,
  vehicles: fromVehicle.reducer,
  inventories: fromInventory.reducer,
  certificates: fromCertificate.reducer,
  purchaseOrders: fromPurchaseOrder.reducer
};

export const users = (state: State) => state.users;
export const getAllUsers = createSelector(users, (state: fromUser.State) => state.allUsers.filter(user => user.id != state.loggedUser.id));
export const getLoggedUser = createSelector(users, (state: fromUser.State) => state.loggedUser);
export const getCurrentUser = createSelector(users, (state: fromUser.State) => state.currentUser);
export const showUserModal = createSelector(users, (state: fromUser.State) => state.showUserModal);

export const devices = (state: State) => state.devices;
export const getAllDevices = createSelector(devices, (state: fromDevice.State) => state.allDevices);
export const getCurrentDevice = createSelector(devices, (state: fromDevice.State) => state.currentDevice);

export const vehicles = (state: State) => state.vehicles;
export const getAllVehicles = createSelector(vehicles, (state: fromVehicle.State) => state.allVehicles);
export const getCurrentVehicle = createSelector(vehicles, (state: fromVehicle.State) => state.currentVehicle);

export const inventories = (state: State) => state.inventories;
export const getAllInventories = createSelector(inventories, (state: fromInventory.State) => state.allInventories);
export const getCurrentInventory = createSelector(inventories, (state: fromInventory.State) => state.currentInventory);

export const certificates = (state: State) => state.certificates;
export const getAllCertificates = createSelector(certificates, (state: fromCertificate.State) => state.allCertificates);
export const getCurrentCertificate = createSelector(certificates, (state: fromCertificate.State) => state.currentCertificate);
export const getCertificateFormdata = createSelector(certificates, (state: fromCertificate.State) => state.certificateFormdata);
export const getCertificatePageStatus = createSelector(certificates, (state: fromCertificate.State) => state.currentCertificatePageStatus);

export const purchaseOrders = (state: State) => state.purchaseOrders;
export const getAllPurchaseOrders = createSelector(purchaseOrders, (state: fromPurchaseOrder.State) => state.allPurchaseOrders);
export const getCurrentPurchaseOrder = createSelector(purchaseOrders, (state: fromPurchaseOrder.State) => state.currentPurchaseOrder);
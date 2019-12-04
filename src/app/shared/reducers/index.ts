import { ActionReducerMap, createSelector } from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';
import * as fromUser from './user.reducer';
import * as fromVtsUser from './vts-user.reducer';
import * as fromDevice from './device.reducer';
import * as fromTrackerDevice from './tracker-device.reducer';
import * as fromVehicle from './vehicle.reducer';
import * as fromInventory from './inventory.reducer';
import * as fromCertificate from './certificate.reducer';
import * as fromTrackerCertificate from './tracker-certificate.reducer';
import * as fromExpense from './expense.reducer';
import * as fromIncome from './income.reducer';
import * as fromPurchaseOrder from './purchase-order.reducer';
import * as fromReceiveNote from './receive-note.reducer';
import * as fromRequisitionOrder from './requisition-order.reducer';
import * as fromSalarySlip from './salary-slip.reducer';
import * as fromTransaction from './transaction.reducer';
import * as fromVendor from './vendor.reducer';
import * as fromReports from './reports.reducer';

export interface State {
  dashboard: fromDashboard.State;
  users: fromUser.State;
  vtsUsers: fromVtsUser.State;
  devices: fromDevice.State;
  trackerDevices: fromTrackerDevice.State;
  vehicles: fromVehicle.State;
  inventories: fromInventory.State;
  certificates: fromCertificate.State;
  trackerCertificates: fromTrackerCertificate.State;
  expenses: fromExpense.State;
  incomes: fromIncome.State;
  purchaseOrders: fromPurchaseOrder.State;
  receiveNotes: fromReceiveNote.State;
  requisitionOrders: fromRequisitionOrder.State;
  salarySlips: fromSalarySlip.State;
  transactions: fromTransaction.State;
  vendors: fromVendor.State;
  reports: fromReports.State;
}

export const reducers: ActionReducerMap<State> = {
  dashboard: fromDashboard.reducer,
  users: fromUser.reducer,
  vtsUsers: fromVtsUser.reducer,
  devices: fromDevice.reducer,
  trackerDevices: fromTrackerDevice.reducer,
  vehicles: fromVehicle.reducer,
  inventories: fromInventory.reducer,
  certificates: fromCertificate.reducer,
  trackerCertificates: fromTrackerCertificate.reducer,
  expenses: fromExpense.reducer,
  incomes: fromIncome.reducer,
  purchaseOrders: fromPurchaseOrder.reducer,
  receiveNotes: fromReceiveNote.reducer,
  requisitionOrders: fromRequisitionOrder.reducer,
  salarySlips: fromSalarySlip.reducer,
  transactions: fromTransaction.reducer,
  vendors: fromVendor.reducer,
  reports: fromReports.reducer
};

export const dashboard = (state: State) => state.dashboard;
export const getDashboardCertificateGraphData = createSelector(dashboard, (state: fromDashboard.State) => state.certificateChartData);
export const getDashboardCertificateTableData = createSelector(dashboard, (state: fromDashboard.State) => state.certificateTableData);
export const getDistributorDashboardData = createSelector(dashboard, (state: fromDashboard.State) => state.distributorData);

export const users = (state: State) => state.users;
export const getAllUsers = createSelector(users, (state: fromUser.State) => state.allUsers.filter(user => user.id !== state.loggedUser.id));
export const getLoggedUser = createSelector(users, (state: fromUser.State) => state.loggedUser);
export const getCurrentUserStats = createSelector(users, (state: fromUser.State) => state.currentUserStats);
export const getUserPageStatus = createSelector(users, (state: fromUser.State) => state.userPageStatus);

export const vtsUsers = (state: State) => state.vtsUsers;
export const getAllVtsUsers = createSelector(vtsUsers, (state: fromVtsUser.State) => state.allVtsUsers);
export const getCurrentVtsUser = createSelector(vtsUsers, (state: fromVtsUser.State) => state.currentVtsUser);
export const getVtsUserPageStatus = createSelector(vtsUsers, (state: fromVtsUser.State) => state.currentVtsUserPageStatus);

export const devices = (state: State) => state.devices;
export const getAllDevices = createSelector(devices, (state: fromDevice.State) => state.allDevices);
export const getCurrentDevice = createSelector(devices, (state: fromDevice.State) => state.currentDevice);
export const getDevicePageStatus = createSelector(devices, (state: fromDevice.State) => state.devicePageStatus);
export const getDeviceDealers = createSelector(devices, (state: fromDevice.State) => state.dealers);
export const getTransferableDevices = createSelector(devices, (state: fromDevice.State) => state.devices);
export const getDeviceFormVehicles = createSelector(devices, (state: fromDevice.State) => state.deviceformVehicles);

export const trackerDevices = (state: State) => state.trackerDevices;
export const getAllTrackerDevices = createSelector(trackerDevices, (state: fromTrackerDevice.State) => state.allTrackerDevices);
export const getCurrentTrackerDevice = createSelector(trackerDevices, (state: fromTrackerDevice.State) => state.currentTrackerDevice);
export const getTrackerDevicePageStatus = createSelector(trackerDevices, (state: fromTrackerDevice.State) => state.trackerDevicePageStatus);
export const getTrackerDeviceDealers = createSelector(trackerDevices, (state: fromTrackerDevice.State) => state.dealers);
export const getTransferableTrackerDevices = createSelector(trackerDevices, (state: fromTrackerDevice.State) => state.trackerDevices);

export const vehicles = (state: State) => state.vehicles;
export const getAllVehicles = createSelector(vehicles, (state: fromVehicle.State) => state.allVehicles);
export const getCurrentVehicle = createSelector(vehicles, (state: fromVehicle.State) => state.currentVehicle);
export const getVehiclePageStatus = createSelector(vehicles, (state: fromVehicle.State) => state.vehiclePageStatus);

export const inventories = (state: State) => state.inventories;
export const getAllInventories = createSelector(inventories, (state: fromInventory.State) => state.allInventories);
export const getCurrentInventory = createSelector(inventories, (state: fromInventory.State) => state.currentInventory);
export const getInventoryPageStatus = createSelector(inventories, (state: fromInventory.State) => state.inventoryPageStatus);

export const certificates = (state: State) => state.certificates;
export const getAllCertificates = createSelector(certificates, (state: fromCertificate.State) => state.allCertificates);
export const getReportCertificates = createSelector(certificates, (state: fromCertificate.State) => state.reportCertificates);
export const getCurrentCertificate = createSelector(certificates, (state: fromCertificate.State) => state.currentCertificate);
export const getCertificateFormdata = createSelector(certificates, (state: fromCertificate.State) => state.certificateFormdata);
export const getVehicleFormData = createSelector(certificates, (state: fromCertificate.State) => state.vehicleFormData);
export const getCertificateFilterUsers = createSelector(certificates, (state: fromCertificate.State) => state.certificateFilterUsers);
export const getCertificatePageStatus = createSelector(certificates, (state: fromCertificate.State) => state.certificatePageStatus);
export const checkCertificateUnique = createSelector(certificates, (state: fromCertificate.State) => state.isUnique);

export const trackerCertificates = (state: State) => state.trackerCertificates;
export const getAllTrackerCertificates = createSelector(trackerCertificates,
  (state: fromTrackerCertificate.State) => state.allTrackerCertificates);
export const getReportTrackerCertificates = createSelector(trackerCertificates,
  (state: fromTrackerCertificate.State) => state.reportTrackerCertificates);
export const getCurrentTrackerCertificate = createSelector(trackerCertificates,
  (state: fromTrackerCertificate.State) => state.currentTrackerCertificate);
export const getTrackerCertificateFormdata = createSelector(trackerCertificates,
  (state: fromTrackerCertificate.State) => state.trackerCertificateFormdata);
export const getTrackerCertificateFilterUsers = createSelector(trackerCertificates,
  (state: fromTrackerCertificate.State) => state.trackerCertificateFilterUsers);
export const getTrackerCertificatePageStatus = createSelector(trackerCertificates,
  (state: fromTrackerCertificate.State) => state.trackerCertificatePageStatus);
export const checkTrackerCertificateUnique = createSelector(trackerCertificates, (state: fromTrackerCertificate.State) => state.isUnique);

export const expenses = (state: State) => state.expenses;
export const getAllExpenses = createSelector(expenses, (state: fromExpense.State) => state.allExpenses);
export const getCurrentExpense = createSelector(expenses, (state: fromExpense.State) => state.currentExpense);
export const getExpensePageStatus = createSelector(expenses, (state: fromExpense.State) => state.currentExpensePageStatus);

export const incomes = (state: State) => state.incomes;
export const getAllIncomes = createSelector(incomes, (state: fromIncome.State) => state.allIncomes);
export const getCurrentIncome = createSelector(incomes, (state: fromIncome.State) => state.currentIncome);
export const getIncomePageStatus = createSelector(incomes, (state: fromIncome.State) => state.currentIncomePageStatus);

export const purchaseOrders = (state: State) => state.purchaseOrders;
export const getAllPurchaseOrders = createSelector(purchaseOrders, (state: fromPurchaseOrder.State) => state.allPurchaseOrders);
export const getCurrentPurchaseOrder = createSelector(purchaseOrders, (state: fromPurchaseOrder.State) => state.currentPurchaseOrder);
export const getPurchaseOrderFormdata = createSelector(purchaseOrders, (state: fromPurchaseOrder.State) => state.purchaseOrderFormData);
export const getPurchaseOrderPageStatus = createSelector(purchaseOrders, (state: fromPurchaseOrder.State) => state.purchaseOrderPageStatus);
export const getPurchaseOrderDistributors = createSelector(purchaseOrders, (state: fromPurchaseOrder.State) => state.distributors);

export const salarySlips = (state: State) => state.salarySlips;
export const getAllSalarySlips = createSelector(salarySlips, (state: fromSalarySlip.State) => state.allSalarySlips);
export const getCurrentSalarySlip = createSelector(salarySlips, (state: fromSalarySlip.State) => state.currentSalarySlip);
export const getSalarySlipPageStatus = createSelector(salarySlips, (state: fromSalarySlip.State) => state.salarySlipPageStatus);
export const getSalarySlipEmployees = createSelector(salarySlips, (state: fromSalarySlip.State) => state.employees);

export const transactions = (state: State) => state.transactions;
export const getAllTransactions = createSelector(transactions, (state: fromTransaction.State) => state.allTransactions);
export const getCurrentTransaction = createSelector(transactions, (state: fromTransaction.State) => state.currentTransaction);
export const getTransactionPageStatus = createSelector(transactions, (state: fromTransaction.State) => state.transactionPageStatus);

export const vendors = (state: State) => state.vendors;
export const getAllVendors = createSelector(vendors, (state: fromVendor.State) => state.allVendors);
export const getCurrentVendor = createSelector(vendors, (state: fromVendor.State) => state.currentVendor);
export const getVendorPageStatus = createSelector(vendors, (state: fromVendor.State) => state.vendorPageStatus);

export const receiveNotes = (state: State) => state.receiveNotes;
export const getAllReceiveNotes = createSelector(receiveNotes, (state: fromReceiveNote.State) => state.allReceiveNotes);
export const getCurrentReceiveNote = createSelector(receiveNotes, (state: fromReceiveNote.State) => state.currentReceiveNote);
export const getReceiveNoteFormdata = createSelector(receiveNotes, (state: fromReceiveNote.State) => state.receiveNoteFormData);
export const getReceiveNotePageStatus = createSelector(receiveNotes, (state: fromReceiveNote.State) => state.receiveNotePageStatus);

export const requisitionOrders = (state: State) => state.requisitionOrders;
export const getAllRequisitionOrders = createSelector(requisitionOrders, (state: fromRequisitionOrder.State) => state.allRequisitionOrders);
export const getCurrentRequisitionOrder = createSelector(
  requisitionOrders, (state: fromRequisitionOrder.State) => state.currentRequisitionOrder);
export const getRequisitionOrderFormdata = createSelector(
  requisitionOrders, (state: fromRequisitionOrder.State) => state.requisitionOrderFormData);
export const getRequisitionOrderPageStatus = createSelector(
  requisitionOrders, (state: fromRequisitionOrder.State) => state.requisitionOrderPageStatus);

export const reports = (state: State) => state.reports;
export const getPOSummary = createSelector(reports, (state: fromReports.State) => state.poSummary);
export const getPODetails = createSelector(reports, (state: fromReports.State) => state.poDetails);
export const getStockSummary = createSelector(reports, (state: fromReports.State) => state.stockSummary);
export const getDistributorsForSummary = createSelector(reports, (state: fromReports.State) => state.distributors);

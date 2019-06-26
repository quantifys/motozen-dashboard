import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {
  MatDatepickerModule,
  NativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DateFilterComponent } from './date-filter/date-filter.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [Angular2TokenService],
    children: [
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule'
      },
      {
        path: 'vts-users',
        loadChildren: './tracker-customers/tracker-customers.module#TrackerCustomersModule'
      },
      {
        path: 'devices',
        loadChildren: './devices/devices.module#DevicesModule'
      },
      {
        path: 'vehicles',
        loadChildren: './vehicles/vehicles.module#VehiclesModule'
      },
      {
        path: 'inventory',
        loadChildren: './inventory/inventory.module#InventoryModule'
      },
      {
        path: 'certificates',
        loadChildren: './certificates/certificates.module#CertificatesModule'
      },
      {
        path: 'vts-certificates',
        loadChildren: './tracker-certificates/tracker-certificates.module#TrackerCertificatesModule'
      },
      {
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesModule'
      },
      {
        path: 'purchase-orders',
        loadChildren: './purchase-orders/purchase-orders.module#PurchaseOrdersModule'
      },
      {
        path: 'receive-notes',
        loadChildren: './receive-notes/receive-notes.module#ReceiveNotesModule'
      },
      {
        path: 'requisition-orders',
        loadChildren: './requisition-orders/requisition-orders.module#RequisitionOrdersModule'
      },
      {
        path: 'salary-slips',
        loadChildren: './salary-slips/salary-slips.module#SalarySlipsModule'
      },
      {
        path: 'incomes',
        loadChildren: './incomes/incomes.module#IncomesModule'
      },
      {
        path: 'transactions',
        loadChildren: './transactions/transactions.module#TransactionsModule'
      },
      {
        path: 'vendors',
        loadChildren: './vendors/vendors.module#VendorsModule'
      },
      {
        path: 'vts-devices',
        loadChildren: './tracker-devices/tracker-devices.module#TrackerDevicesModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    NativeDateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, SideNavComponent, DateFilterComponent],
  entryComponents: [DateFilterComponent]
})
export class DashboardModule { }

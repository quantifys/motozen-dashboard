import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { Angular2TokenService } from 'angular2-token';
import { NgStringPipesModule } from 'ngx-pipes';

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
        path: 'expenses',
        loadChildren: './expenses/expenses.module#ExpensesModule'
      },
      {
        path: 'purchase-orders',
        loadChildren: './purchase-orders/purchase-orders.module#PurchaseOrdersModule'
      },
      {
        path: 'salary-slips',
        loadChildren: './salary-slips/salary-slips.module#SalarySlipsModule'
      },
      {
        path: 'vendors',
        loadChildren: './vendors/vendors.module#VendorsModule'
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
    NgStringPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, SideNavComponent]
})
export class DashboardModule { }

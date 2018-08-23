import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule, MatButtonModule, MatPaginatorModule } from '@angular/material';

import { RequisitionOrdersComponent } from './requisition-orders.component';
import { RequisitionOrderTableComponent } from './requisition-order-table/requisition-order-table.component';
import { RequisitionOrderDetailComponent } from './requisition-order-detail/requisition-order-detail.component';

const routes: Routes = [
  // {
  //   path: 'edit',
  //   component: RequisitionOrderEditComponent,
  //   data: {
  //     title: "Requisition Order edit - Dashboard | Gemeni India"
  //   }
  // },
  {
    path: 'view',
    component: RequisitionOrderDetailComponent,
    data: {
      title: "Requisition Order details - Dashboard | Gemeni India"
    }
  },
  {
    path: '',
    component: RequisitionOrdersComponent,
    data: {
      title: "Requisition Order management - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RequisitionOrdersComponent, RequisitionOrderTableComponent, RequisitionOrderDetailComponent]
})
export class RequisitionOrdersModule { }

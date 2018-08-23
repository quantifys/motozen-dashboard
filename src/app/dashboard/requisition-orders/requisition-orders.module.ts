import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RequisitionOrdersComponent } from './requisition-orders.component';

const routes: Routes = [
  // {
  //   path: 'edit',
  //   component: RequisitionOrderEditComponent,
  //   data: {
  //     title: "Requisition Order edit - Dashboard | Gemeni India"
  //   }
  // },
  // {
  //   path: 'view',
  //   component: RequisitionOrderDetailComponent,
  //   data: {
  //     title: "Requisition Order details - Dashboard | Gemeni India"
  //   }
  // },
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
    RouterModule.forChild(routes)
  ],
  declarations: [RequisitionOrdersComponent]
})
export class RequisitionOrdersModule { }

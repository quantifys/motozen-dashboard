import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { RequisitionOrdersComponent } from './requisition-orders.component';
import { RequisitionOrderTableComponent } from './requisition-order-table/requisition-order-table.component';
import { RequisitionOrderDetailComponent } from './requisition-order-detail/requisition-order-detail.component';
import { RequisitionOrderEditComponent } from './requisition-order-edit/requisition-order-edit.component';
import { RequisitionOrderParticularComponent } from './requisition-order-particular/requisition-order-particular.component';

const routes: Routes = [
  {
    path: 'edit',
    component: RequisitionOrderEditComponent,
    data: {
      title: "Requisition Order edit - Dashboard | Gemeni India"
    }
  },
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
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RequisitionOrdersComponent, RequisitionOrderTableComponent, RequisitionOrderDetailComponent, RequisitionOrderEditComponent, RequisitionOrderParticularComponent]
})
export class RequisitionOrdersModule { }

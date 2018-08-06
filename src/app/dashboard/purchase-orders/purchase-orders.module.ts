import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { PurchaseOrdersComponent } from './purchase-orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PurchaseOrderTableComponent } from './purchase-order-table/purchase-order-table.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';

const routes: Routes = [
  // {
  //   path: 'edit',
  //   component: CertificateEditComponent,
  //   data: {
  //     title: "Certificate edit - Dashboard | Gemeni India"
  //   }
  // },
  {
    path: 'view',
    component: PurchaseOrderDetailComponent,
    data: {
      title: "Purchase order details - Dashboard | Gemeni India"
    }
  },
  {
    path: "",
    component: PurchaseOrdersComponent,
    data: {
      title: "Purchase order management - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchaseOrdersComponent, PurchaseOrderTableComponent, PurchaseOrderDetailComponent]
})
export class PurchaseOrdersModule { }

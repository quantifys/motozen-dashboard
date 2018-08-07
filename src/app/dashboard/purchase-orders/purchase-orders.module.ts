import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';

import { PurchaseOrdersComponent } from './purchase-orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PurchaseOrderTableComponent } from './purchase-order-table/purchase-order-table.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';
import { PurchaseOrderParticularComponent } from './purchase-order-particular/purchase-order-particular.component';

const routes: Routes = [
  {
    path: 'edit',
    component: PurchaseOrderEditComponent,
    data: {
      title: "Purchase order edit - Dashboard | Gemeni India"
    }
  },
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
    FormsModule,
    NgxPaginationModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchaseOrdersComponent, PurchaseOrderTableComponent, PurchaseOrderDetailComponent, PurchaseOrderEditComponent, PurchaseOrderParticularComponent]
})
export class PurchaseOrdersModule { }

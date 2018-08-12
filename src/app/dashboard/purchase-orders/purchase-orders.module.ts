import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatInputModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule, MatAutocompleteModule, MatButtonModule, MatTabsModule, MatPaginatorModule, MatBottomSheetModule, MatProgressSpinnerModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';

import { PurchaseOrdersComponent } from './purchase-orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PurchaseOrderTableComponent } from './purchase-order-table/purchase-order-table.component';
import { PurchaseOrderDetailComponent } from './purchase-order-detail/purchase-order-detail.component';
import { PurchaseOrderEditComponent } from './purchase-order-edit/purchase-order-edit.component';
import { PurchaseOrderParticularComponent } from './purchase-order-particular/purchase-order-particular.component';
import { PurchaseOrderFilterComponent } from './purchase-order-filter/purchase-order-filter.component';
import { PurchaseOrderOpenComponent } from './purchase-order-open/purchase-order-open.component';
import { PurchaseOrderConfirmComponent } from './purchase-order-confirm/purchase-order-confirm.component';
import { PurchaseOrderDispatchComponent } from './purchase-order-dispatch/purchase-order-dispatch.component';
import { PurchaseOrderCloseComponent } from './purchase-order-close/purchase-order-close.component';

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
    path: 'dispatch',
    component: PurchaseOrderDispatchComponent,
    data: {
      title: "Purchase order dispatch - Dashboard | Gemeni India"
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
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatTabsModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchaseOrdersComponent, PurchaseOrderTableComponent, PurchaseOrderDetailComponent, PurchaseOrderEditComponent, PurchaseOrderParticularComponent, PurchaseOrderFilterComponent, PurchaseOrderOpenComponent, PurchaseOrderConfirmComponent, PurchaseOrderDispatchComponent, PurchaseOrderCloseComponent],
  entryComponents: [PurchaseOrderFilterComponent, PurchaseOrderOpenComponent, PurchaseOrderConfirmComponent, PurchaseOrderCloseComponent]
})
export class PurchaseOrdersModule { }

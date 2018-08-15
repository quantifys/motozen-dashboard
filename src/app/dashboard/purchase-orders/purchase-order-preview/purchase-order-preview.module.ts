import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { PurchaseOrderPreviewComponent } from './purchase-order-preview.component';

const routes: Routes = [
  {
    path: '',
    component: PurchaseOrderPreviewComponent,
    data: {
      title: "Purchase Order Print Preview - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PurchaseOrderPreviewComponent]
})
export class PurchaseOrderPreviewModule { }

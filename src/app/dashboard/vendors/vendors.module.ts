import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { VendorsComponent } from './vendors.component';
import { VendorTableComponent } from './vendor-table/vendor-table.component';

const routes: Routes = [
  {
    path: '',
    component: VendorsComponent,
    data: {
      title: "Vendor management - Dashboard | Gemeni India"
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
    RouterModule.forChild(routes)
  ],
  declarations: [VendorsComponent, VendorTableComponent]
})
export class VendorsModule { }

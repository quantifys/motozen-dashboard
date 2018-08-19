import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { VendorsComponent } from './vendors.component';
import { VendorTableComponent } from './vendor-table/vendor-table.component';
import { VendorEditComponent } from './vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './vendor-detail/vendor-detail.component';

const routes: Routes = [
  {
    path: 'edit',
    component: VendorEditComponent,
    data: {
      title: "Vendor edit - Dashboard | Gemeni India"
    }
  },
  {
    path: 'view',
    component: VendorDetailComponent,
    data: {
      title: "Vendor details - Dashboard | Gemeni India"
    }
  },
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
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorsComponent, VendorTableComponent, VendorEditComponent, VendorDetailComponent]
})
export class VendorsModule { }

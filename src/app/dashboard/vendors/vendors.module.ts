import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
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
      title: "Vendor edit - Dashboard | TEDI India"
    }
  },
  {
    path: 'view',
    component: VendorDetailComponent,
    data: {
      title: "Vendor details - Dashboard | TEDI India"
    }
  },
  {
    path: '',
    component: VendorsComponent,
    data: {
      title: "Vendor management - Dashboard | TEDI India"
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
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VendorsComponent, VendorTableComponent, VendorEditComponent, VendorDetailComponent]
})
export class VendorsModule { }

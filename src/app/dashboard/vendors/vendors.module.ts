import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule, MatButtonModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { VendorsComponent } from './vendors.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [VendorsComponent]
})
export class VendorsModule { }

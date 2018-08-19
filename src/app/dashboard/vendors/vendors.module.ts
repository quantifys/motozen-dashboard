import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    RouterModule.forChild(routes)
  ],
  declarations: [VendorsComponent]
})
export class VendorsModule { }

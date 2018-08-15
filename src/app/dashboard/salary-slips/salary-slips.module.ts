import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { SalarySlipsComponent } from './salary-slips.component';

const routes: Routes = [
  {
    path: '',
    component: SalarySlipsComponent,
    data: {
      title: "Salary Slip Management - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalarySlipsComponent]
})
export class SalarySlipsModule { }

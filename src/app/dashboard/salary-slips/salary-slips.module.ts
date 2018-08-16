import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatButtonModule } from '@angular/material';

import { SalarySlipsComponent } from './salary-slips.component';
import { SalarySlipTableComponent } from './salary-slip-table/salary-slip-table.component';

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
    MatTabsModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalarySlipsComponent, SalarySlipTableComponent]
})
export class SalarySlipsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatButtonModule, MatPaginatorModule } from '@angular/material';

import { SalarySlipsComponent } from './salary-slips.component';
import { SalarySlipTableComponent } from './salary-slip-table/salary-slip-table.component';
import { SalarySlipDetailComponent } from './salary-slip-detail/salary-slip-detail.component';

const routes: Routes = [
  // {
  //   path: 'edit',
  //   component: SalarySlipEditComponent,
  //   data: {
  //     title: "Salary slip edit - Dashboard | Gemeni India"
  //   }
  // },
  {
    path: 'view',
    component: SalarySlipDetailComponent,
    data: {
      title: "Salary slip details - Dashboard | Gemeni India"
    }
  },
  {
    path: '',
    component: SalarySlipsComponent,
    data: {
      title: "Salary slip management - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalarySlipsComponent, SalarySlipTableComponent, SalarySlipDetailComponent]
})
export class SalarySlipsModule { }

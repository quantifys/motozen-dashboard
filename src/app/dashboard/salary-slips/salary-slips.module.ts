import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatButtonModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { SalarySlipsComponent } from './salary-slips.component';
import { SalarySlipTableComponent } from './salary-slip-table/salary-slip-table.component';
import { SalarySlipDetailComponent } from './salary-slip-detail/salary-slip-detail.component';
import { SalarySlipEditComponent } from './salary-slip-edit/salary-slip-edit.component';

const routes: Routes = [
  {
    path: 'edit',
    component: SalarySlipEditComponent,
    data: {
      title: "Salary slip edit - Dashboard | Gemeni India"
    }
  },
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
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SalarySlipsComponent, SalarySlipTableComponent, SalarySlipDetailComponent, SalarySlipEditComponent]
})
export class SalarySlipsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesComponent } from './expenses.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { ExpenseDetailComponent } from './expense-detail/expense-detail.component';

export const routes: Routes = [
  {
    path: 'edit',
    component: ExpenseEditComponent,
    data: {
      title: "Expense edit - Dashboard | Gemeni India"
    }
  },
  {
    path: 'view',
    component: ExpenseDetailComponent,
    data: {
      title: "Expense details - Dashboard | Gemeni India"
    }
  },
  {
    path: "",
    component: ExpensesComponent,
    data: {
      title: "Expenses - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpensesComponent, ExpensesTableComponent, ExpenseEditComponent, ExpenseDetailComponent]
})
export class ExpensesModule { }

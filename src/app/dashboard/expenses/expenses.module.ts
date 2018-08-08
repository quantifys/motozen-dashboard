import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesComponent } from './expenses.component';
import { ExpensesTableComponent } from './expenses-table/expenses-table.component';

export const routes: Routes = [
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
    RouterModule.forChild(routes)
  ],
  declarations: [ExpensesComponent, ExpensesTableComponent]
})
export class ExpensesModule { }

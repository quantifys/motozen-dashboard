import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesComponent } from './expenses.component';

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
  declarations: [ExpensesComponent]
})
export class ExpensesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatFormFieldModule, MatInputModule, MatTabsModule, MatPaginatorModule, MatButtonModule, MatBottomSheetModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesComponent } from './expenses.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import { ExpenseDetailComponent, ExpenseDeleteComponent } from './expense-detail/expense-detail.component';
import { ExpenseTableComponent } from './expense-table/expense-table.component';

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
    ReactiveFormsModule,
    MatRadioModule,
    MatTabsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatBottomSheetModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpensesComponent, ExpenseEditComponent, ExpenseDetailComponent, ExpenseTableComponent, ExpenseDeleteComponent],
  entryComponents: [ExpenseDeleteComponent]
})
export class ExpensesModule { }

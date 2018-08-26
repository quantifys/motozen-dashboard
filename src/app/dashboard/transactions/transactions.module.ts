import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatPaginatorModule, MatBottomSheetModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { TransactionsComponent } from './transactions.component';
import { TransactionFilterComponent } from './transaction-filter/transaction-filter.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsComponent,
    data: {
      title: "Transactions list - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransactionsComponent, TransactionFilterComponent],
  entryComponents: [TransactionFilterComponent]
})
export class TransactionsModule { }

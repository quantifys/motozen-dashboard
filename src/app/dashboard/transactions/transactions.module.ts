import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatPaginatorModule } from '@angular/material';

import { TransactionsComponent } from './transactions.component';

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
    MatButtonModule,
    MatPaginatorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TransactionsComponent]
})
export class TransactionsModule { }

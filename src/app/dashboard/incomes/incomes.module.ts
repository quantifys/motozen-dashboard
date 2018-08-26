import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IncomesComponent } from './incomes.component';

const routes: Routes = [
  // {
  //   path: 'edit',
  //   component: IncomeEditComponent,
  //   data: {
  //     title: "Income edit - Dashboard | Gemeni India"
  //   }
  // },
  // {
  //   path: 'view',
  //   component: IncomeDetailComponent,
  //   data: {
  //     title: "Income details - Dashboard | Gemeni India"
  //   }
  // },
  {
    path: "",
    component: IncomesComponent,
    data: {
      title: "Incomes - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncomesComponent]
})
export class IncomesModule { }

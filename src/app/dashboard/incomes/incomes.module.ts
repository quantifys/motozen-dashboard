import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';

import { IncomesComponent } from './incomes.component';
import { IncomeEditComponent } from './income-edit/income-edit.component';
import { IncomeDetailComponent } from './income-detail/income-detail.component';

const routes: Routes = [
  {
    path: 'edit',
    component: IncomeEditComponent,
    data: {
      title: "Income edit - Dashboard | Gemeni India"
    }
  },
  {
    path: 'view',
    component: IncomeDetailComponent,
    data: {
      title: "Income details - Dashboard | Gemeni India"
    }
  },
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
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IncomesComponent, IncomeEditComponent, IncomeDetailComponent]
})
export class IncomesModule { }

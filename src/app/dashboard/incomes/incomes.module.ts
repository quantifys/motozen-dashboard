import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import {
  MatTabsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRadioModule,
  MatBottomSheetModule,
  MatPaginatorModule,
} from "@angular/material";

import { IncomesComponent } from "./incomes.component";
import { IncomeEditComponent } from "./income-edit/income-edit.component";
import { IncomeDetailComponent } from "./income-detail/income-detail.component";
import { IncomeDeleteComponent } from "./income-delete/income-delete.component";
import { IncomeTableComponent } from "./income-table/income-table.component";

const routes: Routes = [
  {
    path: "edit",
    component: IncomeEditComponent,
    data: {
      title: "Income edit - Dashboard | PIAN VTS",
    },
  },
  {
    path: "view",
    component: IncomeDetailComponent,
    data: {
      title: "Income details - Dashboard | PIAN VTS",
    },
  },
  {
    path: "",
    component: IncomesComponent,
    data: {
      title: "Incomes - Dashboard | PIAN VTS",
    },
  },
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
    MatBottomSheetModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    IncomesComponent,
    IncomeEditComponent,
    IncomeDetailComponent,
    IncomeDeleteComponent,
    IncomeTableComponent,
  ],
  entryComponents: [IncomeDeleteComponent],
})
export class IncomesModule {}

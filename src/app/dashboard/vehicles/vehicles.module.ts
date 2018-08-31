import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatOptionModule, MatButtonModule, MatPaginatorModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';

import { VehiclesComponent } from './vehicles.component';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';

const routes: Routes = [
  {
    path: "",
    component: VehiclesComponent,
    data: {
      title: "Vehicle Management - Dashboard | Gemeni India"
    }
  },
  {
    path: 'edit',
    component: VehicleEditComponent,
    data: {
      title: "Vehicle edit - Dashboard | Gemeni India"
    }
  },
  {
    path: 'view',
    component: VehicleDetailComponent,
    data: {
      title: "Vehicle details - Dashboard | Gemeni India"
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatButtonModule,
    MatPaginatorModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VehiclesComponent, VehicleDetailComponent, VehicleEditComponent, VehicleTableComponent]
})
export class VehiclesModule { }

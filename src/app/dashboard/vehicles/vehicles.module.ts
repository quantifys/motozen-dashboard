import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatPaginatorModule,
  MatIconModule,
  MatBottomSheetModule,
  MatCheckboxModule
} from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { LightboxModule } from 'ngx-lightbox';

import { VehiclesComponent } from './vehicles.component';
import { VehicleDetailComponent, VehicleDeleteComponent } from './vehicle-detail/vehicle-detail.component';
import { VehicleEditComponent } from './vehicle-edit/vehicle-edit.component';
import { VehicleTableComponent } from './vehicle-table/vehicle-table.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    data: {
      title: 'Vehicle Management - Dashboard | Gemeni India'
    }
  },
  {
    path: 'edit',
    component: VehicleEditComponent,
    data: {
      title: 'Vehicle edit - Dashboard | Gemeni India'
    }
  },
  {
    path: 'view',
    component: VehicleDetailComponent,
    data: {
      title: 'Vehicle details - Dashboard | Gemeni India'
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatIconModule,
    NgSelectModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    LightboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VehiclesComponent, VehicleDetailComponent, VehicleEditComponent, VehicleTableComponent, VehicleDeleteComponent],
  entryComponents: [VehicleDeleteComponent]
})
export class VehiclesModule { }

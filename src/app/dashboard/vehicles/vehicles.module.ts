import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { Routes, RouterModule } from '@angular/router';
import { VehicleDetailComponent } from './vehicle-detail/vehicle-detail.component';

const routes: Routes = [
  {
    path: "",
    component: VehiclesComponent,
    data: {
      title: "Vehicle Management - Dashboard | Gemeni India"
    }
  },
  // {
  //   path: 'edit',
  //   component: DeviceEditComponent,
  //   data: {
  //     title: "Dashboard - Device edit | Gemeni India"
  //   }
  // },
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
    RouterModule.forChild(routes)
  ],
  declarations: [VehiclesComponent, VehicleDetailComponent]
})
export class VehiclesModule { }

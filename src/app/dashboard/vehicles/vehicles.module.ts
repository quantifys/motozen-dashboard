import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesComponent } from './vehicles.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: VehiclesComponent,
    data: {
      title: "Vehicle Management - Dashboard | Gemeni India"
    }
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VehiclesComponent]
})
export class VehiclesModule { }

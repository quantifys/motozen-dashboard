import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { Routes, RouterModule } from '@angular/router';
import { DeviceTableComponent } from './device-table/device-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgArrayPipesModule, NgStringPipesModule } from 'ngx-pipes';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    data: {
      title: "Dashboard - Device management | Gemeni India"
    }
  },
  {
    path: 'view',
    component: DeviceDetailComponent,
    data: {
      title: "Dashboard - Device details | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgStringPipesModule,
    NgArrayPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicesComponent, DeviceTableComponent, DeviceEditComponent, DeviceDetailComponent]
})
export class DevicesModule { }

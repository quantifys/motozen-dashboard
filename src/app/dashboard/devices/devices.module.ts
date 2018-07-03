import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { Routes, RouterModule } from '@angular/router';
import { DeviceTableComponent } from './device-table/device-table.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgArrayPipesModule } from 'ngx-pipes';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgArrayPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicesComponent, DeviceTableComponent]
})
export class DevicesModule { }

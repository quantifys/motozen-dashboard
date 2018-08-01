import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgStringPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';

import { DeviceTableComponent } from './device-table/device-table.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { SldComponent } from './device-edit/sld/sld.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    data: {
      title: "Dashboard - Device management | Gemeni India"
    }
  },
  {
    path: 'edit',
    component: DeviceEditComponent,
    data: {
      title: "Dashboard - Device edit | Gemeni India"
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
    ReactiveFormsModule,
    NgxPaginationModule,
    NgStringPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicesComponent, DeviceTableComponent, DeviceEditComponent, DeviceDetailComponent, SldComponent]
})
export class DevicesModule { }

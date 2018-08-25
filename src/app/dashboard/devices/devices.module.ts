import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material';
import { NgStringPipesModule } from 'ngx-pipes';
import { ReactiveFormsModule } from '@angular/forms';

import { DeviceTableComponent } from './device-table/device-table.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { SldComponent } from './device-edit/sld/sld.component';
import { DeviceTransferComponent } from './device-transfer/device-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    data: {
      title: "Device management - Dashboard | Gemeni India"
    }
  },
  {
    path: 'edit',
    component: DeviceEditComponent,
    data: {
      title: "Device edit - Dashboard | Gemeni India"
    }
  },
  {
    path: 'transfer',
    component: DeviceTransferComponent,
    data: {
      title: "Device transfer - Dashboard | Gemeni India"
    }
  },
  {
    path: 'view',
    component: DeviceDetailComponent,
    data: {
      title: "Device details - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgSelectModule,
    NgxPaginationModule,
    NgStringPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicesComponent, DeviceTableComponent, DeviceEditComponent, DeviceDetailComponent, SldComponent, DeviceTransferComponent]
})
export class DevicesModule { }

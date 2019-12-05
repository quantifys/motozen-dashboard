import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesComponent } from './devices.component';
import { Routes, RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  MatTabsModule,
  MatPaginatorModule,
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatBottomSheetModule,
  MatRadioModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleSelectModule } from '../vehicle-select/vehicle-select.module';

import { DeviceTableComponent } from './device-table/device-table.component';
import { DeviceDetailComponent, DeviceDeleteComponent } from './device-detail/device-detail.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { SldComponent } from './device-edit/sld/sld.component';
import { DeviceTransferComponent } from './device-transfer/device-transfer.component';
import { StockSummaryComponent } from './stock-summary/stock-summary.component';

const routes: Routes = [
  {
    path: '',
    component: DevicesComponent,
    data: {
      title: 'Device management - Dashboard | TEDI India'
    }
  },
  {
    path: 'edit',
    component: DeviceEditComponent,
    data: {
      title: 'Device edit - Dashboard | TEDI India'
    }
  },
  {
    path: 'transfer',
    component: DeviceTransferComponent,
    data: {
      title: 'Device transfer - Dashboard | TEDI India'
    }
  },
  {
    path: 'view',
    component: DeviceDetailComponent,
    data: {
      title: 'Device details - Dashboard | TEDI India'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatBottomSheetModule,
    MatRadioModule,
    NgSelectModule,
    RouterModule.forChild(routes),
    VehicleSelectModule
  ],
  declarations: [
    DevicesComponent,
    DeviceTableComponent,
    DeviceEditComponent,
    DeviceDetailComponent,
    SldComponent,
    DeviceTransferComponent,
    DeviceDeleteComponent,
    StockSummaryComponent
  ],
  entryComponents: [DeviceDeleteComponent, StockSummaryComponent]
})
export class DevicesModule { }

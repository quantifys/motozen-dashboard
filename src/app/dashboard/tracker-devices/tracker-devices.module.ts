import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatBottomSheetModule,
  MatRadioModule,
} from "@angular/material";
import { NgSelectModule } from "@ng-select/ng-select";

import { TrackerDevicesComponent } from "./tracker-devices.component";
import { TrackerDevicesEditComponent } from "./tracker-devices-edit/tracker-devices-edit.component";
import { TrackerDevicesTransferComponent } from "./tracker-devices-transfer/tracker-devices-transfer.component";
import {
  TrackerDevicesDetailComponent,
  TrackerDeviceDeleteComponent,
} from "./tracker-devices-detail/tracker-devices-detail.component";
import { TrackerDevicesTableComponent } from "./tracker-devices-table/tracker-devices-table.component";
import { VtsDeviceComponent } from "./tracker-devices-edit/vts-device/vts-device.component";
import { StockSummaryComponent } from "./stock-summary/stock-summary.component";
import { BulkUploadComponent } from "./bulk-upload/bulk-upload.component";

const routes: Routes = [
  {
    path: "",
    component: TrackerDevicesComponent,
    data: {
      title: "VTS Device management - Dashboard | MOTOZEN",
    },
  },
  {
    path: "edit",
    component: TrackerDevicesEditComponent,
    data: {
      title: "VTS Device edit - Dashboard | MOTOZEN",
    },
  },
  {
    path: "transfer",
    component: TrackerDevicesTransferComponent,
    data: {
      title: "Tracker Device transfer - Dashboard | MOTOZEN",
    },
  },
  {
    path: "bulk-upload",
    component: BulkUploadComponent,
    data: {
      title: "Tracker Device bulk upload - Dashboard | MOTOZEN",
    },
  },
  {
    path: "view",
    component: TrackerDevicesDetailComponent,
    data: {
      title: "VTS Device details - Dashboard | MOTOZEN",
    },
  },
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
  ],
  declarations: [
    TrackerDevicesComponent,
    TrackerDevicesEditComponent,
    TrackerDevicesTransferComponent,
    TrackerDevicesDetailComponent,
    TrackerDevicesTableComponent,
    TrackerDeviceDeleteComponent,
    VtsDeviceComponent,
    StockSummaryComponent,
    BulkUploadComponent,
  ],
  entryComponents: [TrackerDeviceDeleteComponent, StockSummaryComponent],
})
export class TrackerDevicesModule {}

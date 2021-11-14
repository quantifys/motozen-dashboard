import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatPaginatorModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatRadioModule,
  MatIconModule,
  MatSelectModule,
} from "@angular/material";
import { NgSelectModule } from "@ng-select/ng-select";
import { Routes, RouterModule } from "@angular/router";

import { TrackerCertificatesComponent } from "./tracker-certificates.component";
import {
  CertificateDeleteComponent,
  CertificateIssueComponent,
  CertificateRenewComponent,
} from "./tracker-certificate-controls/tracker-certificate-controls.component";
import { TrackerCertificateDetailsComponent } from "./tracker-certificate-details/tracker-certificate-details.component";
import { TrackerCertificateEditComponent } from "./tracker-certificate-edit/tracker-certificate-edit.component";
import { TrackerCertificateFilterComponent } from "./tracker-certificate-filter/tracker-certificate-filter.component";
import { TrackerCertificateTableComponent } from "./tracker-certificate-table/tracker-certificate-table.component";
import { MonthPickerComponent } from "./month-picker/month-picker.component";

const routes: Routes = [
  {
    path: "edit",
    component: TrackerCertificateEditComponent,
    data: {
      title: "Tracker Certificate edit - Dashboard | MOTOZEN",
    },
  },
  {
    path: "view",
    component: TrackerCertificateDetailsComponent,
    data: {
      title: "Tracker Certificate details - Dashboard | MOTOZEN",
    },
  },
  {
    path: "",
    component: TrackerCertificatesComponent,
    data: {
      title: "Tracker Certificate management - Dashboard | MOTOZEN",
    },
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatPaginatorModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    NgSelectModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    TrackerCertificatesComponent,
    TrackerCertificateDetailsComponent,
    TrackerCertificateEditComponent,
    TrackerCertificateFilterComponent,
    TrackerCertificateTableComponent,
    MonthPickerComponent,
    CertificateDeleteComponent,
    CertificateIssueComponent,
    CertificateRenewComponent,
  ],
  entryComponents: [
    TrackerCertificateFilterComponent,
    CertificateDeleteComponent,
    CertificateIssueComponent,
    CertificateRenewComponent,
  ],
})
export class TrackerCertificatesModule {}

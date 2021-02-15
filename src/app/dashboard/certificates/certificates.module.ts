import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import {
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTabsModule,
  MatPaginatorModule,
  MatButtonModule,
  MatBottomSheetModule,
  MatRadioModule,
  MatIconModule,
} from "@angular/material";
import { NgSelectModule } from "@ng-select/ng-select";
import { LightboxModule } from "ngx-lightbox";

import { CertificatesComponent } from "./certificates.component";
import { CertificateTableComponent } from "./certificate-table/certificate-table.component";
import { CertificateEditComponent } from "./certificate-edit/certificate-edit.component";
import { MonthPickerComponent } from "./month-picker/month-picker.component";
import { CertificateDetailComponent } from "./certificate-detail/certificate-detail.component";
import { CertificateFilterComponent } from "./certificate-filter/certificate-filter.component";
import {
  CertificateIssueComponent,
  CertificateDeleteComponent,
  CertificateRenewComponent,
} from "./certificate-controls/certificate-controls.component";

const routes: Routes = [
  {
    path: "edit",
    component: CertificateEditComponent,
    data: {
      title: "Certificate edit - Dashboard | PIAN VTS",
    },
  },
  {
    path: "view",
    component: CertificateDetailComponent,
    data: {
      title: "Certificate details - Dashboard | PIAN VTS",
    },
  },
  {
    path: "",
    component: CertificatesComponent,
    data: {
      title: "Certificate management - Dashboard | PIAN VTS",
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
    NgSelectModule,
    LightboxModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CertificatesComponent,
    CertificateTableComponent,
    CertificateEditComponent,
    MonthPickerComponent,
    CertificateDetailComponent,
    CertificateFilterComponent,
    CertificateDeleteComponent,
    CertificateIssueComponent,
    CertificateRenewComponent,
  ],
  entryComponents: [
    CertificateFilterComponent,
    CertificateDeleteComponent,
    CertificateIssueComponent,
    CertificateRenewComponent,
  ],
})
export class CertificatesModule {}

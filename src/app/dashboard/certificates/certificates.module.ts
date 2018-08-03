import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatAutocompleteModule, MatDatepickerModule, MatSelectModule } from '@angular/material';

import { CertificatesComponent } from './certificates.component';
import { CertificateTableComponent } from './certificate-table/certificate-table.component';
import { CertificateEditComponent } from './certificate-edit/certificate-edit.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { CertificateDetailComponent } from './certificate-detail/certificate-detail.component';

const routes: Routes = [
  {
    path: 'edit',
    component: CertificateEditComponent,
    data: {
      title: "Certificate edit - Dashboard | Gemeni India"
    }
  },
  {
    path: 'view',
    component: CertificateDetailComponent,
    data: {
      title: "Certificate details - Dashboard | Gemeni India"
    }
  },
  {
    path: '',
    component: CertificatesComponent,
    data: {
      title: "Certificate management - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificatesComponent, CertificateTableComponent, CertificateEditComponent, MonthPickerComponent, CertificateDetailComponent]
})
export class CertificatesModule { }

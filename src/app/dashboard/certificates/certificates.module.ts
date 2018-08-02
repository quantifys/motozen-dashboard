import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

import { CertificatesComponent } from './certificates.component';
import { CertificateTableComponent } from './certificate-table/certificate-table.component';

const routes: Routes = [
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
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificatesComponent, CertificateTableComponent]
})
export class CertificatesModule { }

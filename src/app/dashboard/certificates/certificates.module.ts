import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CertificatesComponent } from './certificates.component';

const routes: Routes = [
  {
    path: '',
    component: CertificatesComponent,
    data: {
      title: "Certificate list - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CertificatesComponent]
})
export class CertificatesModule { }

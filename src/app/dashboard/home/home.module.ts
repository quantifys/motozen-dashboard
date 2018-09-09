import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { ChartsModule } from '../charts/charts.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: "Dashboard - Home | Gemeni India"
    },
  }
];

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

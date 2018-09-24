import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatSelectModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
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
    ReactiveFormsModule,
    NgSelectModule,
    ChartsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }

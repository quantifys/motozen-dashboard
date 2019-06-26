import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

import { TrackerCustomersComponent } from './tracker-customers.component';

const routes: Routes = [
  {
    path: '',
    component: TrackerCustomersComponent,
    data: {
      title: 'VTS users | Gemeni India'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule
  ],
  declarations: [TrackerCustomersComponent]
})
export class TrackerCustomersModule { }

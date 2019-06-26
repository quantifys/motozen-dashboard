import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatPaginatorModule } from '@angular/material';

import { TrackerCustomersComponent } from './tracker-customers.component';
import { TrackerUsersTableComponent } from './tracker-users-table/tracker-users-table.component';

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
    MatButtonModule,
    MatPaginatorModule
  ],
  declarations: [TrackerCustomersComponent, TrackerUsersTableComponent]
})
export class TrackerCustomersModule { }

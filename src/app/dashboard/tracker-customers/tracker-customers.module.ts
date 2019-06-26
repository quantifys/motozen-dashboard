import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatPaginatorModule } from '@angular/material';

import { TrackerCustomersComponent } from './tracker-customers.component';
import { TrackerUsersTableComponent } from './tracker-users-table/tracker-users-table.component';
import { TrackerUsersDetailsComponent } from './tracker-users-details/tracker-users-details.component';

const routes: Routes = [
  {
    path: 'view',
    component: TrackerUsersDetailsComponent,
    data: {
      title: 'VTS user details - Dashboard | Gemeni India'
    }
  },
  {
    path: '',
    component: TrackerCustomersComponent,
    data: {
      title: 'VTS users - Dashboard | Gemeni India'
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
  declarations: [TrackerCustomersComponent, TrackerUsersTableComponent, TrackerUsersDetailsComponent]
})
export class TrackerCustomersModule { }

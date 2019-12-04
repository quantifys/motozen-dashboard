import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MatButtonModule, MatPaginatorModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { TrackerCustomersComponent } from './tracker-customers.component';
import { TrackerUsersTableComponent } from './tracker-users-table/tracker-users-table.component';
import { TrackerUsersDetailsComponent } from './tracker-users-details/tracker-users-details.component';
import { TrackerCustomersEditComponent } from './tracker-customers-edit/tracker-customers-edit.component';

const routes: Routes = [
  {
    path: 'edit',
    component: TrackerCustomersEditComponent,
    data: {
      title: 'VTS user edit - Dashboard | Gemeni India'
    }
  },
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
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule
  ],
  declarations: [TrackerCustomersComponent, TrackerUsersTableComponent, TrackerUsersDetailsComponent, TrackerCustomersEditComponent]
})
export class TrackerCustomersModule { }

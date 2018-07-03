import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgStringPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { UsersComponent } from './users.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Dashboard - User management | Gemeni India'
    }
  },
  {
    path: 'edit',
    component: UserEditComponent,
    data: {
      title: 'Dashboard - User edit | Gemeni India'
    }
  },
  {
    path: 'view',
    component: UserDetailComponent,
    data: {
      title: 'Dashboard - User details | Gemeni India'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgStringPipesModule,
    NgxPaginationModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersComponent, UserTableComponent, UserEditComponent, UserDetailComponent]
})
export class UsersModule { }

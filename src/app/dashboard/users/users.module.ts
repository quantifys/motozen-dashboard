import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgStringPipesModule } from 'ngx-pipes';
import { NgxPaginationModule } from 'ngx-pagination';

import { UsersComponent } from './users.component';
import { UserTableComponent } from './user-table/user-table.component';
import { UserEditComponent } from './user-edit/user-edit.component';

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
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgStringPipesModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersComponent, UserTableComponent, UserEditComponent]
})
export class UsersModule { }

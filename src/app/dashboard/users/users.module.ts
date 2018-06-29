import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgStringPipesModule } from 'ngx-pipes';

import { UsersComponent } from './users.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      title: 'Dashboard - User management | Gemeni India'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    NgStringPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UsersComponent, UserTableComponent]
})
export class UsersModule { }

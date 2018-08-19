import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatButtonModule } from '@angular/material';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveNotesComponent } from './receive-notes.component';

const routes: Routes = [
  // {
  //   path: 'edit',
  //   component: ReceiveNoteEditComponent,
  //   data: {
  //     title: "Receive Note edit - Dashboard | Gemeni India"
  //   }
  // },
  // {
  //   path: 'view',
  //   component: ReceiveNoteDetailComponent,
  //   data: {
  //     title: "Receive Note details - Dashboard | Gemeni India"
  //   }
  // },
  {
    path: '',
    component: ReceiveNotesComponent,
    data: {
      title: "Receive Note management - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceiveNotesComponent]
})
export class ReceiveNotesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSlideToggleModule } from '@angular/material';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { ReceiveNotesComponent } from './receive-notes.component';
import { ReceiveNoteEditComponent } from './receive-note-edit/receive-note-edit.component';
import { ReceiveNoteParticularComponent } from './receive-note-particular/receive-note-particular.component';

const routes: Routes = [
  {
    path: 'edit',
    component: ReceiveNoteEditComponent,
    data: {
      title: "Receive Note edit - Dashboard | Gemeni India"
    }
  },
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
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ReceiveNotesComponent, ReceiveNoteEditComponent, ReceiveNoteParticularComponent]
})
export class ReceiveNotesModule { }

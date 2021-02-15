import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  MatTabsModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatBottomSheetModule,
} from "@angular/material";
import { NgSelectModule } from "@ng-select/ng-select";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { ReceiveNotesComponent } from "./receive-notes.component";
import { ReceiveNoteEditComponent } from "./receive-note-edit/receive-note-edit.component";
import { ReceiveNoteParticularComponent } from "./receive-note-particular/receive-note-particular.component";
import { ReceiveNoteTableComponent } from "./receive-note-table/receive-note-table.component";
import { ReceiveNoteDetailComponent } from "./receive-note-detail/receive-note-detail.component";
import {
  ReceiveNoteConfirmComponent,
  ReceiveNoteDeleteComponent,
} from "./receive-note-confirm/receive-note-confirm.component";

const routes: Routes = [
  {
    path: "edit",
    component: ReceiveNoteEditComponent,
    data: {
      title: "Receive Note edit - Dashboard | PIAN VTS",
    },
  },
  {
    path: "view",
    component: ReceiveNoteDetailComponent,
    data: {
      title: "Receive Note details - Dashboard | PIAN VTS",
    },
  },
  {
    path: "",
    component: ReceiveNotesComponent,
    data: {
      title: "Receive Note management - Dashboard | PIAN VTS",
    },
  },
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
    MatPaginatorModule,
    MatBottomSheetModule,
    NgSelectModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    ReceiveNotesComponent,
    ReceiveNoteEditComponent,
    ReceiveNoteParticularComponent,
    ReceiveNoteTableComponent,
    ReceiveNoteDetailComponent,
    ReceiveNoteConfirmComponent,
    ReceiveNoteDeleteComponent,
  ],
  entryComponents: [ReceiveNoteConfirmComponent, ReceiveNoteDeleteComponent],
})
export class ReceiveNotesModule {}

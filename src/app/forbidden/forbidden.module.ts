import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material";

import { ForbiddenComponent } from "./forbidden.component";

const routes: Routes = [
  {
    path: "",
    component: ForbiddenComponent,
    data: {
      title: "Error 403 | PIAN VTS",
    },
  },
];

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule.forChild(routes)],
  declarations: [ForbiddenComponent],
})
export class ForbiddenModule {}

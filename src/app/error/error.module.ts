import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material";
import { Routes, RouterModule } from "@angular/router";

import { ErrorComponent } from "./error.component";

const routes: Routes = [
  {
    path: "",
    component: ErrorComponent,
    data: {
      title: "404 not found | MOTOZEN",
    },
  },
];

@NgModule({
  imports: [CommonModule, MatButtonModule, RouterModule.forChild(routes)],
  declarations: [ErrorComponent],
})
export class ErrorModule {}

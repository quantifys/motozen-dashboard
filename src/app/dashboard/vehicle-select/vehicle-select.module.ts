import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';
import { MatDialogModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatButtonModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { VehicleSelectComponent } from './vehicle-select.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    NgPipesModule
  ],
  declarations: [VehicleSelectComponent],
  entryComponents: [VehicleSelectComponent]
})
export class VehicleSelectModule { }

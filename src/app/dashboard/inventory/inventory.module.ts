import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgStringPipesModule } from 'ngx-pipes';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTabsModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatButtonModule, MatBottomSheetModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { InventoryComponent } from './inventory.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryDetailComponent, InventoryDeleteComponent } from './inventory-detail/inventory-detail.component';

const routes: Routes = [
  {
    path: 'edit',
    component: InventoryEditComponent,
    data: {
      title: "Inventory edit - Dashboard | Gemeni India"
    }
  },
  {
    path: 'view',
    component: InventoryDetailComponent,
    data: {
      title: "Inventory details - Dashboard | Gemeni India"
    }
  },
  {
    path: '',
    component: InventoryComponent,
    data: {
      title: "Inventory management - Dashboard | Gemeni India"
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatBottomSheetModule,
    NgStringPipesModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InventoryComponent, InventoryTableComponent, InventoryEditComponent, InventoryDetailComponent, InventoryDeleteComponent],
  entryComponents: [InventoryDeleteComponent]
})
export class InventoryModule { }

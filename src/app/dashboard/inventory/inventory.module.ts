import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgStringPipesModule } from 'ngx-pipes';

import { InventoryComponent } from './inventory.component';
import { InventoryTableComponent } from './inventory-table/inventory-table.component';

const routes: Routes = [
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
    NgxPaginationModule,
    NgStringPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InventoryComponent, InventoryTableComponent]
})
export class InventoryModule { }

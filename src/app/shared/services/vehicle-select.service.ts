import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { VehicleSelectComponent } from 'src/app/dashboard/vehicle-select/vehicle-select.component';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleSelectService {

  public selectedVehicles: BehaviorSubject<number[]> = new BehaviorSubject([]);

  constructor(
    private _dialog: MatDialog
  ) { }

  openVehicleDialog(vehicles) {
    const dialog = this._dialog.open(VehicleSelectComponent, {
      data: vehicles,
      panelClass: 'modalCont'
    });

    dialog.afterClosed().subscribe(result => {
      const ids = this.selectedVehicles.value;
      ids.push(result);
      this.selectedVehicles.next(ids);
    });
  }

  clear() {
    this.selectedVehicles.next([]);
  }

}

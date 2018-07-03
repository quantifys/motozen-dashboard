import { Component, OnInit, Input } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import { Device } from '../../../shared/models/device.model';

@Component({
  selector: 'device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit {
  @Input('devices') devices: Device[] = [];
  public loading: boolean = false;
  public config: PaginationInstance = {
    itemsPerPage: 2,
    currentPage: 1,
    totalItems: this.devices.length
  };
  
  constructor(
    private _store: Store<fromRoot.State>
  ) { }

  ngOnInit() {
  }

}

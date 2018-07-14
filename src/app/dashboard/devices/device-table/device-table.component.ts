import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import { Device } from '../../../shared/models/device.model';

@Component({
  selector: 'device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss']
})
export class DeviceTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public devices: Device[] = [];
  public loading: boolean = false;
  public status: string = '';
  public config: PaginationInstance = {
    itemsPerPage: 20,
    currentPage: 1,
    totalItems: this.devices.length
  };
  
  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.status = params["status"];
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getAllDevices).subscribe(devices => this.devices = devices.filter(device => device.status == this.status));
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }

  deleteDevice(id: number) {
    swal({
      title: 'Are you sure?',
      text: 'Delete device!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        this._store.dispatch(new deviceActions.DeleteDeviceAction(id));
      }
    });
  }

}

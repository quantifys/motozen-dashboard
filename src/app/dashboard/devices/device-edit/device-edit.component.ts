import { Location } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Device, Vehicle } from 'src/app/shared/models';
import * as fromRoot from '../../../shared/reducers';
import * as deviceActions from '../../../shared/actions/device.actions';
import { VehicleSelectService } from 'src/app/shared/services/vehicle-select.service';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styleUrls: ['./device-edit.component.scss']
})
export class DeviceEditComponent implements OnInit {

  public deviceForm: FormGroup;
  public deviceEditForm: FormGroup;
  public addDevice: boolean;
  public filledVehicles = false;
  public currentDevice: Device;
  public selectedVehicles: Vehicle[];
  public formVehicles: any = {};
  public brands: string[] = [];
  public variants: any[] = [];
  public groups: any[] = [
    [221, 218, 222, 236, 235, 217, 231, 232, 220, 234, 223, 237, 216, 233, 226, 227, 224, 225, 228, 230, 229],
    [244, 245, 240, 241, 242, 246, 243, 238, 239, 215]
  ];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    public _location: Location,
    private _vehicleSelect: VehicleSelectService
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addDevice = false;
        this._store.dispatch(new deviceActions.FetchDeviceAction(params['id']));
      } else {
        this.addDevice = true;
      }
    });
    this._vehicleSelect.selectedVehicles.subscribe(ids => this.add(ids, true));
  }

  ngOnInit() {
    this.buildForm();
    this._store.dispatch(new deviceActions.FetchDeviceNewAction);
    this.addSld();
    this.deviceForm.valueChanges.subscribe(value => {
      if (this.checkDuplicateInObject('sld_number', value.device)) {
        this.deviceForm.setErrors({ 'duplicates': true });
      } else {
        this.deviceForm.setErrors(null);
      }
    });
    this._store.select(fromRoot.getDeviceFormVehicles).subscribe(data => {
      if (data) {
        this.formVehicles = data;
        this.brands = [];
        if (data['vehicle_makes']) {
          for (const k in data['vehicle_makes']) {
            if (k) {
              this.brands.push(k);
            }
          }
        }
        if (!this.filledVehicles && this.currentDevice) {
          this.filledVehicles = true;
          this.currentDevice.restricted_to_vehicles.map(vehicle => this.restricted_to_vehicles.push(this._fb.group({
            vehicle_make: [vehicle.make, Validators.required],
            vehicle_model: [vehicle.model, Validators.required],
            vehicle_id: [vehicle.id, Validators.required]
          })));
        }
      }
    });
    this._store.select(fromRoot.getCurrentDevice).subscribe(device => {
      if (device.id) {
        this.currentDevice = device;
        this.deviceEditForm.patchValue(device, { emitEvent: false });
        if (!this.filledVehicles) {
          this.filledVehicles = true;
          device.restricted_to_vehicles.map(vehicle => this.restricted_to_vehicles.push(this._fb.group({
            vehicle_make: [vehicle.make, Validators.required],
            vehicle_model: [vehicle.model, Validators.required],
            vehicle_id: [vehicle.id, Validators.required]
          })));
        }
      }
    });
  }

  buildForm() {
    this.deviceForm = this._fb.group({
      device: this._fb.array([]),
      restricted_to_vehicle_ids: this._fb.array([])
    });
    this.deviceEditForm = this._fb.group({
      id: null,
      sld_number: [null, Validators.required],
      restricted_to_vehicles: this._fb.array([])
    });
  }

  get device(): FormArray {
    return this.deviceForm.get('device') as FormArray;
  }

  get restricted_to_vehicle_ids(): FormArray {
    return this.deviceForm.get('restricted_to_vehicle_ids') as FormArray;
  }

  get restricted_to_vehicles(): FormArray {
    return this.deviceEditForm.get('restricted_to_vehicles') as FormArray;
  }

  addSld() {
    this.device.push(this._fb.group({
      sld_number: ['', [Validators.required, Validators.minLength(4)]]
    }));
    this._cdr.detectChanges();
  }

  deleteSld(i: number) {
    this.device.removeAt(i);
  }

  add(ids: number[], type?: boolean) {
    if (type) {
      this.selectedVehicles = [];
    }
    ids.map(id => {
      this.brands.map(brand => {
        this.formVehicles['vehicle_makes'][brand].map(vehicle => {
          if (vehicle.id === id) {
            this.selectedVehicles.push(new Vehicle({
              make: brand,
              model: vehicle.model,
              variant: vehicle.variant
            }));
          }
        });
      });
    });
  }

  remove(index: number) {
    this.selectedVehicles = this.selectedVehicles.filter((v, i) => i !== index);
  }

  addVehicle(type: boolean) {
    this._vehicleSelect.openVehicleDialog(this.formVehicles);
    // if (type) {
    //   this.restricted_to_vehicle_ids.push(this._fb.group({
    //     vehicle_make: [null, Validators.required],
    //     vehicle_model: [null, Validators.required],
    //     vehicle_id: [null, Validators.required]
    //   }));
    // } else {
    //   this.restricted_to_vehicles.push(this._fb.group({
    //     vehicle_make: [null, Validators.required],
    //     vehicle_model: [null, Validators.required],
    //     vehicle_id: [null, Validators.required]
    //   }));
    // }
  }

  removeVehicle(index: number) {
    this.restricted_to_vehicle_ids.removeAt(index);
  }

  enterPressed(id: number) {
    if (this.device.length - 1 === id) {
      this.addSld();
    }
  }

  checkDuplicateInObject(propertyName: string, inputArray: any[]) {
    let seenDuplicate = false;
    const testObject = {};
    if (inputArray !== undefined) {
      inputArray.map((item) => {
        const itemPropertyName = item[propertyName];
        if (itemPropertyName in testObject) {
          testObject[itemPropertyName].duplicate = true;
          item.duplicate = true;
          seenDuplicate = true;
        } else {
          testObject[itemPropertyName] = item;
          delete item.duplicate;
        }
      });
    }
    return seenDuplicate;
  }

  saveChanges() {
    if (this.addDevice) {
      const formData = this.deviceForm.value;
      formData['restricted_to_vehicle_ids'] = this.selectedVehicles;
      this._store.dispatch(new deviceActions.CreateDeviceAction(formData));
    } else {
      const formData = this.deviceEditForm.value;
      this._store.dispatch(new deviceActions.UpdateDeviceAction({
        device: {
          id: formData['id'],
          sld_number: formData['sld_number'],
          restricted_to_vehicle_ids: formData['restricted_to_vehicles'].map(vehicle => vehicle['vehicle_id'])
        }
      }));
    }
  }

  getModels(make: string): any {
    return this.formVehicles['vehicle_makes'][make];
  }

  onAdd(data: any, index: number) {
    this.variants[index] = [];
    const models: any[] = [];
    this.formVehicles['vehicle_makes'][(this.addDevice ? this.restricted_to_vehicle_ids : this.restricted_to_vehicles)
      .at(index).get('vehicle_make').value].map(vehicle => {
        if (vehicle.model === data.model) {
          models.push(vehicle);
        }
      });
    this.variants[index] = models;
  }

  addGroup(group: number) {
    if (this.addDevice) {
      this.add(this.groups[group]);
    }
  }

}

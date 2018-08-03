import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as moment from 'moment';

import * as fromRoot from "../../../shared/reducers";
import * as certificateActions from "../../../shared/actions/certificate.actions";
import * as deviceActions from "../../../shared/actions/device.actions";
import { Device, Rto, User } from '../../../shared/models';
import { RtoService } from '../../../shared/services/rto.service';

declare var $: any;

@Component({
  selector: 'app-certificate-edit',
  templateUrl: './certificate-edit.component.html',
  styleUrls: ['./certificate-edit.component.scss']
})
export class CertificateEditComponent implements OnInit {

  model;
  public certificateForm: FormGroup;
  public addCertificate: boolean;
  public devices: Device[] = [];
  public rto: Rto[] = [];
  public formdata: any;
  public brands: string[] = [];
  public monthMin: Date = new Date(1900, 0, 1);
  public monthMax: Date = new Date();
  public loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    public _location: Location,
    private _rtoService: RtoService
  ) {
    this.loadFormdata();
    this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addCertificate = false;
        this._store.dispatch(new certificateActions.FetchCertificateAction(params["id"]));
      } else {
        this.addCertificate = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this.initializers();
    this.fetchDevices();
    this._store.select(fromRoot.getCurrentCertificate).subscribe(certificate => {
      if (certificate.id) {
        this.certificateForm.patchValue(certificate, { emitEvent: false });
      }
    });
    this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      this.rto = this._rtoService.getRto(user.details.state);
      this.location_state.patchValue(user.details.state, { emitEvent: false });
    });
  }

  buildForm() {
    this.certificateForm = this._fb.group({
      device_id: [null, [Validators.required, Validators.minLength(4)]],
      invoice_no: [null, Validators.required],
      cutoff_speed: ['', [Validators.required, Validators.min(40), Validators.max(120)]],
      customer_name: [null, [Validators.required, Validators.minLength(4)]],
      customer_telephone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13), Validators.pattern("[0-9]+")]],
      address_l1: [null, Validators.required],
      address_l2: [null],
      locality: [null],
      city: [null, Validators.required],
      pincode: ['', Validators.required],
      vehicle_make: [null, Validators.required],
      vehicle_id: [null, Validators.required],
      seals: [null, Validators.required],
      engine_number: [null, Validators.required],
      chassis_number: [null, Validators.required],
      car_reg_number: [null, [Validators.required, Validators.pattern("^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$")]],
      location_rto: [null, Validators.required],
      location_state: [null, Validators.required],
      mfg_month_year: [null, Validators.required],
      reg_month_year: [null, Validators.required]
    });
  }

  get device_id(): FormControl {
    return this.certificateForm.get('device_id') as FormControl;
  }

  get customer_telephone(): FormControl {
    return this.certificateForm.get('customer_telephone') as FormControl;
  }

  get pincode(): FormControl {
    return this.certificateForm.get('pincode') as FormControl;
  }

  get car_reg_number(): FormControl {
    return this.certificateForm.get('car_reg_number') as FormControl;
  }

  get vehicle_make(): FormControl {
    return this.certificateForm.get('vehicle_make') as FormControl;
  }

  get vehicle_id(): FormControl {
    return this.certificateForm.get('vehicle_id') as FormControl;
  }

  get location_state(): FormControl {
    return this.certificateForm.get('location_state') as FormControl;
  }

  loadFormdata() {
    this._store.dispatch(new certificateActions.FetchCertificateFormdataAction);
    this._store.select(fromRoot.getCertificateFormdata).subscribe(data => {
      if (data) {
        this.formdata = data;
        this.brands = [];
        for (var make in data["vehicle_makes"]) {
          this.brands.push(make);
        }
      }
    });
  }

  fetchDevices(event?) {
    this.device_id.patchValue(null, { emitEvent: false });
    this._store.dispatch(new deviceActions.FetchAllDevicesAction({
      sld_number: event ? event.target.value : null,
      status: "sold"
    }));
  }

  optionSelected(event, type) {
    this.certificateForm.get(type).patchValue(event.option.value);
  }

  getModels(): any[] {
    return this.formdata.vehicle_makes[this.vehicle_make.value];
  }

  displayFn(car): string | undefined {
    return car ? car.model : undefined;
  }

  displayDevice(device: Device): string | undefined {
    return device ? device.sld_number : undefined;
  }

  formListener() {
    this.vehicle_make.valueChanges.subscribe(value => {
      this.vehicle_id.patchValue(null, { emitEvent: false });
      $("#model").val(null);
    });
  }

  initializers() {
    this._store.select(fromRoot.getAllDevices).subscribe(devices => this.devices = devices);
  }

  saveChanges() {
    if (this.addCertificate) {
      let formData = this.certificateForm.value;
      delete formData["vehicle_make"];
      formData["mfg_month_year"] = moment(new Date(formData["mfg_month_year"]).toISOString()).format("YYYY-MM-DD");
      formData["reg_month_year"] = moment(new Date(formData["reg_month_year"]).toISOString()).format("YYYY-MM-DD");
      formData["device_id"] = formData["device_id"]["id"];
      formData["vehicle_id"] = formData["vehicle_id"]["id"];
      formData["customer_address"] = formData.address_l1 + ", " + formData.address_l2 + ", " + formData.locality + ", " + formData.city + " - " + formData.pincode;
      delete formData['address_l1'];
      delete formData['address_l2'];
      delete formData['locality'];
      delete formData['city'];
      delete formData['pincode'];
      this._store.dispatch(new certificateActions.CreateCertificateAction(formData));
    }
  }

}

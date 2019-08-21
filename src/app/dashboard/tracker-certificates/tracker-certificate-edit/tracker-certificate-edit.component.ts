import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Subscription } from 'rxjs';
import moment from 'moment';

import * as fromRoot from '../../../shared/reducers';
import * as trackerCertificateActions from '../../../shared/actions/tracker-certificate.actions';
import { TrackerDevice, Rto, User, TrackerCertificate, VtsUser } from '../../../shared/models';
import { RtoService } from '../../../shared/services/rto.service';

declare var $: any;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-tracker-certificate-edit',
  templateUrl: './tracker-certificate-edit.component.html',
  styleUrls: ['./tracker-certificate-edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class TrackerCertificateEditComponent implements OnInit, OnDestroy {

  public certificateForm: FormGroup;
  public addTrackerCertificate: boolean;
  public trackerDevices: TrackerDevice[] = [];
  public customers: VtsUser[] = [];
  public rto: Rto[] = [];
  public formdata: any;
  public monthMin: Date = new Date(1900, 0, 1);
  public monthMax: Date = new Date();
  public loggedUser: User = new User({});
  public certificate: TrackerCertificate;
  public unique: boolean;
  public certificateSubscription$: Subscription = new Subscription();
  public routeSubscription$: Subscription = new Subscription();
  public userSubscription$: Subscription = new Subscription();
  public uniqeSubscription$: Subscription = new Subscription();
  public formDataSubscription$: Subscription = new Subscription();
  public deviceSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _rtoService: RtoService
  ) {
    this._store.dispatch(new trackerCertificateActions.ClearTrackerCertificateDataAction);
    this.certificate = new TrackerCertificate({});
    this.routeSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addTrackerCertificate = false;
        this.loadFormdata(+params['id']);
        this._store.dispatch(new trackerCertificateActions.FetchTrackerCertificateAction(params['id']));
      } else {
        this.addTrackerCertificate = true;
        this.loadFormdata();
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.initializers();
    this.certificateSubscription$ = this._store.select(fromRoot.getCurrentTrackerCertificate)
      .subscribe((certificate: TrackerCertificate) => {
        if (certificate.id) {
          if (this.loggedUser.role === 'admin') {
            this.rto = this._rtoService.getRto(certificate.location_state);
            this.tracker_customer_id.patchValue(certificate.tracker_customer.id);
          }
          this.certificate = certificate;
          this.certificateForm.patchValue(certificate);
          this.tracker_device_id.patchValue(certificate.device.id);
          // tslint:disable-next-line
          certificate.car_reg_number === 'NEW' ? this.car_reg_number.patchValue('', { emitEvent: false }) : null
        }
      });
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role !== 'admin') {
        this.rto = this._rtoService.getRto(user.details.state);
      }
      this.location_state.patchValue(user.details.state, { emitEvent: false });
    });
    this.uniqeSubscription$ = this._store.select(fromRoot.checkTrackerCertificateUnique).subscribe(unique => {
      if (unique) {
        this.saveChanges();
      }
    });
  }

  ngOnDestroy() {
    this.certificateSubscription$.unsubscribe();
    this.routeSubscription$.unsubscribe();
    this.userSubscription$.unsubscribe();
    this.uniqeSubscription$.unsubscribe();
    this.formDataSubscription$.unsubscribe();
    this.deviceSubscription$.unsubscribe();
  }

  buildForm() {
    this.certificateForm = this._fb.group({
      id: [null],
      tracker_device_id: [null, [Validators.required, Validators.minLength(4)]],
      invoice_no: [null, Validators.required],
      tracker_customer_id: [null, Validators.required],
      make: [null, Validators.required],
      model: [null, Validators.required],
      vehicle_type: [null, Validators.required],
      engine_number: [null, Validators.required],
      chassis_number: [null, Validators.required],
      car_reg_number: ['', [Validators.pattern('^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$')]],
      location_rto: [null, Validators.required],
      location_state: [null, Validators.required],
      mfg_month_year: [null, Validators.required],
      reg_month_year: [null, Validators.required],
      date_generated: [null]
    });
  }

  get tracker_device_id(): FormControl {
    return this.certificateForm.get('tracker_device_id') as FormControl;
  }

  get tracker_customer_id(): FormControl {
    return this.certificateForm.get('tracker_customer_id') as FormControl;
  }

  get customer_telephone(): FormControl {
    return this.certificateForm.get('customer_telephone') as FormControl;
  }

  get chassis_number(): FormControl {
    return this.certificateForm.get('chassis_number') as FormControl;
  }

  get engine_number(): FormControl {
    return this.certificateForm.get('engine_number') as FormControl;
  }

  get car_reg_number(): FormControl {
    return this.certificateForm.get('car_reg_number') as FormControl;
  }

  get make(): FormControl {
    return this.certificateForm.get('make') as FormControl;
  }

  get model(): FormControl {
    return this.certificateForm.get('model') as FormControl;
  }

  get location_state(): FormControl {
    return this.certificateForm.get('location_state') as FormControl;
  }

  get date_generated(): FormControl {
    return this.certificateForm.get('date_generated') as FormControl;
  }

  loadFormdata(id?: number) {
    this._store.dispatch(new trackerCertificateActions.FetchTrackerCertificateFormdataAction(id));
    this.formDataSubscription$ = this._store.select(fromRoot.getTrackerCertificateFormdata).subscribe(data => {
      this.trackerDevices = data.devices;
      this.customers = data.customers;
    });
  }

  initializers() {
    this.deviceSubscription$ = this._store.select(fromRoot.getAllTrackerDevices).subscribe(devices => this.trackerDevices = devices);
  }

  saveChanges() {
    const formData = this.certificateForm.value;
    formData['mfg_month_year'] = moment(new Date(formData['mfg_month_year']).toISOString()).format('YYYY-MM-DD');
    formData['reg_month_year'] = moment(new Date(formData['reg_month_year']).toISOString()).format('YYYY-MM-DD');
    // tslint:disable-next-line
    formData['car_reg_number'] === '' ? (formData['car_reg_number'] = 'NEW') : null;
    if (this.addTrackerCertificate) {
      this._store.dispatch(new trackerCertificateActions.CreateTrackerCertificateAction(formData));
    } else {
      if (this.loggedUser.role === 'admin') {
        formData['date_generated'] = moment(new Date(formData['date_generated']).toISOString()).format('YYYY-MM-DD');
      }
      this._store.dispatch(new trackerCertificateActions.UpdateTrackerCertificateAction(formData));
    }
  }

  verify() {
    const data: any = {};
    ['car_reg_number', 'chassis_number', 'engine_number'].map(field => {
      const control: FormControl = this.certificateForm.get(field) as FormControl;
      if (control.dirty) {
        data[field] = control.value;
      }
    });
    if ($.isEmptyObject(data)) {
      this.saveChanges();
    } else {
      this._store.dispatch(new trackerCertificateActions.TrackerCertificateCheckUniqueAction(data));
    }
  }
}

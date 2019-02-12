import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material';
import { Subscription } from 'rxjs';

import * as fromRoot from '../../../shared/reducers';
import * as reportActions from '../../../shared/actions/reports.actions';
import { RtoService } from 'src/app/shared/services/rto.service';
import { CsvReportService } from 'src/app/shared/services/csv-report.service';
import { User, State } from 'src/app/shared/models';

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrls: ['./stock-summary.component.scss']
})
export class StockSummaryComponent implements OnInit, OnDestroy {

  public userSubscription: Subscription = new Subscription();
  public distributorSubscription: Subscription = new Subscription();
  public reportForm: FormGroup;
  public users: User[] = [];
  public states: State[] = [];
  public loggedUser: User = new User({});

  constructor(
    private _store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private bottomSheetRef: MatBottomSheetRef<StockSummaryComponent>,
    private _rtoService: RtoService,
    private _csvService: CsvReportService
  ) {
    this.userSubscription = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role === 'manufacturer') {
        this._store.dispatch(new reportActions.FetchPOSummaryMFGFormDataAction);
      }
    });
    this.distributorSubscription = this._store.select(fromRoot.getDistributorsForSummary).subscribe(users => this.users = users);
    this.states = this._rtoService.getStates();
    this._csvService.subscribeToStockSummary();
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.distributorSubscription.unsubscribe();
    this._csvService.unsubscribe();
  }

  buildForm() {
    this.reportForm = this._fb.group({
      dist_id: null,
      role: 'distributor',
      state_code: null
    });
  }

  get dist_id(): FormControl {
    return this.reportForm.get('dist_id') as FormControl;
  }

  get state_code(): FormControl {
    return this.reportForm.get('state_code') as FormControl;
  }

  get role(): FormControl {
    return this.reportForm.get('role') as FormControl;
  }

  closeSheet() {
    let formData: any = {
      dist_id: this.dist_id.value,
      state_code: this.state_code.value,
      role: [this.role.value, Validators.required]
    };
    formData["dist_id"] ? null : delete formData["dist_id"]
    formData["state_code"] ? null : delete formData["state_code"]
    formData["role"] ? null : delete formData["role"]
    this._store.dispatch(new reportActions.FetchStockSummaryAction(formData));
  }
}

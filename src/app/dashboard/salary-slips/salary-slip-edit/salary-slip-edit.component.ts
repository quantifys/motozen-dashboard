import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../../shared/reducers";
import * as salarySlipActions from "../../../shared/actions/salary-slip.actions";
import * as userActions from "../../../shared/actions/user.actions";
import { User } from '../../../shared/models';

@Component({
  selector: 'app-salary-slip-edit',
  templateUrl: './salary-slip-edit.component.html',
  styleUrls: ['./salary-slip-edit.component.scss']
})
export class SalarySlipEditComponent implements OnInit {

  public salarySlipSubscription$: Subscription = new Subscription();
  public routerSubscription$: Subscription = new Subscription();
  public salarySlipForm: FormGroup;
  public addSalarySlip: boolean;
  public users: User[] = [];

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this._store.dispatch(new userActions.FetchAllUsersAction);
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addSalarySlip = false;
        this._store.dispatch(new salarySlipActions.FetchSalarySlipAction(params["id"]));
      } else {
        this.addSalarySlip = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this._store.select(fromRoot.getAllUsers).subscribe(users => this.users = users);
    if (this.addSalarySlip) {

    } else {
      this.salarySlipSubscription$ = this._store.select(fromRoot.getCurrentPurchaseOrder).subscribe(salarySlip => {
        this.salarySlipForm.patchValue(salarySlip);
      });
    }
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.salarySlipSubscription$.unsubscribe();
  }

  buildForm() {
    this.salarySlipForm = this._fb.group({
      id: [null],
      employee_id: [null, Validators.required],
      bonus: [null, Validators.min(0)],
      leave_days: [null, [Validators.min(0), Validators.max(30)]],
      amount: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get employee_id(): FormControl {
    return this.salarySlipForm.get('employee_id') as FormControl
  }

  get bonus(): FormControl {
    return this.salarySlipForm.get('bonus') as FormControl
  }

  get leave_days(): FormControl {
    return this.salarySlipForm.get('leave_days') as FormControl
  }

  get amount(): FormControl {
    return this.salarySlipForm.get('amount') as FormControl
  }

  formListener() {
    this.salarySlipForm.valueChanges.subscribe(value => {
      let user: User = this.users.find(user => user.id == this.employee_id.value);
      if (!user) { return }
      let amount = user.details.base_salary + user.details.hra + user.details.transport_allowance;
      user.details.esic ? amount -= amount * (user.details.esic / 100) : null
      amount -= amount * (user.details.gpf / 100);
      amount = amount - ((amount / 31) * this.leave_days.value);
      this.amount.patchValue(Math.round(amount + this.bonus.value), { emitEvent: false });
    });
  }

  saveChanges() {
    let formData: any = this.salarySlipForm.value;
    formData["bonus"] == null ? formData["bonus"] = 0 : null
    formData["leave_days"] == null ? formData["leave_days"] = 0 : null
    if (this.addSalarySlip) {
      this._store.dispatch(new salarySlipActions.CreateSalarySlipAction(formData));
    } else {

    }
  }

}

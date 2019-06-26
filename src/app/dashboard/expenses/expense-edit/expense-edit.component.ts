import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as expenseActions from '../../../shared/actions/expense.actions';

@Component({
  selector: 'app-expense-edit',
  templateUrl: './expense-edit.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent implements OnInit, OnDestroy {

  public addExpense = false;
  public expenseForm: FormGroup;
  public expenseSubscription$: Subscription;
  public formSubscription$: Subscription;

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder,
    public _location: Location
  ) {
    this._store.dispatch(new expenseActions.ClearExpenseAction);
    this._activatedRoute.queryParams.subscribe(params => {
      if (params['id']) {
        this.addExpense = false;
        this._store.dispatch(new expenseActions.FetchExpenseAction(params['id']));
      } else {
        this.addExpense = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this.expenseSubscription$ = this._store.select(fromRoot.getCurrentExpense).subscribe(expense => {
      this.expenseForm.patchValue(expense);
    });
  }

  ngOnDestroy() {
    this.expenseSubscription$.unsubscribe();
    this.formSubscription$.unsubscribe();
  }

  buildForm() {
    this.expenseForm = this._fb.group({
      id: null,
      category: [null, Validators.required],
      description: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      gst: [null, [Validators.required, Validators.min(0), Validators.max(80)]],
      gstn: [null, [Validators.minLength(15), Validators.maxLength(15), Validators.pattern('[a-zA-Z0-9]+')]],
      total: [null, Validators.required]
    });
  }

  get amount(): FormControl {
    return this.expenseForm.get('amount') as FormControl;
  }

  get gst(): FormControl {
    return this.expenseForm.get('gst') as FormControl;
  }

  get total(): FormControl {
    return this.expenseForm.get('total') as FormControl;
  }

  get gstn(): FormControl {
    return this.expenseForm.get('gstn') as FormControl;
  }

  formListener() {
    this.formSubscription$ = this.expenseForm.valueChanges.subscribe(value =>
      this.total.patchValue(Math.ceil(this.amount.value + (this.amount.value * this.gst.value * 0.01)), { emitEvent: false }));
  }

  saveChanges() {
    if (this.addExpense) {
      this._store.dispatch(new expenseActions.CreateExpenseAction(this.expenseForm.value));
    } else {
      this._store.dispatch(new expenseActions.UpdateExpenseAction({ expense: this.expenseForm.value }));
    }
  }

}

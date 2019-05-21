import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatBottomSheetRef } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as userActions from '../../../shared/actions/user.actions';

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.scss']
})
export class AddCreditComponent implements OnInit {

  public creditForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<AddCreditComponent>
  ) {
  }

  ngOnInit() {
    this.buildForm();
    this._store.select(fromRoot.getCurrentUserStats).subscribe(stats => {
      this.renewal_credits.patchValue(stats.credit_account.renewal_credits, { emitEvent: false });
    });
  }

  buildForm() {
    this.creditForm = this._fb.group({
      renewal_credits: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get renewal_credits(): FormControl {
    return this.creditForm.get('renewal_credits') as FormControl;
  }

  addCredits() {
    this._store.dispatch(new userActions.UpdateUserCreditsAction({
      credit_account: {
        renewal_credits: this.renewal_credits.value
      }
    }));
    this.bottomSheetRef.dismiss();
  }

}

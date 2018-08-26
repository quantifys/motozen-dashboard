import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as incomeActions from '../../../shared/actions/income.actions';

@Component({
  selector: 'app-income-delete',
  templateUrl: './income-delete.component.html',
  styleUrls: ['./income-delete.component.scss']
})
export class IncomeDeleteComponent {

  constructor(
    private _store: Store<fromRoot.State>,
    private bottomSheetRef: MatBottomSheetRef<IncomeDeleteComponent>
  ) { }

  action() {
    this._store.dispatch(new incomeActions.DeleteIncomeAction);
    this.close();
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

}

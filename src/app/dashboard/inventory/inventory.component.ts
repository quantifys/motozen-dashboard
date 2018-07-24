import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public categories: any[] = [
    {
      display: 'Connectors',
      value: 'automotive_connector',
      icon: 'fa-plug'
    },
    {
      display: 'Tool',
      value: 'tool',
      icon: 'fa-gavel'
    },
    {
      display: 'Raw material',
      value: 'raw_material',
      icon: 'fa-shopping-bag'
    },
    {
      display: 'Finished product',
      value: 'finished_product',
      icon: 'fa-box'
    },
    {
      display: 'Others',
      value: 'other',
      icon: 'fa-boxes'
    }
  ];

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      this._router.navigate(["dashboard", "inventory"], { queryParams: { type: 'automotive_connector' } });
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

}

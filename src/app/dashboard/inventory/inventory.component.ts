import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit, OnDestroy {

  public loggedUser: User = new User({});
  private userSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        let newParams: any = {};
        if (!this._activatedRoute.snapshot.queryParams["page"]) {
          newParams["page"] = 1;
        }
        if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
          newParams["per_page"] = 10;
        }
        if (!this._activatedRoute.snapshot.queryParams["category"]) {
          newParams["category"] = "automotive_connector";
        }
        this._router.navigate(["dashboard", "inventory"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } })
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  getQueryParams(status: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, category: status }
  }

}

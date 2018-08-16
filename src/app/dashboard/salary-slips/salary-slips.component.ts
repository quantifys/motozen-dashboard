import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';

@Component({
  selector: 'app-salary-slips',
  templateUrl: './salary-slips.component.html',
  styleUrls: ['./salary-slips.component.scss']
})
export class SalarySlipsComponent implements OnInit, OnDestroy {

  public loggedUser: User = new User({});
  private userSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      let newParams: any = {};
      if (!this._activatedRoute.snapshot.queryParams["page"]) {
        newParams["page"] = 1;
      }
      if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
        newParams["per_page"] = 10;
      }
      if (!this._activatedRoute.snapshot.queryParams["status"] && user.role) {
        switch (user.role) {
          case "human_resource":
            newParams["status"] = "can_modify";
            break;
          case "accounts":
            newParams["status"] = "confirmed";
            break;
          default:
            this._router.navigate(["404-not-authorized"]);
            break;
        }
      }
      user.role ? this._router.navigate(["dashboard", "salary-slips"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } }) : null
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  getQueryParams(status: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: status }
  }

}

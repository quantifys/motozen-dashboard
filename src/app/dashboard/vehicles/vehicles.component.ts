import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { Subscription, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { User } from '../../shared/models';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {

  public loggedUser: User = new User({});
  public searchForm: FormGroup;
  private userSubscription$: Subscription = new Subscription();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (user.role == 'manufacturer' || user.role == 'sales') {
          let newParams: any = {};
          if (!this._activatedRoute.snapshot.queryParams["page"]) {
            newParams["page"] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
            newParams["per_page"] = 10;
          }
          if (this._activatedRoute.snapshot.queryParams["mmv_search"]) {
            this.search.patchValue(this._activatedRoute.snapshot.queryParams["mmv_search"], { emitEvent: false });
          }
          this._router.navigate(["dashboard", "vehicles"], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } });
        } else {
          this._router.navigate(["403-forbidden"]);
        }
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  buildForm() {
    this.searchForm = this._fb.group({
      search: ''
    });
  }

  get search(): FormControl {
    return this.searchForm.get('search') as FormControl;
  }

  formListener() {
    this.search.valueChanges.pipe(debounce(() => timer(400))).subscribe(value => this.makeSearchRequest());
  }

  makeSearchRequest() {
    this._router.navigate(["dashboard", "vehicles"], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        mmv_search: this.search.value != null ? this.search.value : null
      }
    });
  }

  getQueryParams(status: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: status }
  }

}
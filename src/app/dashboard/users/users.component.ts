import { Component, OnInit, OnDestroy, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { debounce } from 'rxjs/operators';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../shared/models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public searchForm: FormGroup;
  @ViewChild('search') searchField: ElementRef;

  constructor(
    private _store: Store<fromRoot.State>,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.buildForm();
    this.userSubscription$ = this._store.select(fromRoot.getLoggedUser).subscribe(user => {
      this.loggedUser = user;
      if (user.role) {
        if (
          user.role === 'manufacturer'
          || user.role === 'sales'
          || user.role === 'human_resource'
          || user.role === 'admin'
          || user.role === 'rto'
        ) {
          const newParams: any = {};
          if (user.role === 'sales' || user.role === 'rto') {
            // tslint:disable-next-line
            (!this._activatedRoute.snapshot.queryParams['role']) ? newParams['role'] = 'distributor' : null;
            newParams['group'] = null;
          } else if (user.role === 'human_resource') {
            // tslint:disable-next-line
            (!this._activatedRoute.snapshot.queryParams['role']) ? newParams['role'] = 'store_purchases' : null;
            newParams['group'] = null;
          } else {
            // tslint:disable-next-line
            (!this._activatedRoute.snapshot.queryParams['group']) ? newParams['group'] = 'employees' : null;
            newParams['role'] = null;
          }
          if (!this._activatedRoute.snapshot.queryParams['page']) {
            newParams['page'] = 1;
          }
          if (!this._activatedRoute.snapshot.queryParams['per_page']) {
            newParams['per_page'] = 10;
          }
          if (this._activatedRoute.snapshot.queryParams['name']) {
            this.search.patchValue(this._activatedRoute.snapshot.queryParams['name'], { emitEvent: false });
          }
          this._router.navigate(['dashboard', 'users'], { queryParams: { ...this._activatedRoute.snapshot.queryParams, ...newParams } });
        } else {
          this._router.navigate(['403-forbidden']);
        }
      }
    });
  }

  ngOnInit() {
    this.formListener();
    this._router.events.subscribe(events => this.searchField.nativeElement.focus());
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
    this._router.navigate(['dashboard', 'users'], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        name: this.search.value !== '' ? this.search.value : null
      }
    });
  }

  getQueryParams(type: string): any {
    if (type === 'employees' || type === 'customers') {
      return { ...this._activatedRoute.snapshot.queryParams, group: type, role: null };
    } else {
      return { ...this._activatedRoute.snapshot.queryParams, role: type, group: null };
    }
  }

}

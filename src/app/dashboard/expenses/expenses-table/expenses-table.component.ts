import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PaginationInstance } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as expenseActions from '../../../shared/actions/expense.actions';
import { Cost, PageData } from '../../../shared/models';

@Component({
  selector: 'expenses-table',
  templateUrl: './expenses-table.component.html',
  styleUrls: ['./expenses-table.component.scss']
})
export class ExpensesTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public pageData: BehaviorSubject<PageData> = new BehaviorSubject(new PageData({}));
  public expenses: Cost[] = [];
  public loading: boolean = false;
  public config: PaginationInstance = {
    id: 'expensesPaginate',
    itemsPerPage: this.pageData.value.per_page,
    currentPage: 1,
    totalItems: this.expenses.length
  };

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute
  ) {
    this.pageData.subscribe(data => {
      this.config.itemsPerPage = data.per_page;
      this.config.totalItems = data.total;
    });
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      this.fetchExpenses();
    });
  }

  ngOnInit() {
    this._store.select(fromRoot.getAllExpenses).subscribe(expenses => {
      this.loading = false;
      this.expenses = expenses.filter(expense => expense.category == this.queryParams["category"]);
    });
    this._store.select(fromRoot.getExpensePageStatus).subscribe(pageData => this.pageData.next(pageData));
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
  }


  fetchExpenses() {
    let formData: any = {
      category: this.queryParams["category"] ? this.queryParams["category"] : null,
      start: this.queryParams["start_date"] ? this.queryParams["start_date"] : null,
      end: this.queryParams["end_date"] ? this.queryParams["end_date"] : null,
      page: this.config.currentPage,
      per_page: 15
    };
    this._store.dispatch(new expenseActions.FetchAllExpensesAction(formData));
  }

  deleteExpense(id: number) {
    swal({
      title: 'Are you sure?',
      text: 'Delete expense!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!'
    }).then((result) => {
      if (result.value) {
        this._store.dispatch(new expenseActions.DeleteExpenseAction(id));
      }
    });
  }

  getPage(page: number) {
    this.config.currentPage = page;
    this.fetchExpenses();
  }

}

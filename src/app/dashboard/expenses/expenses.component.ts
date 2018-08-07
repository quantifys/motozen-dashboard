import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  getQueryParams(type: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: type }
  }

}

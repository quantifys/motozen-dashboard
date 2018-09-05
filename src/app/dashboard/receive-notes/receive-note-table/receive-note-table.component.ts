import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material';

import * as fromRoot from '../../../shared/reducers';
import * as receiveNoteActions from '../../../shared/actions/receive-note.actions';
import { ReceiveNote } from '../../../shared/models';

@Component({
  selector: 'receive-note-table',
  templateUrl: './receive-note-table.component.html',
  styleUrls: ['./receive-note-table.component.scss']
})
export class ReceiveNoteTableComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private pageSubscription$: Subscription = new Subscription();
  private receiveNoteSubscription$: Subscription = new Subscription();
  public queryParams: any = {};
  public receiveNotes: ReceiveNote[] = [];
  public loading: boolean = false;
  public pageEvent: PageEvent = new PageEvent();

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this._activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
      if (params["page"]) {
        this.pageEvent.pageIndex = +params["page"] - 1;
      }
      if (params["per_page"]) {
        this.pageEvent.pageSize = +params["per_page"];
      }
      if (params["page"] && params["per_page"] && params["status"]) {
        this.fetchReceiveNotes();
      }
    });
  }

  ngOnInit() {
    this.receiveNoteSubscription$ = this._store.select(fromRoot.getAllReceiveNotes).subscribe(receiveNotes => {
      this.loading = false;
      this.receiveNotes = receiveNotes;
    });
    this.pageSubscription$ = this._store.select(fromRoot.getReceiveNotePageStatus).subscribe(pageData => this.pageEvent.length = pageData.total);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.receiveNoteSubscription$.unsubscribe();
    this.pageSubscription$.unsubscribe();
  }

  fetchReceiveNotes() {
    this.loading = true;
    this._store.dispatch(new receiveNoteActions.FetchAllReceiveNotesAction(this.queryParams));
  }

  getPage(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
    this._router.navigate(["dashboard", "receive-notes"], {
      queryParams: {
        ...this.queryParams,
        page: pageEvent.pageIndex + 1,
        per_page: pageEvent.pageSize
      }
    });
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../shared/reducers';
import * as receiveNoteActions from '../../../shared/actions/receive-note.actions';
import { ReceiveNote } from '../../../shared/models';
import { ReceiveNoteConfirmComponent, ReceiveNoteDeleteComponent } from '../receive-note-confirm/receive-note-confirm.component';

@Component({
  selector: 'app-receive-note-detail',
  templateUrl: './receive-note-detail.component.html',
  styleUrls: ['./receive-note-detail.component.scss']
})
export class ReceiveNoteDetailComponent implements OnInit, OnDestroy {

  private routerSubscription$: Subscription = new Subscription();
  private receiveNoteSubscription$: Subscription = new Subscription();
  public receiveNote: ReceiveNote = new ReceiveNote({});

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _location: Location,
    private _store: Store<fromRoot.State>,
    private bottomSheet: MatBottomSheet
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this._store.dispatch(new receiveNoteActions.FetchReceiveNoteAction(params["id"]));
      } else {
        this._router.navigate(["dashboard", "receive-notes"]);
      }
    });
  }

  ngOnInit() {
    this.receiveNoteSubscription$ = this._store.select(fromRoot.getCurrentReceiveNote).subscribe(receiveNote => this.receiveNote = receiveNote);
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.receiveNoteSubscription$.unsubscribe();
  }

  confirmReceiveNote() {
    this.bottomSheet.open(ReceiveNoteConfirmComponent);
  }

  deleteReceiveNote() {
    this.bottomSheet.open(ReceiveNoteDeleteComponent);
  }

}

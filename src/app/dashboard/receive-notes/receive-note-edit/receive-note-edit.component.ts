import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from "../../../shared/reducers";
import * as receiveNoteActions from "../../../shared/actions/receive-note.actions";

@Component({
  selector: 'app-receive-note-edit',
  templateUrl: './receive-note-edit.component.html',
  styleUrls: ['./receive-note-edit.component.scss']
})
export class ReceiveNoteEditComponent implements OnInit, OnDestroy {

  public receiveNoteSubscription$: Subscription = new Subscription();
  public routerSubscription$: Subscription = new Subscription();
  public receiveNoteForm: FormGroup;
  public addVendor: boolean;

  constructor(
    private _store: Store<fromRoot.State>,
    private _activatedRoute: ActivatedRoute,
    private _fb: FormBuilder
  ) {
    this.routerSubscription$ = this._activatedRoute.queryParams.subscribe(params => {
      if (params["id"]) {
        this.addVendor = false;
        this._store.dispatch(new receiveNoteActions.FetchVendorAction(params["id"]));
      } else {
        this.addVendor = true;
      }
    });
  }

  ngOnInit() {
    this.buildForm();
    if (!this.addVendor) {
      this.receiveNoteSubscription$ = this._store.select(fromRoot.getCurrentVendor).subscribe(receiveNote => {
        this.receiveNoteForm.patchValue(receiveNote);
      });
    }
  }

  ngOnDestroy() {
    this.routerSubscription$.unsubscribe();
    this.receiveNoteSubscription$.unsubscribe();
  }

  buildForm() {
    this.receiveNoteForm = this._fb.group({
      id: [null],
      company_name: [null, Validators.required],
      gstn: [null, [Validators.required, Validators.minLength(15), Validators.maxLength(15)]],
      address: [null, Validators.required]
    });
  }

  get id(): FormControl {
    return this.receiveNoteForm.get('id') as FormControl
  }

  get gstn(): FormControl {
    return this.receiveNoteForm.get('gstn') as FormControl
  }

  saveChanges() {
    if (this.addVendor) {
      this._store.dispatch(new receiveNoteActions.CreateVendorAction(this.receiveNoteForm.value));
    } else {
      this._store.dispatch(new receiveNoteActions.UpdateVendorAction({
        receiveNote: this.receiveNoteForm.value
      }));
    }
  }

}

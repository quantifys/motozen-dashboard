import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Subscription, timer } from "rxjs";
import { debounce } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Store } from "@ngrx/store";
import { MatBottomSheet } from "@angular/material";

import * as fromRoot from "../../shared/reducers";
import { User } from "../../shared/models";
import { StockSummaryComponent } from "./stock-summary/stock-summary.component";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.scss"],
})
export class DevicesComponent implements OnInit, OnDestroy {
  private userSubscription$: Subscription = new Subscription();
  public loggedUser: User = new User({});
  public searchForm: FormGroup;
  @ViewChild("search") searchField: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _store: Store<fromRoot.State>,
    private _fb: FormBuilder,
    private bottomSheet: MatBottomSheet
  ) {
    this.userSubscription$ = this._store
      .select(fromRoot.getLoggedUser)
      .subscribe((user) => {
        this.loggedUser = user;
        if (user.role) {
          if (
            user.role == "distributor" ||
            user.role == "dealer" ||
            user.role == "sub_dealer" ||
            user.role == "manufacturer" ||
            user.role == "store_purchases"
          ) {
            let newParams: any = {};
            if (!this._activatedRoute.snapshot.queryParams["status"]) {
              newParams["status"] =
                user.role == "manufacturer" || user.role == "store_purchases"
                  ? "unsold"
                  : "sold";
            }
            if (!this._activatedRoute.snapshot.queryParams["page"]) {
              newParams["page"] = 1;
            }
            if (!this._activatedRoute.snapshot.queryParams["per_page"]) {
              newParams["per_page"] = 10;
            }
            if (this._activatedRoute.snapshot.queryParams["sld_number"]) {
              this.search.patchValue(
                this._activatedRoute.snapshot.queryParams["sld_number"],
                { emitEvent: false }
              );
            }
            this._router.navigate(["dashboard", "devices"], {
              queryParams: {
                ...this._activatedRoute.snapshot.queryParams,
                ...newParams,
              },
            });
          } else {
            this._router.navigate(["403-forbidden"]);
          }
        }
      });
  }

  ngOnInit() {
    this.buildForm();
    this.formListener();
    this._router.events.subscribe((events) =>
      this.searchField.nativeElement.focus()
    );
  }

  ngOnDestroy() {
    this.userSubscription$.unsubscribe();
  }

  buildForm() {
    this.searchForm = this._fb.group({
      search: "",
    });
  }

  get search(): FormControl {
    return this.searchForm.get("search") as FormControl;
  }

  formListener() {
    this.search.valueChanges
      .pipe(debounce(() => timer(400)))
      .subscribe((value) => this.makeSearchRequest());
  }

  makeSearchRequest() {
    this._router.navigate(["dashboard", "devices"], {
      queryParams: {
        ...this._activatedRoute.snapshot.queryParams,
        sld_number: this.search.value !== "" ? this.search.value : null,
      },
    });
  }

  getQueryParams(type: string): any {
    return { ...this._activatedRoute.snapshot.queryParams, status: type };
  }

  stockSummary() {
    this.bottomSheet.open(StockSummaryComponent);
  }
}

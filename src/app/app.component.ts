import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Angular2TokenService } from 'angular2-token';

import { map, mergeMap, filter } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private _tokenService: Angular2TokenService
  ) {
    this._tokenService.init(environment.token_auth_config);
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).pipe(map(() => this.activatedRoute))
    .pipe(map(route => {
      while (route.firstChild) route = route.firstChild;
      return route;
    }))
    .pipe(filter(route => route.outlet === 'primary'))
    .pipe(mergeMap(route => route.data))
    .subscribe(event => this.titleService.setTitle(event['title']));
  }
}

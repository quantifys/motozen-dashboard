import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { map, mergeMap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }
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

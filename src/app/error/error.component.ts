import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public year: number = (new Date()).getFullYear();

  constructor() { }

  ngOnInit() {
  }

}

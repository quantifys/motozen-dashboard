import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  public year: number = (new Date()).getFullYear();
  
  constructor() { }

  ngOnInit() {
  }

}

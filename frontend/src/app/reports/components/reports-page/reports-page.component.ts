import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reports-page',
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss']
})
export class ReportsPageComponent implements OnInit {
  isHint: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}

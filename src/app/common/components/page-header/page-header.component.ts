import { Component, OnInit } from '@angular/core';
import { Router, RouterState, NavigationStart } from '@angular/router';

@Component({
  selector: 'ksu-gdc-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  url: string;

  constructor() {}

  ngOnInit() {
  }

}

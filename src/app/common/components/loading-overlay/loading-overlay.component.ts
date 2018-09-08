import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksu-gdc-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {
  visible: boolean;

  constructor() { }

  ngOnInit() {
  }

  show(): void {
    this.visible = true;
  }

  hide(): void {
    this.visible = false;
  }
}

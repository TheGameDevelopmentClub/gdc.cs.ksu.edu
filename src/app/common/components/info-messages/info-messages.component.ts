import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksu-gdc-info-messages',
  templateUrl: './info-messages.component.html',
  styleUrls: ['./info-messages.component.scss']
})
export class InfoMessagesComponent implements OnInit {
  error: boolean;
  errorMessage: string;
  success: boolean;
  successMessage: string;

  constructor() { }

  ngOnInit() {
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.success = false;
    this.error = true;
  }
  showSuccess(message: string): void {
    this.successMessage = message;
    this.error = false;
    this.success = true;
  }
}

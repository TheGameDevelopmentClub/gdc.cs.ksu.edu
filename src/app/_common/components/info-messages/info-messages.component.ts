import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksu-gdc-info-messages',
  templateUrl: './info-messages.component.html',
  styleUrls: ['./info-messages.component.scss']
})
export class InfoMessageComponent implements OnInit {
  showMessages: boolean;

  messageVisibility: Map<string, Function> = new Map([
    ['error', (bool) => this.error = bool],
    ['success', (bool) => this.success = bool]
  ]);
  error: boolean;
  errorMessage: string;
  success: boolean;
  successMessage: string;

  constructor() { }

  ngOnInit() {
  }

  setMessageVisibility(messageType: string): void {
    this.showMessages = true;
    this.messageVisibility.forEach((set, type) => {
      if (type === messageType) {
        set(true);
      } else {
        set(false);
      }
    });
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.setMessageVisibility('error');
  }
  showSuccess(message: string): void {
    this.successMessage = message;
    this.setMessageVisibility('success');
  }
}

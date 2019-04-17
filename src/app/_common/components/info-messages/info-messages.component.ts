import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ksu-gdc-info-messages',
  templateUrl: './info-messages.component.html',
  styleUrls: ['./info-messages.component.scss']
})
export class InfoMessagesComponent implements OnInit {
  messages = {
    error: {
      message: '',
      isVisible: false
    },
    success: {
      message: '',
      isVisible: false
    }
  };

  constructor() { }

  ngOnInit() {
  }

  hide(): void {
    this.showMessages([]);
  }

  shouldShowMessages(): boolean {
    for (const key in this.messages) {
      if (this.messages[key].isVisible) {
        return true;
      }
    }
    return false;
  }

  showMessages(messageTypes: Array<string>): void {
    for (const key in this.messages) {
      if (this.messages.hasOwnProperty(key)) {
        this.messages[key].isVisible = messageTypes.includes(key);
      }
    }
  }

  showError(message: string): void {
    this.messages.error.message = message;
    this.showMessages(['error']);
  }
  showSuccess(message: string): void {
    this.messages.success.message = message;
    this.showMessages(['success']);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const MS_IN_SEC = 1000;
const MS_IN_MIN = 60 * MS_IN_SEC;
const MS_IN_HOUR = 60 * MS_IN_MIN;
const MS_IN_DAY = 24 * MS_IN_HOUR;

@Component({
  selector: 'ksu-gdc-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss']
})
export class CountdownTimerComponent implements OnInit {
  @Output() expired: EventEmitter<void> = new EventEmitter<void>();

  /*
  * Valid Date Strings Examples:
  * "February 11, 2018 3:00 PM"
  */
  @Input('targetDate') set setTargetDate(targetDateString: string) {
    this.targetDate = new Date(targetDateString);
  }

  private timer;
  timeExpired: boolean;

  targetDate: Date;

  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  secondsLeft: number;
  millisecondsLeft: number;

  constructor() { }

  ngOnInit() {
    this.setTimer();
    if (!this.timeExpired) {
      this.startTimer();
    }
  }

  setTimer() {
    this.millisecondsLeft = this.targetDate.valueOf() - Date.now();
    if (this.millisecondsLeft <= 0) {
      this.daysLeft = 0;
      this.hoursLeft = 0;
      this.minutesLeft = 0;
      this.secondsLeft = 0;
      this.millisecondsLeft = 0;
      this.stopTimer();
      this.timeExpired = true;
      this.expired.emit();
      return;
    }
    this.daysLeft = Math.floor(this.millisecondsLeft / MS_IN_DAY);
    this.millisecondsLeft -= this.daysLeft * MS_IN_DAY;
    this.hoursLeft = Math.floor(this.millisecondsLeft / MS_IN_HOUR);
    this.millisecondsLeft -= this.hoursLeft * MS_IN_HOUR;
    this.minutesLeft = Math.floor(this.millisecondsLeft / MS_IN_MIN);
    this.millisecondsLeft -= this.minutesLeft * MS_IN_MIN;
    this.secondsLeft = Math.floor(this.millisecondsLeft / MS_IN_SEC);
    this.millisecondsLeft -= this.secondsLeft * MS_IN_SEC;
  }

  startTimer() {
    this.timer = setInterval(() => this.setTimer(), 1000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  getDaysLeftAsString(): string {
    return (this.daysLeft < 10) ? '0' + this.daysLeft : this.daysLeft.toString();
  }
  getHoursLeftAsString(): string {
    return (this.hoursLeft < 10) ? '0' + this.hoursLeft : this.hoursLeft.toString();
  }
  getMinutesLeftAsString(): string {
    return (this.minutesLeft < 10) ? '0' + this.minutesLeft : this.minutesLeft.toString();
  }
  getSecondsLeftAsString(): string {
    return (this.secondsLeft < 10) ? '0' + this.secondsLeft : this.secondsLeft.toString();
  }
}

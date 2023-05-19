import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss']
})
export class TimepickerComponent {
  @Input() hour: number | any;
  @Input() minutes: number | any;
  @Output() timeChange = new EventEmitter<{ hour: number, minutes: number }>();

  incrementHour() {
    if (this.hour === 23) return;
    this.hour++;
    this.emitTimeChange();
  }

  decrementHour() {
    if (this.hour === 0) return;
    this.hour--;
    this.emitTimeChange();
  }

  incrementMinutes() {
    if (this.minutes === 59) return;
    this.minutes++;
    this.emitTimeChange();
  }

  decrementMinutes() {
    if (this.minutes === 0) return;
    this.minutes--;
    this.emitTimeChange();
  }

  emitTimeChange() {
    this.timeChange.emit({ hour: this.hour, minutes: this.minutes });
  }

  onTimeChange() {
    if (this.hour < 0) this.hour = 0;
    if (this.hour > 23) this.hour = 23;
    if (this.minutes < 0) this.minutes = 0;
    if (this.minutes > 59) this.minutes = 59;
    this.emitTimeChange();
  }
}

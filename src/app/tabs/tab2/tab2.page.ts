import { Component } from '@angular/core';
import { DataHelperService } from 'src/app/services/data-helper.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { UtilsProviderService } from 'src/app/services/utils-provider.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  allEvents: any = [];
  selectedDayEvents = [];
  selectedDate: string;
  oneDayTimestamp: number = 86400000;
  selectedWeekDates: any = [];
  todaysDate: string;

  startTimeOfSelectedDate: number;
  endTimeOfSelectedDate: number;

  weekdays: any = [
    { fullName: 'Sunday', shortName: 'Sun', number: 0 },
    { fullName: 'Monday', shortName: 'Mon', number: 1 },
    { fullName: 'Tuesday', shortName: 'Tue', number: 2 },
    { fullName: 'Wednesday', shortName: 'Wed', number: 3 },
    { fullName: 'Thursday', shortName: 'Tue', number: 4 },
    { fullName: 'Friday', shortName: 'Fri', number: 5 },
    { fullName: 'Saturday', shortName: 'Sat', number: 6 },
  ];

  constructor(
    public utils: UtilsProviderService,
    public dataHelper: DataHelperService,
    public userAuth: UserAuthService,
  ) { }

  ionViewWillEnter() {
    this.allEvents = this.dataHelper.allEvents;
    this.todaysDate = this.getFormattedDateString(new Date());
    this.getTodaysData();
  }

  getTodaysData() {
    const startTimeOfTodaysDate = Number(new Date().setHours(0, 0, 0));
    this.updateSelectedDateTimestamps(startTimeOfTodaysDate);
  }

  prevWeek() {
    const prevWeekEndDate = Number(new Date(this.startTimeOfSelectedDate)) - this.oneDayTimestamp * 7;
    this.updateSelectedDateTimestamps(prevWeekEndDate);
  }

  nextWeek() {
    const nextWeekStartDate = Number(new Date(this.startTimeOfSelectedDate)) + this.oneDayTimestamp * 7;
    this.updateSelectedDateTimestamps(nextWeekStartDate);
  }

  updateSelectedDateTimestamps(selectedDate: number) {
    this.startTimeOfSelectedDate = Number(new Date(selectedDate).setHours(0, 0, 0));
    this.endTimeOfSelectedDate = Number(new Date(selectedDate).setHours(23, 59, 59));
    this.selectedDate = this.getFormattedDateString(new Date(selectedDate));
    this.updateWeeklyDataset();
  }

  updateWeeklyDataset() {
    this.selectedWeekDates = [];
    for (let i = 0; i < 7; i++) {
      const timestamp = this.startTimeOfSelectedDate - this.oneDayTimestamp * i;
      this.selectedWeekDates.unshift({
        day: new Date(timestamp).getDay(),
        fullDate: this.getFormattedDateString(new Date(timestamp)),
        date: new Date(timestamp).getDate(),
        timestamp: timestamp
      });
    }
    this.updateDisplayData();
  }

  updateSelectedDay(selectedDay: any) {
    this.selectedDate = selectedDay.fullDate;
    this.startTimeOfSelectedDate = Number(new Date(selectedDay.timestamp).setHours(0, 0, 0));
    this.endTimeOfSelectedDate = Number(new Date(selectedDay.timestamp).setHours(23, 59, 59));
    this.updateDisplayData();
  }

  updateDisplayData() {
    this.selectedDayEvents = this.allEvents.filter(x => x.date === this.selectedDate);
    console.log(this.selectedDayEvents);
  }

  hasEvent(fullDate: string): boolean {
    const index = this.allEvents.findIndex(x => x.date === fullDate);
    return index >= 0;
  }

  getDayName(dayNumber: number): string {
    return this.weekdays.filter(x => x.number === dayNumber)[0].shortName;
  }

  getFormattedDateString(date: Date): string {
    return moment(date).format('MM-DD-YYYY');
  }

  getDisplaySelectedDate(): Date {
    return new Date(this.selectedDate);
  }

}

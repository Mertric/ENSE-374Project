import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { NgCalendarModule } from "ionic2-calendar";
import { ToDo } from "../modals/todo";
import { DbServicesService } from "../services/db-services.service";
import { CalendarComponent, IEvent, ITimeSelected } from "ionic2-calendar/calendar";
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements AfterViewInit {
  @ViewChild(CalendarComponent, { static: true })
  aCalandar: CalendarComponent;

  eventSource: IEvent[] = [];

  event = {
    title: " ",
    description: " ",
    startTime: " ",
    endTime: " ",
    allday: false
  };
  // eventSource: ToDo[];
  calendar = {
    mode: "month",
    currentDate: new Date()
  };
  viewTitle = " ";


  constructor(private db: DbServicesService) {}

  ngAfterViewInit() {
    this.eventSource.push({
      title: "test",
      startTime: new Date(Date.UTC(2019, 11, 11)),
      endTime: new Date(Date.UTC(2019, 11, 11)),
      allDay: true
    });
    this.aCalandar.loadEvents();
  }

  onViewTitleChanged(title: string): void {
    this.viewTitle = title;
  }

  setToCurrentDate(): void {
    this.calendar.currentDate = new Date();
  }

  loadEvents(): void {
    this.eventSource.push({
      title: "test",
      startTime: new Date(Date.UTC(2019, 11, 11)),
      endTime: new Date(Date.UTC(2019, 11, 11)),
      allDay: true
    });
    this.aCalandar.loadEvents();
  }

  onEventSelected(event: IEvent) {
    console.log(
      "Event selected:" +
        event.startTime +
        "-" +
        event.endTime +
        "," +
        event.title
    );
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  onTimeSelected(ev: ITimeSelected) {
    const selected = ev.selectedTime;

    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
    console.log('selected', selected)

    // console.log(
    //   "Selected time: " +
    //     ev.selectedTime +
    //     ", hasEvents: " +
    //     (ev.events !== undefined && ev.events.length !== 0) +
    //     ", disabled: " +
    //     ev.disabled
    // );
  }

  onCurrentDateChanged(event: Date) {
    console.log("current date change: " + event);
    this.calendar.currentDate = event;
  }

  onRangeChanged(ev) {
    console.log(
      "range changed: startTime: " + ev.startTime + ", endTime: " + ev.endTime
    );
  }

  isCurrentDate(): boolean {
    return this.calendar.currentDate.getDay() === new Date().getDay();
  }

  // MVP2: read from the database store into event UI
}

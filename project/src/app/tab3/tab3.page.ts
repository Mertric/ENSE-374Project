import { Component, OnInit , ViewChild } from "@angular/core";
import { NgCalendarModule } from "ionic2-calendar";
import { ToDo } from "../modals/todo";
import { DbServicesService } from "../services/db-services.service";
import {
  AngularFirestore,
  DocumentData,
  AngularFirestoreCollection,
  DocumentReference
} from "@angular/fire/firestore";
import {CalendarComponent} from "ionic2-calendar/calendar"
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements OnInit {
  eventSource: ToDo[];

  ngOnInit() {}

  calendar = {
    mode: "month",
    currentDate: new Date()
  };

  constructor(private db: DbServicesService ) {
 
  }

  onViewTitleChanged(title) {
    console.log(title);
  }

  onEventSelected(event) {
    console.log(
      "Event selected:" +
        event.startTime +
        "-" +
        event.endTime +
        "," +
        event.title
    );
  }

changeMode(mode)
{
  this.calendar.mode = mode;
}

  onTimeSelected(ev) {
    console.log(
      "Selected time: " +
        ev.selectedTime +
        ", hasEvents: " +
        (ev.events !== undefined && ev.events.length !== 0) +
        ", disabled: " +
        ev.disabled
    );
  }

  onCurrentDateChanged(event: Date) {
    console.log("current date change: " + event);
  }

  onRangeChanged(ev) {
    console.log(
      "range changed: startTime: " + ev.startTime + ", endTime: " + ev.endTime
    );
  }

}

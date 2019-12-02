import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { NgCalendarModule } from "ionic2-calendar";
import { ToDoModel } from "../modals/todo.model.";
import { DbServicesService } from "../services/db-services.service";
import {
  CalendarComponent,
  IEvent,
  ITimeSelected
} from "ionic2-calendar/calendar";
import {
  AngularFirestore,
  DocumentData,
  AngularFirestoreCollection,
  DocumentReference
} from "@angular/fire/firestore";
import { Observable, BehaviorSubject } from "rxjs";
import { map, take } from "rxjs/operators";


@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"]
})
export class Tab3Page implements AfterViewInit {
  @ViewChild(CalendarComponent, { static: true })
  aCalandar: CalendarComponent;

  // eventSource: ToDo[];
  calendar = {
    mode: "month",
    currentDate: new Date()
  };
  viewTitle = " ";

  private todosCollection: AngularFirestoreCollection<ToDoModel>;
  private dataSource = new BehaviorSubject<ToDoModel[]>([]);
  private todos: Observable<ToDoModel[]> = this.dataSource.asObservable();
  private DATABASE_TODOEVENT = "eventToDoInfo";

  eventSource: {
    title: string,
    startTime: Date,
    endTime: Date,
    allDay: boolean
  }[] = [];

  event = {
    title: "",
    description: "",
    startOf: "",
    endOf: "",
    allday: false
  };
  

  
  constructor(private db: DbServicesService , private eventDB: AngularFirestore) {
    this.eventDB.collection(this.DATABASE_TODOEVENT,ref => ref.where('TypeToDoOrEvent', '==','event')).snapshotChanges().subscribe(colSnap => {
      colSnap.forEach(snap => {
          let event: any = snap.payload.doc.data();
          console.log(snap.payload.doc)
          console.log("this is a test", event);
          event.id = snap.payload.doc.id;
         console.log(event);
         this.eventSource.push(event);
      })
    })
  }

      ngOnInit()
    {
      this.db.getEvents();
    }
  
  ngAfterViewInit() {
    for (let i = 1; i < 31; i++) {
      
      this.eventSource.push({
        title: `test - ${i}`,
        startTime: new Date(Date.UTC(2019, 12, i)),
        endTime: new Date(Date.UTC(2019, 12, i+1)),
        allDay: false
      });
    }
    this.aCalandar.loadEvents();
    console.log('hello wtf', this.aCalandar.eventSource);
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
      allDay: false
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
    this.event.startOf = selected.toISOString(); 
    selected.setHours(selected.getHours() + 1);
    this.event.endOf = selected.toISOString();
   // console.log("selected", selected);  
    //console.log('hello...', ev.events)
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

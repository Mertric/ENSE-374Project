import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentData,
  AngularFirestoreCollection,
  DocumentReference,
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AddEventToDoPage } from "../components/add-event-to-do/add-event-to-do.page";
import { Observable, BehaviorSubject } from "rxjs";
import { map, take } from "rxjs/operators";
import { ToDo } from "../modals/todo";

@Injectable({
  providedIn: "root"
})
export class DbServicesService {
 private todosCollection: AngularFirestoreCollection<ToDo>;
  private dataSource = new BehaviorSubject<ToDo[]>([]);
  private todos: Observable<ToDo[]> = this.dataSource.asObservable();

  private DATABASE_TODOEVENT = "eventToDoInfo";

  constructor(private db: AngularFirestore) {
    //this.todos = this.db.collection(this.DATABASE_TODOEVENT).valueChanges();
    this.todosCollection = db.collection<ToDo>("eventToDoInfo");
    this.todos = this.todosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

   eventToDoInfo(
    eventToDoUUID: string,
    type: string,
    title: string,
    date: string,
    tag: string,
    priority: string,
    description: string,
    eventStartDate: string,
    eventEndDate: string
  ) {
    const dbStore = this.db
      .collection(this.DATABASE_TODOEVENT)
      .doc(eventToDoUUID);
    dbStore.set({
      TypeToDoOrEvent: type,
      titleOf: title,
      dateSpan: date,
      HashTag: tag,
      priorityLevel: priority,
      descriptionOf: description,
      startOf: eventStartDate,
      endOf: eventEndDate
    });
  }

  getTodos() {
    return this.todos;
  }
  getToDo(id) {
    return this.todosCollection.doc<ToDo>(id).valueChanges();
  }
  updateTodo(todo: ToDo, id: string) {
    return this.todosCollection.doc(id).update(todo);
  }

  removeToDo(id) {
    return this.todosCollection.doc(id).delete();
  }
}

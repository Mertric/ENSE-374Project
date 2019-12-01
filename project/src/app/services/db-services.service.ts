import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  DocumentData,
  AngularFirestoreCollection,
  DocumentReference
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AddEventToDoPage } from "../components/add-event-to-do/add-event-to-do.page";
import { Observable, BehaviorSubject } from "rxjs";
import { map, take } from "rxjs/operators";
import { ToDo } from "../modals/todo";
import {ProfileModel} from "../modals/ProfileModel"
import { User } from 'firebase';
@Injectable({
  providedIn: "root"
})
export class DbServicesService {
  /* START OF TODOS */
  private todosCollection: AngularFirestoreCollection<ToDo>;
  private dataSource = new BehaviorSubject<ToDo[]>([]);
  private todos: Observable<ToDo[]> = this.dataSource.asObservable();

  private DATABASE_TODOEVENT = "eventToDoInfo";

  constructor(private db: AngularFirestore , private afAuth: AngularFireAuth) {
    //this.todos = this.db.collection(this.DATABASE_TODOEVENT).valueChanges();
    this.todosCollection = db.collection<ToDo>(this.DATABASE_TODOEVENT, ref =>
      ref.where("TypeToDoOrEvent", "==", "toDo")
    );
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
    eventEndDate: string,
    notificationTime: string
  ) {
    const dbStore = this.db
      .collection(this.DATABASE_TODOEVENT)
      .doc(eventToDoUUID);
    dbStore.set({
      TypeToDoOrEvent: type,
      Title: title,
      dateSpan: date,
      HashTag: tag,
      priorityLevel: priority,
      descriptionOf: description,
      startOf: eventStartDate,
      endOf: eventEndDate,
      notify: notificationTime
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
  /*END OF  TODOS*/

  /*START OF USER METHODS */
  private USER_COLLECTION = "Users";
  userInfoToDB(userID: string, email: string, password: string) {
    const dbStore = this.db.collection(this.USER_COLLECTION).doc(userID);
    dbStore
      .set({ uuid: userID, emailAddress: email, userPassword: password })
      .then(function(data) {
        console.log("User created");
      });
  }

  private _profile$ = new BehaviorSubject<ProfileModel>(null)
  profile$  = this._profile$.asObservable();

  getProfile(userID:string):void{
    const dbStore = this.db.collection(this.USER_COLLECTION).doc(userID);
    dbStore.get().subscribe(data => {
      if(data.exists){
        const documentData: DocumentData = data.data();
        console.log(documentData);
        this._profile$.next(documentData as ProfileModel)
      }
    })
  }

  isLoggedIn():
    Observable<User>
    {
      return this.afAuth.authState;
    }

  /* END OF USER METHODS */

  /* START OF EVENTS METHODS */
  getEvents() {
    let eventRef = this.db.collection(this.DATABASE_TODOEVENT);
    let queryEvent = eventRef.ref
      .where("TypeToDoOrEvent", "==", "event")
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No Events");
          return;
        }
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
        });
      })
      .catch(err => {
        console.log("Error getting Documents");
      });

    return queryEvent;
  }

  // listenToDBEvents(eventSource:any)
  // {
  //   this.db.collection(this.DATABASE_TODOEVENT,ref => ref.where('TypeToDoOrEvent', '==','event')).snapshotChanges().subscribe(colSnap => {
  //     eventSource = [];
  //     colSnap.forEach(snap => {
  //       let event: any = snap.payload.doc.data();
  //       event.id = snap.payload.doc.id;
  //       event.startTime = event.startTime.toDate()
  //       event.startTime = event.endTime.toDate();
  //       console.log(event);
  //       eventSource.push(event);
  //     })
  //   })

  //}
}

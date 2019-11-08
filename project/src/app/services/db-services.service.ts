import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {AddEventToDoPage} from '../components/add-event-to-do/add-event-to-do.page';
import {observable} from 'rxjs'
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbServicesService {
private DATABASE_TODOEVENT = 'eventToDoInfo'
  constructor( private db: AngularFirestore) { }

  eventToDoInfo(eventToDoUUID:string , type:string , title:string , date:string , tag:string , priority:string, description:string, startDate:string, endDate:string)
  {
    const dbStore = this.db.collection(this.DATABASE_TODOEVENT).doc(eventToDoUUID);
    dbStore.set({
      TypeToDoOrEvent:type,
      titleOf:title,
      dateSpan: date,
      HashTag: tag,
      priorityLevel: priority,
      descriptionOf : description,
      startOf: startDate,
      endOf: endDate
    })
}



}
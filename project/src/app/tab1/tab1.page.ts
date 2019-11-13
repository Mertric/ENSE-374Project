import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { DbServicesService } from "../services/db-services.service";
import { ToDo } from "../modals/todo";
import { Observable, BehaviorSubject } from "rxjs";
import {
  AngularFirestore,
  DocumentData,
  AngularFirestoreCollection,
  DocumentReference
} from "@angular/fire/firestore";
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  todos: ToDo[];

  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private db: DbServicesService,
    private afs: AngularFirestore
  ) {}

  ngOnInit() {
    this.db.getTodos().subscribe(res => {
      console.log(res);

      this.todos = res;
    });
  }
  remove(item) {
    this.db.removeToDo(item.id);
  }
}

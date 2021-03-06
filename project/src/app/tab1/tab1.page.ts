import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { DbServicesService } from "../services/db-services.service";
import { ToDoModel } from "../modals/todo.model.";
import { Observable, BehaviorSubject } from "rxjs";
import {
  AngularFirestore,
  DocumentData,
  AngularFirestoreCollection,
  DocumentReference
} from "@angular/fire/firestore";
import { Router } from '@angular/router';
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  todos: ToDoModel[];

  constructor(
    private nav: NavController,
    private modalController: ModalController,
    private db: DbServicesService,
    private afs: AngularFirestore,
    private route: Router
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

  navigateToLogin(){
    this.route.navigateByUrl('/tabs/login');
  }
  //MVP2: function to route to detail page --> use getToDo() to get single selected toDo 
}

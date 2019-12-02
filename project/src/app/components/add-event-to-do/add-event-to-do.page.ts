import { Component, OnInit, Input } from "@angular/core";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  Form
} from "@angular/forms";
import { DbServicesService } from "../../services/db-services.service";
import { ModalController } from "@ionic/angular";
import { AngularFireAuth } from "@angular/fire/auth";

declare var require: any;

@Component({
  selector: "app-add-event-to-do",
  templateUrl: "./add-event-to-do.page.html",
  styleUrls: ["./add-event-to-do.page.scss"]
})
export class AddEventToDoPage implements OnInit {
  form: FormGroup = this.buildForm();
  errors: any;
  toDoSelected: boolean;
  isActive: boolean = false;

  constructor(
    private fb: FormBuilder,
    private db: DbServicesService,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  selectType() {
    let options = this.form.get("type").value;
    this.toDoSelected = true;
    if (options == "toDo") {
      this.toDoSelected = true;
    } else {
      this.toDoSelected = false;
    }
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
  //NEEED to add two seperate add functions --> one for todo and one for event
  // remake the database push function --> calendar

  uuidv4 = require("uuid/v4");
  async add() {
    console.log(this.afAuth.auth)
    //const userId = this.afAuth.auth.currentUser ? this.afAuth.auth.currentUser.uid : this.db.getCurrentUser();
    const postId = this.uuidv4.value;
    const type = this.form.get("type").value as string;
    const title = this.form.get("title").value as string
    const date = this.form.get("date").value as string;
    const tag = this.form.get("tag").value as string;
    const priority = this.form.get("priority").value as string;
    const description = this.form.get("description").value as string;
    const startDate = this.form.get("startDate").value as string;
    const endDate = this.form.get("endDate").value as string;
    const setNotiTime = this.form.get("setNotiTime").value as string;
    //console.log("this" ,postId)
    this.db.eventToDoInfo(
      postId,
      //userId,
      type,
      title,
      date,
      tag,
      priority,
      description,
      startDate,
      endDate,
      setNotiTime
    );
    this.form.reset();
  }

  buildForm(): FormGroup {
    return this.fb.group({
      type: ["todo", [Validators.required, Validators.minLength(5)]],
      title: ["a", [Validators.required, Validators.minLength(5)]],
      date: ["2019/12/12", [Validators.required]],
      tag: ["a", [Validators.required, Validators.minLength(5)]],
      priority: [3, [Validators.required, Validators.minLength(1)]],
      description: ["asd", [Validators.required, Validators.minLength(0)]],
      startDate: ["2019/12/12", [Validators.required]],
      endDate: ["2019/12/12", [Validators.required]],
      setNotiTime: ["2019/12/12", [Validators.required]]
    });
  }
}

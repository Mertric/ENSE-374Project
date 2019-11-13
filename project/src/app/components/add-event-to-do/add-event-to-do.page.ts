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
declare var require: any;
@Component({
  selector: "app-add-event-to-do",
  templateUrl: "./add-event-to-do.page.html",
  styleUrls: ["./add-event-to-do.page.scss"]
})
export class AddEventToDoPage implements OnInit {
  form: FormGroup = this.buildForm();
  errors: any;

  constructor(
    private fb: FormBuilder,
    private db: DbServicesService,
    private modalCtrl: ModalController
  ) {}
  toDoSelected: boolean;

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

  ngOnInit() {}
  uuidv4 = require("uuid/v4");
  async add() {
    const type = this.form.get("type").value as string;
    const title = this.form.get("title").value as string;
    const date = this.form.get("date").value as string;
    const tag = this.form.get("tag").value as string;
    const priority = this.form.get("priority").value as string;
    const description = this.form.get("description").value as string;
    const startDate = this.form.get("startDate").value as string;
    const endDate = this.form.get("endDate").value as string;

    this.db.eventToDoInfo(
      this.uuidv4(),
      type,
      title,
      date,
      tag,
      priority,
      description,
      startDate,
      endDate
    );
    this.form.reset();


  }
  buildForm(): FormGroup {
    return this.fb.group({
      type: ["", [Validators.required, Validators.minLength(0)]],
      title: ["", [Validators.required, Validators.minLength(0)]],
      date: ["", [Validators.required]],
      tag: ["", [Validators.required, Validators.minLength(0)]],
      priority: ["", [Validators.required, Validators.minLength(0)]],
      description: ["", [Validators.required, Validators.minLength(0)]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]]
    });
  }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AddEventToDoPage } from "./add-event-to-do.page";

const routes: Routes = [
  {
    path: "",
    component: AddEventToDoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [AddEventToDoPage],
  exports: [ReactiveFormsModule]
})
export class AddEventToDoPageModule {}

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
import {AngularFireAuth} from '@angular/fire/auth';
import {from} from 'rxjs'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup = this.buildForm();
  error: any;
  constructor(private db:DbServicesService , private fb:FormBuilder , private afAuth: AngularFireAuth) { }


  ngOnInit() {
  }


  async signup(){
    const email = this.form.get("email").value as string;
    const password = this.form.get("password").value as string;
    const confirmPassword = this.form.get("Cpassword").value as string;
    if(password != confirmPassword)
    {
      this.error = "Passwords do not match";
    }
    else {
   from(this.afAuth.auth.createUserWithEmailAndPassword(email,password)).subscribe(cred => {
     const UserID = cred.user.uid;
     this.db.userInfoToDB(UserID,email,password)} ,(errors:any) => { this.error= errors});


  }
}

  buildForm(): FormGroup {
    return this.fb.group({
      email: ["", [Validators.required, Validators.minLength(255)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", [Validators.required] ]
    });
  }
}

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
import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup = this.buildForm();
  error: any;
  constructor(private db:DbServicesService , private fb:FormBuilder , private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  login()
  {
    const email = this.form.get('email').value as string;
    const password = this.form.get('password').value as string;
    from(this.afAuth.auth.signInWithEmailAndPassword(email,password)).subscribe(data => {
      console.log(data);
      this.router.navigateByUrl('tab1');
    },(errors: any ) => {
      this.error = errors;
    });
  }

  buildForm(): FormGroup {
    return this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }
}

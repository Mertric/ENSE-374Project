import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import{AngularFireAuth} from '@angular/fire/auth'
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {

  constructor(private router: Router , private afAuth: AngularFireAuth, private menu: MenuController) { }

  

  ngOnInit() {}
  isAuthorized():boolean {
    if(this.afAuth.auth.currentUser)
    {
      return true;
    }
    return false
  }

  openFirst() {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }

  openEnd() {
    this.menu.open('end');
  }
  
  logout(){
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigateByUrl('tab1')
    });
  }

}

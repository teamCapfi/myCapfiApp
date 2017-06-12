import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';


@IonicPage({
  name : 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public user : UserProvider, public auth : AuthProvider) {

  }



}

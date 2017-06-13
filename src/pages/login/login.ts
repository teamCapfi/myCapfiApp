import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider, public events : Events) {

  }

  listenToLogEvents(){
    this.events.subscribe('user:loggin',()=>{
      this.navCtrl.setRoot('HomePage');
    })
  }


  ionViewDidEnter(){
    this.auth.login();
  }

}

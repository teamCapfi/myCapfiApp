import { AuthProvider } from './../../providers/auth/auth';
import { UserProvider } from './../../providers/user/user';
import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Content } from 'ionic-angular';


@IonicPage({
  name : 'HomePage'
})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content : Content;
  constructor(public navCtrl: NavController, public user : UserProvider, public auth : AuthProvider) {

  }

  ionViewDidEnter(){
    console.log('auiq');
    this.content.resize();
  }



}

import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';
import Auth0 from 'auth0-js';
import { auth0Vars, optionsLock } from "../../environment/auth0/config";
import { Platform, Events } from 'ionic-angular';
import { UserProvider } from "../user/user";

declare var Auth0Lock: any;

@Injectable()
export class AuthProvider {

  private authState: Observable<firebase.User>;
  private currentUser: firebase.User;

  public auth0 = new Auth0({
    clientID: auth0Vars.AUTH0_CLIENT_ID,
    domain: auth0Vars.AUTH0_DOMAIN
  });


  //Creating new Auth0 lock widget
  public lock = new Auth0Lock(auth0Vars.AUTH0_CLIENT_ID, auth0Vars.AUTH0_DOMAIN, optionsLock);
  private _zone : NgZone;

  constructor(
    public afAuth: AngularFireAuth,
    private _user: UserProvider,
    public _platform: Platform,
    public events: Events) {

      this._zone = new NgZone({});
    this.authState = afAuth.authState;

    afAuth.auth.onAuthStateChanged((user) => {
      this._zone.run(()=>{
        console.log("onAuthChanged", user);
        this.currentUser = user;
        this.isAuthenticated ? this.loggedIn() : this.loggedOut();
      })

    });
    this._onLockEvents();
  }


  private _initUserService() {
    this._user.getUserData(this.currentUser.uid);
  }

  get isAuthenticated(): boolean {
    if (this.currentUser !== undefined && this.currentUser !== null) {
      this._initUserService();
      return true
    }
    else {
      return false;
    }
  }

  private _onLockEvents(): void {
    //if authentification is a success from the Auth0 side, this event is triggered
    this.lock.on('authenticated', (authResult) => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) return;
        this._firebaseAuthentication(authResult.idToken);
      });
    });

    //Event triggered when the authorization failed from the Auth0 side.
    this.lock.on('authorization_error', (error) => {
      console.log("Authorization error", error);
    })
  }


  private _firebaseAuthentication(idToken: string) {
    const options = {
      id_token: idToken,
      api: 'firebase',
      scope: 'openid profile email',
      target: auth0Vars.AUTH0_CLIENT_ID
    };
    //getDelegationToken is used to retrieve a delegation token that will allow the user to log in the firebase system
    this.auth0.getDelegationToken(options, (err, result) => {
      if (!err) {
        //login to firebase with the custom method and the delegation token i.e result.id_token
        this.afAuth.auth.signInWithCustomToken(result.id_token).then((data) => {
          this.lock.hide();
        }).catch((err) => {
          console.log("Erreur when log in the firebase system with the delegation Token", err);
        })
      }
    });
  }

  //Publish an event across the app that the user is loggedin
  loggedIn() {
    this.events.publish('user:loggin');
  }

  loggedOut(){
    this.events.publish('user:loggout');
  }

  //display the lock widget from Auth0
  public login(): void {
    this.lock.show();
  }

  //logout the user from firebase
  public logout(): void {
    this.afAuth.auth.signOut().then(() => {
      console.log("Successfully signed out");
    }).catch((err) => {
      console.log("Error when signing out", err);
    })
  }


}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/map';


@Injectable()
export class UserProvider {

  private _name: string = '';
  private _uid: string = '';
  private _picture: string = '';
  private _createAt: string = '';
  private _provider: string = '';
  private _key: string = '';
  private _nickname: string = '';

  constructor(private _afD : AngularFireDatabase) {

  }

  set key(uid: string) {
    this._key = btoa(uid);
  }

  get key(): string {
    return this._key;
  }

  set name(username: string) {
    this._name = username;
  }

  set uid(useruid: string) {
    this._uid = useruid;
  }

  set nickname(nickname: string) {
    this._nickname = nickname;
  }

  get nickname(): string {
    return this._nickname;
  }

  set picture(picture: string) {
    this._picture = picture;
  }

  get picture(): string {
    return this._picture;
  }

  set provider(provider: string) {
    this._provider = provider;
  }

  get provider(): string {
    return this._provider;
  }

  set createdAt(createdAt) {
    this._createAt = createdAt;
  }

  get createdAt() {
    return this._createAt;
  }

  get uid(): string {
    return this._uid;
  }

  get name(): string {
    return this._name;
  }

  getUserData(uid) {
    this._key = btoa(uid);
    this._afD.object('/users/' + this.key).$ref.once('value').then((snapshot) => {
      this.name = snapshot.val().identity.name;
      this.uid = uid;
      this.picture = snapshot.val().identity.picture;
      this.provider = snapshot.val().identity.connection;
      this.nickname = snapshot.val().identity.nickname;
    })
  }

}

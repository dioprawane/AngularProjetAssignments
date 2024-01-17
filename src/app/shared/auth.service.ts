import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any = null;
  private userSubject = new BehaviorSubject<User | null>(null);
  userObservable$ = this.userSubject.asObservable();

  users : User[] = [
    {login: 'user1', password: 'password1', role: 'user'},
    {login: 'admin', password: 'passwordAdmin', role: 'admin'}
  ];  

  constructor() {
    // Vérifier si l'utilisateur est stocké dans le localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.userSubject.next(this.currentUser);
      this.loggedIn = true;
    }

   }

  loggedIn = false;

  authenticate(login: string, password: string): boolean {
    const user = this.users.find(u => u.login === login && u.password === password);
    if (user) {
      this.currentUser = user;
      this.loggedIn = true;
      this.userSubject.next(this.currentUser);
      // Stocker l'utilisateur dans le localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));

      return true;
    } else {
      this.currentUser = null;
      this.userSubject.next(this.currentUser);
      return false;
    }
  }

  getCurrentUser() {
    console.log("currentUser de auth.service : ", this.currentUser);
    return this.currentUser;
  }

  logIn(login: string, password: string) {
    const user = this.findUser(login, password);
    if (user) {
      this.currentUser = user;
      this.loggedIn = true;
    }
  }

  logOut() {
    this.currentUser = null;
    this.loggedIn = false;
    this.userSubject.next(this.currentUser); // Émet une mise à jour avec le currentUser à null.

    // Supprimer l'utilisateur du localStorage
    localStorage.removeItem('currentUser');
  }

  isLogged() {
    return this.loggedIn;
  }

  isAdmin() {
    return this.loggedIn && this.currentUser.role === 'admin';
  }

  isConnected() {
    return (this.loggedIn && this.currentUser.role === 'admin') || (this.loggedIn && this.currentUser.role === 'user');
  }

  findUser(login: string, password: string) {
    for (const user of this.users) {
      if (user.login === login && user.password === password) {
        return user;
      }
    }
    return null;
  }

  

}
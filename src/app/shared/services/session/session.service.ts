import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() {}

  addSession(user_id: string) {
    sessionStorage.setItem("CurrentSession", user_id);
  }

  getSession() {
    return sessionStorage.getItem("CurrentSession");
  }

  removeSession() {
    sessionStorage.removeItem("CurrentSession");
  }
}

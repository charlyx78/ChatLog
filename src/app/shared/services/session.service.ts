import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Session {
  current_session: any;

  constructor(
    private firestore:AngularFirestore,
  ) {
    this.current_session = sessionStorage.getItem('CurrentSession');
  }

  getCurrentSession(): any {
    return this.current_session;
  }

  public setCurrentSession(user_id: any) {
    this.current_session = user_id;
    sessionStorage.setItem("CurrentSession", this.current_session);
  }

  deleteCurrentSession() {
    this.current_session = null;
    sessionStorage.removeItem("CurrentSession");
  }

  private async getUserData(user_id: any): Promise<any> {
    try {
      return new Promise<any>((resolve, reject) => {
        let user_data: any;
        const subscription = this.firestore.collection('Usuarios').doc(user_id).valueChanges().subscribe({
          next: (user_returned) => {
            user_data = user_returned;
            this.current_session = user_data; 
          },
          error: (err) => {
            subscription.unsubscribe();
            reject(err); 
          },
          complete: () => {
            subscription.unsubscribe();
            resolve(user_data); 
          }
        });
      });
    } 
    catch (exc) {
      console.error('Error al obtener los datos del usuario:', exc);
      throw exc;
    }
  }
}
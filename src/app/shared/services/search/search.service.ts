import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private fireStore: AngularFirestore
  ) { }

  searchUser(username: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireStore.collection("Usuarios").ref.where("username", "==", username).get()
      .then((querySnapshot) => {
        if(!querySnapshot.empty){
          querySnapshot.forEach(user => {
            resolve({
              "id": user.id,
              "object": user.data()
            });
          })
        }
        else {
          resolve(null);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(null);
      });   
    })
  }
}

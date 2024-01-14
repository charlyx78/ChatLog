import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FriendRequest } from '../../models/FriendRequest';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  public friend_request: FriendRequest;

  constructor(
    private fireStore: AngularFirestore
  ) { 
    this.friend_request = new FriendRequest("","","", new Date())
  }

  sendFriendRequest(user_id_sender: string, user_id_receiver: string) {
    return new Promise<boolean>(async (resolve, reject) => {
        this.fireStore.collection("SolicitudesDeAmistad").doc().set(
        {
          user_id_sender: user_id_sender,
          user_id_receiver: user_id_receiver,
          friend_request_status: "Pending",
          friend_request_date: new Date()
        }, {merge: true})
        .then((response) => {
          console.log(response)
          alert("¡Solicitud de amistad enviada!");
          resolve(true);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
          reject(false);
        });
    })
  }

  friendRequestExists(user_id_sender: string, user_id_receiver: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireStore.collection("SolicitudesDeAmistad").ref
        .where("user_id_sender", "==", user_id_sender)
        .where("user_id_receiver", "==", user_id_receiver)
        .get()
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const friend_request_object = querySnapshot.docs.map(doc => doc.data());
            resolve({
              "exists": true,
              "object": friend_request_object
            });
          } 
          else {
            this.fireStore.collection("SolicitudesDeAmistad").ref
              .where("user_id_sender", "==", user_id_receiver)
              .where("user_id_receiver", "==", user_id_sender)
              .get()
              .then((inverseQuerySnapshot) => {
                if (!inverseQuerySnapshot.empty) {
                  const friend_request_object = inverseQuerySnapshot.docs.map(doc => doc.data());
                  resolve({
                    "exists": true,
                    "object": friend_request_object
                  });
                } 
                else {
                  resolve({
                    "exists": false
                  });
                }
              })
              .catch((error) => {
                reject(error);
              });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  serializeFriendRequest(friend_request: FriendRequest) {
    return {
      "user_id_sender": friend_request.user_id_sender,
      "user_id_receiver": friend_request.user_id_receiver,
      "friend_request_status": friend_request.friend_request_status,
      "friend_request_date": friend_request.friend_request_date
    }
  }
}

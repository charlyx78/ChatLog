import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FriendRequest } from '../../models/FriendRequest';
import { Friend } from '../../models/Friend';
import { query } from '@angular/animations';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  public friend_request: FriendRequest;

  constructor(
    private fireStore: AngularFirestore
  ) { 
    this.friend_request = new FriendRequest("", "","","", new Date())
  }

  sendFriendRequest(user_id_sender: any, user_id_receiver: any) {
    return new Promise<boolean>(async (resolve, reject) => {
        this.fireStore.collection("SolicitudesDeAmistad").doc().set(
        {
          user_id_sender: user_id_sender,
          user_id_receiver: user_id_receiver,
          friend_request_status: "Pending",
          friend_request_date: new Date()
        }, {merge: true})
        .then((response) => {
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

  acceptFriendRequest(friend_request_id: any, user_id_sender: any, user_id_receiver: any) {
    this.fireStore.collection("SolicitudesDeAmistad").doc(friend_request_id).update({
      friend_request_status: "Accepted"
    })
    this.friendRequestExists(user_id_sender, user_id_receiver).pipe(take(1)).subscribe((response) => {
      if(response[0]) {
        let friend_request: any = response[0];
        let friend = new Friend("", friend_request.user_id_sender, friend_request.user_id_receiver, "Friends",  new Date());
        this.fireStore.collection("Amigos").doc().set(this.serializeFriend(friend)).then(() => {
          return(true);
        }), {merge: true};
      }
    })          
  }

  getFriendShipData(user_id_1: any, user_id_2: any) {
    return new Promise<any>(async (resolve, reject) => {
      this.fireStore.collection("Amigos").ref
      .where("user_id_1", "in", [user_id_1, user_id_2])
      .where("user_id_2", "in", [user_id_1, user_id_2])
      .get()
      .then(querySnapshot => {
        if(!querySnapshot.empty) {
          let friendship_request_object = querySnapshot.docs.map(doc => {
            return { 
              data: doc.data() 
            };
          });
          resolve(friendship_request_object[0]);
        }
      })
    })
  }

  friendRequestExists(user_id_sender: any, user_id_receiver: any): Observable<any> {
    return this.fireStore.collection("SolicitudesDeAmistad", ref =>
        ref.where("user_id_sender", "in", [user_id_sender, user_id_receiver])
           .where("user_id_receiver", "in", [user_id_sender, user_id_receiver])
    )
    .valueChanges({ idField: 'id' });
  }

  serializeFriendRequest(friend_request: FriendRequest) {
    return {
      "user_id_sender": friend_request.user_id_sender,
      "user_id_receiver": friend_request.user_id_receiver,
      "friend_request_status": friend_request.friend_request_status,
      "friend_request_date": friend_request.friend_request_date
    }
  }

  serializeFriend(friend: Friend) {
    return {
      "user_id_1": friend.user_id_1,
      "user_id_2": friend.user_id_2,
      "status": friend.status,
      "registration_date": friend.registration_date
    }
  }
}

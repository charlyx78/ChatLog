import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Observable, from, merge } from 'rxjs';

import { SessionService } from '../session/session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private storagePath:string = "user_pictures/"

  constructor(
    private fireAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private session_service: SessionService
  ) { }

  public addUser(user: User, password: string) {
    return new Promise<boolean>(async (resolve, reject) => {

      let username_exists = await this.usernameExists(user.username);
      if(!username_exists) {
        this.fireAuth.createUserWithEmailAndPassword(user.email, password)
          .then((userRegistrated) => {
            let current_dateTime = new Date();
            user.registration_date = current_dateTime;
  
            this.fireStore.collection("Usuarios").doc(userRegistrated.user?.uid).set(this.serializeUser(user), {merge: true});
            alert("¡Usuario registrado exitosamente!");
            resolve(true);
          })
          .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
            resolve(false);
          });
      }
      else {
        alert("Nombre de usuario ya existente. por favor, intenta con otro.")
      }
    })
  }

  public addUserPicture(file: any) {
    return new Promise<string>((resolve,reject) => {
      if(file) {
        this.fireStorage.ref(this.storagePath + file.name).put(file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve(downloadURL);
          })
        })
      }
    })
  }

  public usernameExists(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.fireStore.collection("Usuarios").ref.where("username", "==", username).get()
      .then((user) => {
        if(!user.empty){
          resolve(true);
        }
        else {
          resolve(false);
        }
      })
      .catch((error) => {
        console.log(error);
        resolve(false);
      });   
    })
  }

  public login(email:string, password: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        if(email != "" && password != "") {
          this.fireAuth.signInWithEmailAndPassword(email, password)
            .then((userLoged) => {
                let user_id: any = userLoged.user?.uid;
                this.session_service.addSession(user_id);
                alert("¡Sesión iniciada, bienvenid@!");            
                resolve({
                  'is_user_logged': true,
                  'user_id': user_id
                });
            })
            .catch((error) => {
                const error_code = error.code;
                switch(error_code) {
                case "auth/invalid-email":
                    alert("Por favor, asegurate de introducir un correo electrónico válido.");
                    break;
                case "auth/invalid-login-credentials":
                    alert("Correo electrónico o contraseña incorrectos. Por favor, inténtalo de nuevo.");
                    break;
                case "auth/too-many-requests":
                    alert("Has intentado iniciar sesión demasiadas veces. Por favor, inténtalo más tarde.");
                    break;
                }
                resolve({
                  'is_user_logged': false,
                  'user_id': ''
                });
            })
        }
        else {
          alert("Llena todos los campos para iniciar sesión.");
          resolve({
            'is_user_logged': false,
            'user_id': ''
          });
        }
    })
  }

  public getUserById(user_id: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireStore.collection("Usuarios").doc(user_id).get().subscribe((user)=> {
        resolve({id: user.id, object: user.data()});
      });
    }) 
  }

  public updateUser(user_id: string, user: User) {
    return new Promise<boolean>((resolve, reject) => {
      this.fireStore.collection("Usuarios").doc(user_id).update(user) 
        .then((success) => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  public updateUserPicture(user_id: string, file_path: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.fireStore.collection("Usuarios").doc(user_id).update({"user_picture": file_path}) 
        .then((success) => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  public setUserStatusConnection(user_id: string, status_connection: string) {
    return new Promise<boolean>((resolve, reject) => {
      this.fireStore.collection("Usuarios").doc(user_id).update({"status_connection": status_connection}) 
        .then((success) => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        })
    })
  }

  public serializeUser(user: User) {
      return {
          name: user.name,
          last_name: user.last_name,
          birth_date: user.birth_date,
          gender: user.gender,
          username: user.username,
          email: user.email,
          user_picture: user.user_picture,
          status_connection: user.status_connection,
          registration_date: user.registration_date        
      }
  }
}

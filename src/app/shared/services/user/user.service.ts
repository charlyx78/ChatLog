import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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

  public addUser(user: User) {
    return new Promise<boolean>((resolve, reject) => {
      if(
        user.name != "" &&
        user.last_name != "" &&
        user.birth_date != null &&
        user.gender != "" &&
        user.username != "" &&
        user.email != "" &&
        user.password != "" 
      ) {
        this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
          .then((userRegistrated) => {
            let current_dateTime = new Date();
            user.registration_date = current_dateTime;

            this.fireStore.collection("Usuarios").doc(userRegistrated.user?.uid).set(this.serializeUser(user));
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
        alert("Llena todos los campos para registrarte.");
        resolve(false);
      }
    })
  }

  public addUserPicture(file: any) {
    return new Promise<string>((resolve,reject) => {
      if(file) {
        this.fireStorage.ref(this.storagePath + file.name).put(file).then((snapshot) => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve(downloadURL);
          })
        });
      }
    })
  }

  public login(email:string, password: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        if(email != "" && password != "") {
          this.fireAuth.signInWithEmailAndPassword(email, password)
            .then((userLoged) => {
                let user_id: any = userLoged.user?.uid;
                this.session_service.addSession(user_id);
                alert("¡Sesión iniciada, bienvenid@!");            
                resolve(true);
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
                resolve(false);
            })
        }
        else {
          alert("Llena todos los campos para iniciar sesión.");
          resolve(false);
        }
    })
  }

  public getUserById(user_id: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireStore.collection("Usuarios").doc(user_id).get().subscribe((user)=> {
        resolve(user.data());
      });
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
          password: user.password,
          user_picture: user.user_picture,
          registration_date: user.registration_date        
      }
  }
}

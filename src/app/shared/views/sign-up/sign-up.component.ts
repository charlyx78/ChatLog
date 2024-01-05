import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public new_user: any;

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.new_user = {
      "name": "",
      "last_name": "",
      "birth_date": "",
      "username": "",
      "email": "",
      "password": "",
      "user_picture": ""
    };
  }

  public signUp(form: any) {
    if(
      this.new_user.name != "" &&
      this.new_user.last_name != "" &&
      this.new_user.birth_date != "" &&
      this.new_user.username != "" &&
      this.new_user.email != "" &&
      this.new_user.password != "" 
    ) {
      this.fireAuth.createUserWithEmailAndPassword(this.new_user.email, this.new_user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.fireStore.collection('Usuarios').add({user:this.new_user});
          alert("Usuario registrado: " + user);
          form.reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
    else {
      alert("Llena todos los campos para registrarte.");
    }
  }

  ngOnInit(): void {
  }

}

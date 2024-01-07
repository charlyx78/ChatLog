import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from 'src/app/models/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public new_user: any;

  constructor(private fireAuth: AngularFireAuth, private fireStore: AngularFirestore) {
    this.new_user = new User("","","","","","","","","");
  }

  public signUp(form: any) {
    if(
      this.new_user.name != "" &&
      this.new_user.last_name != "" &&
      this.new_user.birth_date != "" &&
      this.new_user.gender != "" &&
      this.new_user.username != "" &&
      this.new_user.email != "" &&
      this.new_user.password != "" 
    ) {
      this.fireAuth.createUserWithEmailAndPassword(this.new_user.email, this.new_user.password)
        .then((userRegistrated) => {
          let current_dateTime = new Date();
          this.new_user.registration_date = current_dateTime;

          this.fireStore.collection("Usuarios").doc(userRegistrated.user?.uid).set(this.new_user.toJSON());
          alert("¡Usuario registrado exitosamente!");
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

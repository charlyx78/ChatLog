import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from '../../models/User';

import { Session } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public new_user: any;
  public current_session: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private fireAuth: AngularFireAuth, 
    private fireStore: AngularFirestore,
    private session_service: Session
  ) {
    this.new_user = new User("","","","","","","","","");
    this.current_session = this.session_service.getCurrentSession();
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
          const errorMessage = error.message;
          alert(errorMessage);
        });
    }
    else {
      alert("Llena todos los campos para registrarte.");
    }
  }

  ngOnInit(): void {
    if(this.current_session) {
      this._router.navigate(['/Home']);
    }
  }

}

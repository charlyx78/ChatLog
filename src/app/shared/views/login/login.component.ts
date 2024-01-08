import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/User';
import { Session } from 'src/app/shared/services/session.service';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;
  public current_session: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private fireAuth: AngularFireAuth,
    private session_service: Session
  ) {
    this.user = new User("","","","","","","","","");
    this.current_session = this.session_service.getCurrentSession();
  }

  public login() {
    if(this.user.email != "" && this.user.password != "") {
      this.fireAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((userLoged) => {
        let user_id: any = userLoged.user?.uid;
        this.session_service.setCurrentSession(user_id);
        alert("¡Sesión iniciada, bienvenid@!");
        this._router.navigate(['/Home']);
        
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
      })
    }
    else {
      alert("Llena todos los campos para iniciar sesión.");
    }
  }

  ngOnInit(): void {
    if(this.current_session) {
      this._router.navigate(['/Home']);
    }
  }
}

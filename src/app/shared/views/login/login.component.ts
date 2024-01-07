import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private fireAuth: AngularFireAuth
  ) {
    this.user = {
      "email": "",
      "password": ""
    }
  }

  public login() {
    if(this.user.email != "" && this.user.password != "") {
      this.fireAuth.signInWithEmailAndPassword(this.user.email, this.user.password)
      .then((userLoged) => {
        let user_id: any = userLoged.user?.uid;
        sessionStorage.setItem("CurrentSession", user_id);
        alert("¡Sesión iniciada, bienvenid@!");
        this._router.navigate(['/Home']);
      })
      .catch((error) => {
        alert("Ocurrió un error al intentar iniciar sesión." + error);
      })
    }
    else {
      alert("Llena todos los campos para iniciar sesión.");
    }
  }

  ngOnInit(): void {
  }
}

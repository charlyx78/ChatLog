import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';

import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public new_user: User;
  public current_session: any;
  public date: Date = new Date();
  protected password:  any;
  protected confirmed_password:  any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private user_service: UserService,
    private session_service: SessionService
  ) {
    this.current_session = this.session_service.getSession();
    this.new_user = new User("","",this.date,"","","","","Desconectado",this.date);
    this.password = "";
    this.confirmed_password = "";
  }

  async signUp(form: any) {
    try {
      if(
        this.new_user.name != "" &&
        this.new_user.last_name != "" &&
        this.new_user.birth_date != null &&
        this.new_user.gender != "" &&
        this.new_user.username != "" &&
        this.new_user.email != "" &&
        this.password != "" && this.password == this.confirmed_password 
      ) {
        if(this.new_user.user_picture) {
          this.new_user.user_picture = await this.user_service.addUserPicture(this.new_user.user_picture);
        }
        let is_user_registrated: boolean = await this.user_service.addUser(this.new_user, this.password);
        if(is_user_registrated) {
          form.reset();
          this._router.navigate(['/Login']);
        }       
      }
      else {
        alert("Llena todos los campos correctamente para continuar.");
      }
    }
    catch(error) {
      alert(error);
    }
  }

  selectedUserPicture(event: any) {
    const user_picture: File = event.target.files[0];
    this.new_user.user_picture = user_picture;
  }

  ngOnInit(): void {
    if(this.current_session) {
      this._router.navigate(['/Home']);
    }
  }

}

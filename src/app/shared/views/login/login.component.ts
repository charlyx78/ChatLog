import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../models/User';
import { UserService } from '../../services/user/user.service';

import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public user: any;
  public current_session: any;
  public date: Date = new Date();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private user_service: UserService,
    private session_service: SessionService
  ) {
    this.user = new User("","",this.date,"","","","","",this.date);
    this.current_session = this.session_service.getSession();
  }

  async login() {
    try {
      let is_user_loged: boolean = await this.user_service.login(this.user.email,this.user.password);
      if(is_user_loged) this._router.navigate(['/Home']);
    }
    catch(error) {
      alert(error);
    }
  }

  ngOnInit(): void {
    if(this.current_session) {
      this._router.navigate(['/Home']);
    }
  }
}

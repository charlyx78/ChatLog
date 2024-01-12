import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public current_session: any;
  public user_logged: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private user_service: UserService,
    private session_service: SessionService
  ) {
    this.current_session = this.session_service.getSession();
    this.user_service.getUserById(this.current_session).then((user) => {
      this.user_logged = user;
    });
  }

  public logOut() {
    this.user_service.setUserStatusConnection(this.current_session, "Disconnected");
    this.session_service.removeSession();
    this._router.navigate(['/Login']);
  }

  ngOnInit(): void {
  }

}

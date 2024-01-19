import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { SessionService } from '../../services/session/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public current_session: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private user_service: UserService,
    private session_service: SessionService
  ) { 
    this.current_session = this.session_service.getSession();
  }

  ngOnInit(): void {
    if(!this.current_session) {
      this._router.navigate(['/Login']);
    }
  }

  ngOnDestroy(): void {
      this.session_service.removeSession();
  }

}

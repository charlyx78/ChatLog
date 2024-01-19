import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { SessionService } from '../../services/session/session.service';

import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public current_session: any;
  public user_logged: any;
  protected search_value: string;
  protected search_result: any;
  protected search_result_id: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private user_service: UserService,
    private session_service: SessionService,
    private search_service: SearchService
  ) {
    this.current_session = this.session_service.getSession();
    this.user_service.getUserById(this.current_session).then((user) => {
      this.user_logged = user.object;
    });
    this.search_value = "";
    this.search_result = "";
    this.search_result_id = "";
  }

  public async search(form: any){
    try {
      await this.search_service.searchUser(this.search_value).then(async (user) => {
        this.search_result_id = user.id;
        this.search_result = user.object
      });
    }
    catch(error) {
      this.search_result = null;
      console.log(error);
    }
  }

  public logOut() {
    this.user_service.setUserStatusConnection(this.current_session, "Disconnected");
    this.session_service.removeSession();
    this._router.navigate(['/Login']);
  }

  ngOnInit(): void {
  }

}

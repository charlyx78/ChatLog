import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, Route } from '@angular/router';

import { UserService } from '../../services/user/user.service';
import { SessionService } from '../../services/session/session.service';

import { SearchService } from '../../services/search/search.service';
import { FriendService } from '../../services/friend/friend.service';

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
  protected friend_request_exists: any;
  protected friend_request_object: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private user_service: UserService,
    private session_service: SessionService,
    private search_service: SearchService,
    private friend_service: FriendService,
  ) {
    this.current_session = this.session_service.getSession();
    this.user_service.getUserById(this.current_session).then((user) => {
      this.user_logged = user;
    });
    this.search_value = "";
    this.search_result = "";
    this.search_result_id = "";
  }

  public async search(form: any){
    await this.search_service.searchUser(this.search_value).then(async (user) => {
      this.search_result_id = user.id;
      this.search_result = user.object
      await this.friend_service.friendRequestExists(this.current_session, this.search_result_id).then((response) => {
        this.friend_request_exists = response.exists;
        this.friend_request_object = response.object;
        console.log(this.friend_request_object);
      });
    });
  }

  public async sendFriendRequest(user_id_sender: string, user_id_receiver: string) {
    try {
      if(!this.friend_request_exists) {
        await this.friend_service.sendFriendRequest(user_id_sender, user_id_receiver);
      }
    }
    catch(error) {
      alert(error);
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

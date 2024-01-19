import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { FriendService } from '../../services/friend/friend.service';
import { UserService } from '../../services/user/user.service';
import { Friend } from '../../models/Friend';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-friends-chats',
  templateUrl: './friends-chats.component.html',
  styleUrls: ['./friends-chats.component.scss']
})
export class FriendsChatsComponent implements OnInit, OnDestroy {

  protected friends_array: any;
  public current_session: any;
  private friends_subscription!: Subscription;
  protected is_friends_list_loaded: boolean = false;

  constructor(
    private session_service: SessionService,
    private user_service: UserService,
    private friend_service: FriendService
  ) {
    this.current_session = this.session_service.getSession();
    this.friends_array = [];
  }

  ngOnInit(): void {
    this.getFriendList();
  }

  getFriendList() {
    try {
      if(this.friends_subscription) {
        this.unsubscribeFriendList();
      }
      else {
        this.friends_subscription = this.friend_service.getFriendList(this.current_session).subscribe((response) => {
          if(response) {
            response.forEach(async (friend) => {
              if(friend.user_id_1 != this.current_session) {
                let friend_user_object = await this.user_service.getUserById(friend.user_id_1);
                this.friends_array.push(
                  {
                    id: friend_user_object.id,
                    data: friend_user_object.object
                  }
                  );
              }
              else {
                let friend_user_object = await this.user_service.getUserById(friend.user_id_2)
                this.friends_array.push(
                  {
                    id: friend_user_object.id,
                    data: friend_user_object.object
                  }
                );
              }
            })
            this.is_friends_list_loaded = true;
            console.log('suscripcion abierta')
          }
        });
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  unsubscribeFriendList(){
    try {
      this.friends_subscription.unsubscribe();
      console.log('suscripcion cerrada')
    }
    catch(error) {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeFriendList();
  }

}

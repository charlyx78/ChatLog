import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { FriendService } from '../../services/friend/friend.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-friend-request-button',
  templateUrl: './friend-request-button.component.html',
  styleUrls: ['./friend-request-button.component.scss']
})
export class FriendRequestButtonComponent implements OnInit, OnChanges, OnDestroy {

  private friend_request_subscription!: Subscription;
  public current_session: any;
  @Input() user_view_id: any = "";

  public friend_request: any = {
    "exists": false,
    "id": "",
    "document": ""
  }

  constructor(
    private session_service: SessionService,
    private friend_service: FriendService
  ) {
    this.current_session = this.session_service.getSession();
  }
  
  ngOnInit(): void {
    this.user_view_id = this.user_view_id || "";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('user_view_id' in changes) {
      this.unsubscribeFriendRequest();
      this.doesFriendRequestExists();
    }
  }

  public doesFriendRequestExists() {
    try {
      this.friend_request_subscription = this.friend_service.friendRequestExists(this.current_session, this.user_view_id)
      .subscribe((response) => {
        if(response[0]) {
          this.friend_request.exists = true;
          this.friend_request.id = response[0].id; 
          this.friend_request.object = response[0];
        }
        else {
          this.friend_request.exists = false;
          this.friend_request.id = null; 
          this.friend_request.object = null;
        }
      });
    }
    catch(error) {
      console.log(error);
    }
  }

  private unsubscribeFriendRequest(): void {
    try {
      if (this.friend_request_subscription) {
        this.friend_request_subscription.unsubscribe();
      }
    }
    catch(error) {
      console.log(error);
    }
  }

  public async sendFriendRequest(user_id_sender: string, user_id_receiver: string) {
    try {
      console.log(user_id_receiver,'/', user_id_sender)
      if(!this.friend_request.exists) {
        await this.friend_service.sendFriendRequest(user_id_sender, user_id_receiver).then(()=> {
          this.friend_request.exists = true;
          this.friend_request.object = {
            user_id_sender: user_id_sender,
            user_id_receiver: user_id_receiver,
            friend_request_status: "Pending"
          };
        });
      }
    }
    catch(error) {
      alert(error);
    }
  }

  public async acceptFriendRequest() {
    try {
      await this.friend_service.acceptFriendRequest(this.friend_request.id, this.current_session, this.user_view_id);
    }
    catch(error)
    {
      console.log(error);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeFriendRequest();
  }

}

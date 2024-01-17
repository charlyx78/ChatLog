import { Component, Input, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { FriendService } from '../../services/friend/friend.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-friend-request-button',
  templateUrl: './friend-request-button.component.html',
  styleUrls: ['./friend-request-button.component.scss']
})
export class FriendRequestButtonComponent implements OnInit, OnChanges, OnDestroy {

  public current_session: any;
  @Input() user_view_id: any = "";
  public friend_request_exists: boolean = false;
  public friend_request_id: any = null;
  public friend_request_object: any = null;
  public friendship_date: any = "";

  constructor(
    private session_service: SessionService,
    private friend_service: FriendService
  ) {
    this.current_session = this.session_service.getSession();
  }
  
  ngOnInit(): void {
    this.user_view_id = this.user_view_id || "";
    this.doesFriendRequestExists();
    this.getFriendShipData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('user_view_id' in changes) {
      console.log("cambio de usuario")
      this.doesFriendRequestExists();
      this.getFriendShipData();
    }
  }

  public doesFriendRequestExists() {
    try {
      this.friend_service.friendRequestExists(this.current_session, this.user_view_id)
      .subscribe((response) => {
        if(response[0]) {
          this.friend_request_exists = true;
          this.friend_request_id = response[0].id; 
          this.friend_request_object = response[0];
          console.log(response[0])
          if(this.friend_request_object.friend_request_status == "Accepted")
          this.getFriendShipData(); 
        else {
          this.friend_request_exists = false;
          this.friend_request_id = null; 
          this.friend_request_object = null;
        }
        }
      });
    }
    catch(error) {
      console.log(error);
    }
  }

  public async sendFriendRequest(user_id_sender: string, user_id_receiver: string) {
    try {
      console.log(user_id_receiver,'/', user_id_sender)
      if(!this.friend_request_exists) {
        await this.friend_service.sendFriendRequest(user_id_sender, user_id_receiver).then(()=> {
          this.friend_request_exists = true;
          this.friend_request_object = {
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
      await this.friend_service.acceptFriendRequest(this.friend_request_id, this.current_session, this.user_view_id);
      this.getFriendShipData()
    }
    catch(error)
    {
      console.log(error);
    }
  }

  public async getFriendShipData() {
    await this.friend_service.getFriendShipData(this.current_session, this.user_view_id).then((response) => {
      this.friendship_date = response.data.registration_date;
    });
  }

  ngOnDestroy(): void {
  }

}

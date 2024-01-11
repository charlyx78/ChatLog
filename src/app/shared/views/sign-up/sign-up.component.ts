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
  public new_user: any;
  public current_session: any;
  public date: Date = new Date();

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private user_service: UserService,
    private session_service: SessionService
  ) {
    this.current_session = this.session_service.getSession();
    this.new_user = new User("","",this.date,"","","","","",this.date);
  }

  async signUp(form: any) {
    this.new_user.user_picture = await this.user_service.addUserPicture(this.new_user.user_picture);
    let is_user_registrated: boolean = await this.user_service.addUser(this.new_user);
    if(is_user_registrated) {
      form.reset();
      this._router.navigate(['/Login']);
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

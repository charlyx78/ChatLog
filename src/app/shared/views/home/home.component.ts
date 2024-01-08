import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Session } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public current_session: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private session_service: Session
  ) { 
    this.current_session = this.session_service.getCurrentSession();
  }

  public signOut() {
    this.session_service.deleteCurrentSession();
    this._router.navigate(['/Login']);
  }

  ngOnInit(): void {
    if(!this.current_session) {
      this._router.navigate(['/Login']);
    }
  }

}

import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ChatLog';

  public current_session: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.current_session = sessionStorage.getItem("CurrentSession");
  }

  ngOnInit(): void {
    if(!this.current_session){ 
      this._router.navigate(['/Login']);
    }
  }
}

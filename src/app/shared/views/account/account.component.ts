import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public current_session: any;
  public user_view_id: any;
  public user_view: any;
  public date: Date;
  public is_file_selected: boolean;
  private aux_file_selected: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private session_service: SessionService,
    private user_service: UserService
  ) {
    this.date = new Date();
    this.current_session = this.session_service.getSession();
    this.is_file_selected = false;
  }

  ngOnInit(): void {
    const fetchUserData = async (userId: string) => {
      const user = await this.user_service.getUserById(userId);
      this.user_view = this.user_service.serializeUser(user);
    };
    this.user_view_id = this._route.snapshot.params["user_id"];
    fetchUserData(this.user_view_id);
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.user_view_id = this._route.snapshot.params["user_id"];
        fetchUserData(this.user_view_id);
      }
    });
  }

  async updateAccount(form: any){
    try {
      if(
        this.user_view.name != "" &&
        this.user_view.last_name != "" &&
        this.user_view.birth_date != null &&
        this.user_view.gender != "" &&
        this.user_view.username != "" &&
        this.user_view.email != ""
      ) {
        let is_user_updated: boolean = await this.user_service.updateUser(this.user_view_id, this.user_service.serializeUser(this.user_view));
        if(is_user_updated) {
          alert("Información del usuario actualizada correctamente.");
        }       
      }
      else {
        alert("Llena todos los campos correctamente para continuar.");
      }
    }
    catch(error) {
      alert(error);
    }
  }

  async updateUserPicture(form: any) {
    try {
      if(this.is_file_selected) {
        this.user_view.user_picture = await this.user_service.addUserPicture(this.aux_file_selected);
        let is_user_picture_updated: boolean = await this.user_service.updateUserPicture(this.user_view_id, this.user_view.user_picture);
        if(is_user_picture_updated) {
          alert("Foto de perfil actualizada.");
          form.reset();
        }
      }
      else {
        alert("Selecciona una imágen de tu dispositivo para continuar.");
      }
    }
    catch(error) {
      alert(error);
    }
  }

  async deleteUserPicture() {
    try {
      if(confirm("¿Estás segur@ de querer eliminar tu foto de perfil?")) {
        let is_user_picture_deleted;
        is_user_picture_deleted = await this.user_service.updateUserPicture(this.user_view_id, "");
        if(is_user_picture_deleted) {
          alert("Foto de perfil eliminada correctamente.");
          this.user_view.user_picture = "";
        }
      }
    }
    catch(error) {
      alert(error);
    }

  }

  selectedUserPicture(event: any) {
    const user_picture: File = event.target.files[0];
    if(user_picture) {
      this.aux_file_selected = user_picture;
      this.is_file_selected = true;
    }
  }
}

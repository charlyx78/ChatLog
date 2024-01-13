import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session/session.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  public current_user: any;
  public date: Date;
  public user_logged: any;
  public confirmed_password: string;
  public is_file_selected: boolean;
  private aux_file_selected: any;

  constructor(
    private session_service: SessionService,
    private user_service: UserService
  ) {
    this.current_user = this.session_service.getSession();
    this.date = new Date();
    this.user_service.getUserById(this.current_user).then((user) => {
      this.user_logged = this.user_service.serializeUser(user);
    });
    this.confirmed_password = "";
    this.is_file_selected = false;
   }

  async updateAccount(form: any){
    try {
      if(
        this.user_logged.name != "" &&
        this.user_logged.last_name != "" &&
        this.user_logged.birth_date != null &&
        this.user_logged.gender != "" &&
        this.user_logged.username != "" &&
        this.user_logged.email != "" &&
        this.user_logged.password != "" && this.user_logged.password == this.confirmed_password 
      ) {
        let is_user_updated: boolean = await this.user_service.updateUser(this.current_user, this.user_service.serializeUser(this.user_logged));
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
        this.user_logged.user_picture = await this.user_service.addUserPicture(this.aux_file_selected);
        let is_user_picture_updated: boolean = await this.user_service.updateUserPicture(this.current_user, this.user_logged.user_picture);
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
        is_user_picture_deleted = await this.user_service.updateUserPicture(this.current_user, "");
        if(is_user_picture_deleted) {
          alert("Foto de perfil eliminada correctamente.");
          this.user_logged.user_picture = "";
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

  ngOnInit(): void {
  }

}

export class User {
    public name: string;
    public last_name: string;
    public birth_date: string;
    public gender: string;
    public username: string;
    public email: string;
    public password: string;
    public user_picture: string;
    public registration_date: string;

    constructor(
        name:any,
        last_name:any,
        birth_date:any,
        gender:any,
        username:any,
        email:any,
        password:any,
        user_picture:any = "",
        registration_date:string
    ) {
        this.name = name;
        this.last_name = last_name;
        this.birth_date = birth_date;
        this.gender = gender;
        this.username = username;
        this.email = email;
        this.password = password;
        this.user_picture = user_picture;
        this.registration_date = registration_date;
    }

    toJSON() {
        return {
          name: this.name,
          last_name: this.last_name,
          birth_date: this.birth_date,
          gender: this.gender,
          username: this.username,
          email: this.email,
          password: this.password,
          user_picture: this.user_picture,
          registration_date: this.registration_date        
        }
    };
}
export class User {
    public name: string;
    public last_name: string;
    public birth_date: Date;
    public gender: string;
    public username: string;
    public email: string;
    public password: string;
    public user_picture: any;
    public registration_date: Date;

    constructor(
        name:string,
        last_name:string,
        birth_date:Date,
        gender:string,
        username:string,
        email:string,
        password:string,
        user_picture:any,
        registration_date:Date
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
}
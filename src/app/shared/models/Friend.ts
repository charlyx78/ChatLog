export class Friend {
    public id: string;
    public user_id_1: string;
    public user_id_2: string;
    public status: string;
    public registration_date: Date;

    constructor(id: string, user_id_1: string, user_id_2: string, status: string, registration_date: Date) {
        this.id = id;
        this.user_id_1 = user_id_1;
        this.user_id_2 = user_id_2;
        this.status = status;
        this.registration_date = registration_date
    }
}
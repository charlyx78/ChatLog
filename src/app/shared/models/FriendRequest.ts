export class FriendRequest {
    public user_id_sender;
    public user_id_receiver;
    public friend_request_status;
    public friend_request_date;

    constructor(user_id_sender: string, user_id_receiver: string, friend_request_status: string, friend_request_date: Date) {
        this.user_id_sender = user_id_sender;
        this.user_id_receiver = user_id_receiver;
        this.friend_request_status= friend_request_status;
        this.friend_request_date = friend_request_date;
    }
}
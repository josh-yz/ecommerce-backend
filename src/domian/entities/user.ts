export class UserModel {
    id?: string
    name: string;
    last_name: string;
    email: string;
    password : string;
    address? : string;
    age? :Date;
    phone_number : string;
    prefix : Number
    photo? : string;
    role: string;
    created_date: Date;
}
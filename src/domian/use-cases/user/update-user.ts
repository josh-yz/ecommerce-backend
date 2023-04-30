import { UserModel } from "../../entities/user"

export interface AddUserModel {
    id?: string
    name: string;
    last_name: string;
    email: string;
    address? : string;
    age? :Date;
    phone_number : string;
    prefix : Number
    photo? : string;
    role: string;
}

export interface UpdateUser {
  edit: (id: string, body: AddUserModel) => Promise<AddUserModel>
}
import { UserModel } from "../../entities/user"

export interface AddUserModel {
    name: string
    last_name: string
    email: string
    phone: number
    password: string
    role: string
    created_date: Date
    activated: Boolean
    activated_at: Date
  }

  export interface AddUser {
    add: (user: UserModel) => Promise<AddUserModel>
  }
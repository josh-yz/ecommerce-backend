import { UserModel } from "../../../domian/entities/user"

export interface GetUsers {
  get: (data: any) => Promise<UserModel>
  getAccountsActivateds: (data: any) => Promise<UserModel>
}
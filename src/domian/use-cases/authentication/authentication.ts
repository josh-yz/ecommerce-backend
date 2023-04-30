import { AdminModel } from './../../entities/admin';
import { UserModel } from './../../entities/user';

export interface Authentication {
  auth: (email: string, password: string) => Promise<UserModel>
  authAdmin: (email: string, password: string) => Promise<AdminModel>
}

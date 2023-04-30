import { UserModel } from '../entities/user';
export interface IUserRepository {
    add: (userData: UserModel) => Promise<UserModel>
    getAll: () => Promise<UserModel>
    getOne: (email: string) => Promise<UserModel>
    getById: (id: string) => Promise<UserModel>
    delete: (id: string) => Promise<UserModel>
    update: (id: string, body: any) => Promise<UserModel>
    count: (value?: any) => Promise<Number>
    select: (value?: any) => Promise<UserModel>
} 
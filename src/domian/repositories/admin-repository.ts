import { AdminModel } from '../entities/admin';
export interface IAdminRepository {
    add: (userData: AdminModel) => Promise<AdminModel>
    getAll: () => Promise<AdminModel>
    getOne: (email: string) => Promise<AdminModel>
    getById: (id: string) => Promise<AdminModel>
    delete: (id: string) => Promise<AdminModel>
    update: (id: string, body: any) => Promise<AdminModel>
    count: (value?: any) => Promise<AdminModel>
    select: (value?: any) => Promise<AdminModel>
} 
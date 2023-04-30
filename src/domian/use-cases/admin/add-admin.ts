import { AdminModel } from "../../entities/admin"

export interface AddAdminModel {
    name: string
    last_name: string
    email: string
    password: string
    role: string
    created_date: Date
    activated: Boolean
    activated_at: Date
  }

  export interface AddAdmin {
    add: (admin: AdminModel) => Promise<AddAdminModel>
  }
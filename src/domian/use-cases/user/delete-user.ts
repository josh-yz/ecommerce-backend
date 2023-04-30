
export interface AddUserModel {
  id?: string
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

export interface DeleteUser {
  delete: (id: string) => Promise<AddUserModel>

}
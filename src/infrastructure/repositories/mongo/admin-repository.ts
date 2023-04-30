import { AdminModel } from "../../../domian/entities/admin";
import { IAdminRepository } from "../../../domian/repositories/admin-repository";

import { AddUserModel } from "../../../domian/use-cases/user/add-user";
import AdminSchema from "../../persistence/mongo/admin-schema";


const props = 'id, name last_name email role created_date activated activated_at group'

export class AdminMongoRepository implements IAdminRepository {


  async add(adminData: AdminModel): Promise<AdminModel> {
    try {
      const collection: AddUserModel | any = await AdminSchema.create(adminData)
      const { _id, name, email, last_name, role, activated, created_date } = collection

      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, activated, created_date: created_date }

      await collection.save()
      return newCollection;
    } catch (error) {
      console.log(error)
    }

  }
  async getAll(): Promise<AdminModel> {
    try {
      const collection: AddUserModel | any = await AdminSchema.find({}, props)
      return collection
    } catch (error) {
      console.log(error)
    }
  }
  async getOne(email: string): Promise<AdminModel> {
    try {
      const collection: AddUserModel | any = await AdminSchema.findOne({ email: email })

      return collection
    } catch (error) {
      console.log(error)
    }
  }
  async getById(id: string): Promise<AdminModel> {
    try {
      const collection: AddUserModel | any = await AdminSchema.findById(id, props)
      const { _id, name, email, last_name, role, activated, activated_at, created_date } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, activated, activated_at, created_date: created_date }

      return newCollection
    } catch (error) {
      console.log(error)
    }

  }

  async update(id: string, body: any): Promise<AdminModel> {
    try {
      const collection: AddUserModel | any = await AdminSchema.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false })
      const { _id, name, email, last_name, role, activated, created_date, activated_at } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, activated, created_date: created_date, activated_at }

      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  delete: (id: string) => Promise<AdminModel>;
  count: (value?: any) => Promise<AdminModel>;
  select: (value?: any) => Promise<AdminModel>;

}
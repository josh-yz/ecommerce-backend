import { UserModel } from "../../../domian/entities/user";
import { IUserRepository } from "../../../domian/repositories/user-repository";
import { AddUserModel } from "../../../domian/use-cases/user/add-user";
import UserSchema from "../../persistence/mongo/user-schema";



const props = 'id, phone_number name last_name email address country prefix age photo role created_date activated activated_at prefix'

export class UserMongoRepository implements IUserRepository {

  async add(userData: UserModel): Promise<UserModel> {
    try {
      const collection: AddUserModel | any = await UserSchema.create(userData)
      const { _id, name, email, last_name, phone_number,prefix, photo, role, activated, group, created_date } = collection

      const newCollection: any = { id: _id, name: name, photo: photo, group: group, last_name, email: email, role: role, phone_number,prefix, activated, created_date: created_date }

      await collection.save()
      return newCollection;
    } catch (error) {
      return null
    }

  }
  async getAll(): Promise<UserModel> {
    try {
      const collection: AddUserModel | any = await UserSchema.find({}, props)
      return collection
    } catch (error) {
      return null
    }
  }
  async getOne(email: string): Promise<UserModel> {
    try {
      const collection: AddUserModel | any = await UserSchema.findOne({ email: email })

      return collection
    } catch (error) {
      return null
    }
  }
  async getById(id: string): Promise<UserModel> {
    try {

      const collection: AddUserModel | any = await UserSchema.findById(id, props)
      if(!collection) return null;
      const { _id, name, email, last_name,country,photo, phone_number,prefix, role, activated, activated_at, created_date,age,address } = collection
 
      const newCollection: any = { id: _id, name: name,country,photo, last_name, email: email, role: role, phone_number, activated, activated_at, created_date: created_date,prefix ,age,address}

  
      

      return newCollection
    } catch (error) {
      return null
    }

  }
  async delete(id: string): Promise<UserModel> {
    try {
      const collection: AddUserModel | any = await UserSchema.findByIdAndDelete(id)

      const { _id, name, email, last_name, phone_number, role, activated, created_date, activated_at } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, phone_number, activated, created_date: created_date, activated_at }
      return newCollection
    } catch (error) {
      return null
    }
  }
  async update(id: string, body: any): Promise<UserModel> {
    try {
      const collection: AddUserModel | any = await UserSchema.findByIdAndUpdate(id, body, { new: true, useFindAndModify: false })
      const { _id, name, email, last_name, phone_number, role, activated, created_date, activated_at,age } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, phone_number, activated, created_date: created_date, activated_at ,age}

      return newCollection
    } catch (error) {
      return null
    }
  }
  async count(value?: any): Promise<Number> {
    try {
      const total: number = await UserSchema.countDocuments();
      return total;
    } catch (error) {
      return 0;
    }
  }
  select: (value?: any) => Promise<UserModel>;

}
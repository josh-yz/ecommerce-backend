import { CategoryModel } from "../../../domian/entities/category"
import { ICategoryRepository } from "../../../domian/repositories/category-repository"
import { AddCategoryModel } from "../../../domian/use-cases/category/category"

import CategorySchema from '../../persistence/mongo/category-schema'

const props = 'id, name description activated_dates short_description reated_date activated'
const props_category = 'id, name description activated_dates short_description created_date activated image'

export class CategoryMongoRepository implements ICategoryRepository {
  getProductsByCategoryId: (id: string) => Promise<CategoryModel>

  async add (accountData: AddCategoryModel): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.create(accountData)
      if(collection === null) return
      const { _id, name, description, short_description, created_date, activated_dates } = collection
      const newCollection: any = { id: _id, name: name, description, short_description: short_description, activated_dates, created_date: created_date }

      await collection.save()
      return newCollection
    } catch (error) {
      return null;
    }
  }

  async getAll (): Promise<CategoryModel []> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.find({}, props_category)

      // const total:number = await CategorySchema.countDocuments()
            
   
       
      return collection
    } catch (error) {
      return null;
    }
  }

  async getOne (name: string): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.findOne({ name: name })
      //.//populate({path: 'products', model: ProductSchema})
      let category: any = {
        Category: collection
       }
      return category
    } catch (error) {
      return null;
    }
  }

  async getById (id: string): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.findById(id, props)      
      const { _id, name, description, created_date, short_description, image, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, short_description: short_description, image: image, activated_dates: activated_dates, created_date: created_date }
      
       
      return newCollection
    } catch (error) {
      return null;
    }
  }

 

  async update (id: string, body: any): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
      const { _id, name, description, created_date, short_description, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, short_description: short_description, activated_dates: activated_dates, created_date: created_date }

      let category: any = {
        Category: newCollection
       }
      return category
    } catch (error) {
      return null;
    }
  }

  async delete (id: string): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.findByIdAndDelete(id)
      const { _id, name, description, created_date, image, short_description, activated_dates } = collection
      const newCollection: any = { id: _id, name: name,description: description, short_description: short_description, activated_dates: activated_dates, created_date: created_date }

      let category: any = {
        Category: newCollection
       }
      return category
    } catch (error) {
      return null;
    }
  }

  async count (value?: any): Promise<CategoryModel> {
    try {
      const collection: AddCategoryModel | any = await CategorySchema.countDocuments(value)
      return collection
    } catch (error) {
      return null;
    }
  }

  async select (value: any): Promise<CategoryModel> {
    try {
       
    
      let collection: AddCategoryModel | any = await CategorySchema.find(value)

      return collection

    } catch (error) {
      return null;
    }
  }
}

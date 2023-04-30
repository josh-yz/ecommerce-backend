import { CategoryModel } from "../../entities/category";

export interface AddCategoryModel {
  name: string
  Category?: any
  description: string
  created_date: Date
  short_description: string
  activated_dates?: any
}
export interface ICategory {
  add: (category: CategoryModel) => Promise<AddCategoryModel>
  get: (category_id?: CategoryModel []) => Promise<AddCategoryModel[]>
  edit: (category_id: string, body: CategoryModel) => Promise<AddCategoryModel>
  delete: (category_id: string) => Promise<AddCategoryModel>
}


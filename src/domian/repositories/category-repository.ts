import { CategoryModel } from "../entities/category"
import { AddCategoryModel } from "../use-cases/category/category"


export interface ICategoryRepository {
  add: (categoryData: AddCategoryModel) => Promise<CategoryModel>
  getAll: () => Promise<CategoryModel []>
  getOne: (name: string) => Promise<CategoryModel>
  getById: (id: string) => Promise<CategoryModel>
  delete: (id: string) => Promise<CategoryModel>
  update: (id: string, body: any) => Promise<CategoryModel>
  count: (value?: any) => Promise<CategoryModel>
  select: (value?: any) => Promise<CategoryModel>


}



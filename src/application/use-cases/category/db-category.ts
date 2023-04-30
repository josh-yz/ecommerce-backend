import { CategoryModel } from "../../../domian/entities/category";
import { ICategoryRepository } from "../../../domian/repositories/category-repository";
import { ICategory, AddCategoryModel } from "../../../domian/use-cases/category/category";



export class DbCategory implements ICategory {

  constructor(private readonly iCategoryRepository: ICategoryRepository) {
    this.iCategoryRepository = iCategoryRepository
  }

  async get(categoryDb: CategoryModel []): Promise<AddCategoryModel[]> {


    const count = await this.iCategoryRepository.count()

    const Categories = categoryDb.map(x=>{
      return {
        id : x._id,
        short_description : x.short_description,
        name : x.name,
        description : x.description,
        created_date : x.created_date,

      }
    });

    let categories: any = {
        Categories: Categories,
        categories: count
     }
    
    return new Promise(resolve => resolve(
      categories

    ))
  }

  async edit(id: string, categoryDb: CategoryModel): Promise<AddCategoryModel> {
    const editCategory = await this.iCategoryRepository.update(id, categoryDb)
    return new Promise(resolve => resolve(
      editCategory

    ))
  }
  async delete (id : string): Promise<AddCategoryModel> {
    const editCategory = await this.iCategoryRepository.delete(id)
    return new Promise(resolve => resolve(
      editCategory

    ))
  }
  async add (category: CategoryModel): Promise<AddCategoryModel> {

    const categorySavedDb = await this.iCategoryRepository.add(category)
    return new Promise(resolve => resolve(
      categorySavedDb

    ))
  }

}
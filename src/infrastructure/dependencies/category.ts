import { DbCategory } from "../../application/use-cases/category/db-category";
import { CategoryMongoRepository } from "../repositories/mongo/category-repository";
import { CreateCategoryController, DeleteCategoryController, EditCategoryController, ListCategoriesController } from "../web/controllers/category/category";


export const makeCreateCategoryController = (): CreateCategoryController => {
    const categoryMongoRepository = new CategoryMongoRepository()
    const category = new DbCategory(categoryMongoRepository)
    const createCategoryController = new CreateCategoryController(category, categoryMongoRepository)
    return createCategoryController
}

export const makeListCategoriesController = (): ListCategoriesController => {
    const categoryMongoRepository = new CategoryMongoRepository()
    const category = new DbCategory(categoryMongoRepository)
    const listCategoriesController = new ListCategoriesController(category, categoryMongoRepository)
    return listCategoriesController
}

export const makeEditCategoryController = (): EditCategoryController => {
    const categoryMongoRepository = new CategoryMongoRepository()
    const category = new DbCategory(categoryMongoRepository)
    const editCategoryController = new EditCategoryController(category, categoryMongoRepository)
    return editCategoryController
}

export const makeDeleteCategoryController = (): DeleteCategoryController => {
    const categoryMongoRepository = new CategoryMongoRepository()
    const category = new DbCategory(categoryMongoRepository)
    const deleteCategoryController = new DeleteCategoryController(category, categoryMongoRepository)
    return deleteCategoryController
  }
  

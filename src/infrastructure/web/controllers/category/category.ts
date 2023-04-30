import { created } from './../../helpers/http-helper';
import { ICategoryRepository } from "../../../../domian/repositories/category-repository";
import { AddCategoryModel, ICategory } from "../../../../domian/use-cases/category/category";
import { MissingParamError, ReadyExist } from "../../errors";
import { badRequest, noContent, serverError, success } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../interfaces";


export class CreateCategoryController implements Controller {
    constructor(
        private readonly iCategory: ICategory,
        private readonly iCategoryRepository: ICategoryRepository
    ) {
        this.iCategory = iCategory
        this.iCategoryRepository = iCategoryRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { name, description, short_description, package_type, activated_dates } = httpRequest.body
            const requiredField = ['name', 'description']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const categoryReadyExist: any = await this.iCategoryRepository.getOne(name)

            if (categoryReadyExist.Category) {
                return badRequest(new ReadyExist(name))
            }

            const request: AddCategoryModel = {
                name: name,
                description: description,
                activated_dates: activated_dates,
                short_description: short_description,
                created_date: new Date()
            }

            const DTOCatregory = await this.iCategory.add(request)
            return created(DTOCatregory)
        } catch (error) {
            return serverError(error)
        }

    }

}


export class ListCategoriesController implements Controller {
    constructor(
        private readonly iCategory: ICategory,
        private readonly iCategoryRepository: ICategoryRepository
    ) {
        this.iCategory = iCategory
        this.iCategoryRepository = iCategoryRepository
    }


    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const countUsers = await this.iCategoryRepository.count()
            if (!countUsers) {
                return noContent()
            }
            const listCategoriesDb = await this.iCategoryRepository.getAll()
            const listDTO = await this.iCategory.get(listCategoriesDb);            
            return success(listDTO)
        } catch (error) {

        }
    }
}

export class EditCategoryController implements Controller {
    constructor(
        private readonly iCategory: ICategory,
        private readonly iCategoryRepository: ICategoryRepository) {
        this.iCategory = iCategory
        this.iCategoryRepository = iCategoryRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            let id = httpRequest.params.id

            const categoryDb: AddCategoryModel = await this.iCategoryRepository.getById(id)

            if (!categoryDb) {
                return badRequest(new ReadyExist(id))
            }

            const DTOCatregory = await this.iCategory.edit(id, httpRequest.body)
            return success(DTOCatregory)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}


export class DeleteCategoryController implements Controller {
    constructor(
        private readonly iCategory: ICategory,
        private readonly iCategoryRepository: ICategoryRepository) {
        this.iCategory = iCategory
        this.iCategoryRepository = iCategoryRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {

            const category_id = httpRequest.params.category_id

            const categoryReadyExist = await this.iCategoryRepository.getById(category_id)


            if (!categoryReadyExist) {
                return badRequest(new ReadyExist(category_id))
            }


            const DTOCatregory = await this.iCategory.delete(category_id)
            return success(DTOCatregory)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }
    }
}
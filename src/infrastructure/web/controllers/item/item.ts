import { IItemRepository } from "../../../../domian/repositories/item-repository"
import { IProductRepository } from "../../../../domian/repositories/product-repository"
import { IItem } from "../../../../domian/use-cases/item/items"
import { InvalidParamError, MissingParamError, NoReadyExist, ReadyExist } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces"




export class RegisterItemController implements Controller {

  constructor(private readonly iItem: IItem, 
    private readonly iProductRepository: IProductRepository,
    private readonly iItemRepository: IItemRepository,){
    this.iItem = iItem
    this.iProductRepository = iProductRepository
    this.iItemRepository = iItemRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const requiredField = ['description']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const product_id = httpRequest.params.product_id

      

      const productDb: any = await this.iProductRepository.getById(product_id)
      if(!productDb) return badRequest(new InvalidParamError(`${product_id} no exist.`))

      // const verifyExistItem = await this.iItemRepository.getOne(httpRequest.body.sku)
      // if(verifyExistItem) return badRequest(new ReadyExist(`SKU: ${httpRequest.body.sku}`))
      
    
      const { id } = await productDb.product

      let { name,
            description,
            price,
            offer_price,
            details,
            lb,
            oz,
            text_offer,
            quantity,
            image,
            tags,
            activated,
            created_at,
            activated_at,
            product,
            products,
            sku,
            uploads } = httpRequest.body
              
      
      const DTOProduct = await this.iItem.add({
            description,
            price,
            created_at: new Date(),
            product: id })
      
      return success(DTOProduct)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class ListItemsController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItemRepository = iItemRepository
    this.iItem = iItem

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const itemsDb = await this.iItemRepository.getAll()
      const DTOItems = await this.iItem.getAll(itemsDb)
      
      return success(DTOItems)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class UpdateItemController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const item_id = httpRequest.params.item_id
      const itemDb: any = await this.iItemRepository.getById(item_id)

      if(!itemDb) return badRequest(new InvalidParamError(item_id))
    
      const DTOItem = await this.iItem.update(itemDb.item.id, httpRequest.body)
      
      return success(DTOItem)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class GetItemController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const item_id = httpRequest.params.item_id
      const itemDb: any = await this.iItemRepository.getById(item_id)

      if(!itemDb) return badRequest(new InvalidParamError(item_id))
    
      const DTOItem = await this.iItem.get(itemDb)
      
      return success(DTOItem)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class RemoveItemController implements Controller {

  constructor(private readonly iItem: IItem,
    private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const item_id = httpRequest.params.item_id
      const itemDb: any = await this.iItemRepository.getById(item_id)

      if(!itemDb) return badRequest(new InvalidParamError(item_id))
    
      const DTOItem = await this.iItem.remove(itemDb)
      
      return success(DTOItem)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class GetItemsProductByIdController implements Controller {
  constructor(private readonly iItem: IItem, private readonly iItemRepository: IItemRepository){
    this.iItem = iItem
    this.iItemRepository = iItemRepository
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const product_id = httpRequest.params.product_id
      

      const productReadyExist = await this.iItemRepository.getItemsByProductId(product_id)
                  
      if (!productReadyExist) {
        return badRequest(new NoReadyExist(product_id))
      }
      
      

      const DTOProduct = await this.iItem.get(productReadyExist)
      return success(DTOProduct)
    } catch (error) {
      return serverError(error)
    }
  }

}




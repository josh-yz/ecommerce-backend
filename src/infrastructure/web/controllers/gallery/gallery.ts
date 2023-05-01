import { IGalleryRepository } from './../../../../domian/repositories/gallery-repository';
import { IItemRepository } from "../../../../domian/repositories/item-repository"
import { IProductRepository } from "../../../../domian/repositories/product-repository"
import { IGallery } from "../../../../domian/use-cases/gallery/gallery"
import { InvalidParamError, MissingParamError, NoReadyExist, ReadyExist } from "../../errors"
import { badRequest, serverError, success } from "../../helpers/http-helper"
import { Controller, HttpRequest, HttpResponse } from "../../interfaces"
import { IFileManager } from '../../interfaces/file-manager';




export class RegisterGalleryController implements Controller {

  constructor(
    private readonly iGallery: IGallery,
    private readonly iProductRepository: IProductRepository,
    private readonly iGalleryRepository: IGalleryRepository,
    private readonly iFileManager: IFileManager
  ) {
    this.iGallery = iGallery
    this.iProductRepository = iProductRepository
    this.iGalleryRepository = iGalleryRepository
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const data = JSON.parse(httpRequest.body.data);


      const requiredField = ['order']
      for (const field of requiredField) {
        if (!data[field]) {
          this.iFileManager.deleteFile(`/products/${httpRequest.file.filename}`)
          return badRequest(new MissingParamError(field))
        }
      }
      const product_id = httpRequest.params.product_id

      const productDb: any = await this.iProductRepository.getById(product_id)
      if (!productDb) return badRequest(new InvalidParamError(`${product_id} no exist.`))

      // const verifyExistItem = await this.iItemRepository.getOne(httpRequest.body.sku)
      // if(verifyExistItem) return badRequest(new ReadyExist(`SKU: ${httpRequest.body.sku}`))

      const { id } = await productDb.product

      let { order } = data

      const DTOProduct = await this.iGallery.add({
        image: `/${httpRequest.file.filename}`,
        order,
        created_at: new Date(),
        product: id
      })

      return success(DTOProduct)
    } catch (error) {
      this.iFileManager.deleteFile(`/products/${httpRequest.file.filename}`)
      return serverError(error)
    }
  }
}

export class ListGalleriesController implements Controller {


  constructor(
    private readonly iGallery: IGallery,
    private readonly iGalleryRepository: IGalleryRepository,
  ) {
    this.iGallery = iGallery
    this.iGalleryRepository = iGalleryRepository
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const itemsDb = await this.iGalleryRepository.getAll()
      const DTOItems = await this.iGallery.getAll(itemsDb)

      return success(DTOItems)
    } catch (error) {
      return serverError(error)
    }
  }
}


export class GetGalleryController implements Controller {

  constructor(
    private readonly iGallery: IGallery,
    private readonly iGalleryRepository: IGalleryRepository,
  ) {
    this.iGallery = iGallery
    this.iGalleryRepository = iGalleryRepository
  }


  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const gallery_id = httpRequest.params.gallery_id
      const galleyDb: any = await this.iGalleryRepository.getById(gallery_id)

      if (!galleyDb) return badRequest(new InvalidParamError(gallery_id))

      const DTOGallery = await this.iGallery.get(galleyDb)

      return success(DTOGallery)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class RemoveGalleryController implements Controller {

  constructor(
    private readonly iGallery: IGallery,
    private readonly iGalleryRepository: IGalleryRepository,
    private readonly iFileManager: IFileManager
  ) {
    this.iGallery = iGallery
    this.iGalleryRepository = iGalleryRepository
    this.iFileManager = iFileManager
  }


  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const gallery_id = httpRequest.params.gallery_id

      const galleryDb: any = await this.iGalleryRepository.getById(gallery_id)


      

      if (!galleryDb) return badRequest(new InvalidParamError(gallery_id))

      const DTOGallery = await this.iGallery.remove(galleryDb)      
      this.iFileManager.deleteFile(`/products/${galleryDb.image}`);
      return success(DTOGallery)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class GetGalleriesProductByIdController implements Controller {
  constructor(
    private readonly iGallery: IGallery,
    private readonly iGalleryRepository: IGalleryRepository,
  ) {
    this.iGallery = iGallery
    this.iGalleryRepository = iGalleryRepository
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const product_id = httpRequest.params.product_id


      const productReadyExist = await this.iGalleryRepository.getGalleriesByProductId(product_id)

      if (!productReadyExist) {
        return badRequest(new NoReadyExist(product_id))
      }



      const DTOProduct = await this.iGallery.get(productReadyExist)
      return success(DTOProduct)
    } catch (error) {
      return serverError(error)
    }
  }

}




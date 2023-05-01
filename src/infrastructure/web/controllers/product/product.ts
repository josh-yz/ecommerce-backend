import fs from 'fs';
import { created } from './../../helpers/http-helper';
import { HttpRequest, HttpResponse } from "../../interfaces";
import { Controller } from "../../interfaces/controller";

import { badRequest, serverError, success } from "../../helpers/http-helper"
import { IProduct } from "../../../../domian/use-cases/product/products";
import { IProductRepository } from "../../../../domian/repositories/product-repository";
import { InvalidParamError, MissingParamError } from "../../errors";
import { ProductModel } from "../../../../domian/entities/product";
import { IFileManager } from '../../interfaces/file-manager';



export class ListProductsCategoryController implements Controller {

  constructor(private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository) {
    this.iProduct = iProduct

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const category_id = httpRequest.params.category_id

      const productsDb: any = await this.iProductRepository.getProductsByCategoryId(category_id);


      const DTOProducts = await this.iProduct.getAll(productsDb)


      return success(DTOProducts)
    } catch (error) {
      return serverError(error)
    }
  }

}


export class ListProductsController implements Controller {

  constructor(private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository) {
    this.iProduct = iProduct

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const productsDb: any = await this.iProductRepository.getAll();
      const DTOProducts = await this.iProduct.getAll(productsDb)
      return success(DTOProducts)
    } catch (error) {
      return serverError(error)
    }
  }

}

export class RegisterProductController implements Controller {

  constructor(
    private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository,
    private readonly iFileManager: IFileManager
  ) {
    this.iProduct = iProduct
    this.iFileManager = iFileManager
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = JSON.parse(httpRequest.body.data);
      const requiredField = ['name', 'description', 'details', 'quantity', 'price', 'id_category']
      for (const field of requiredField) {
        if (!data[field]) {
          this.iFileManager.deleteFile(`/products/${httpRequest.file.filename}`)
          return badRequest(new MissingParamError(field))
        }
      }
      const body: ProductModel = {
        name: data.name.trim(),
        description: data.description,
        price: data.price,
        offer_price: data.offer_price,
        details: data.details,
        text_offer: data.text_offer,
        image: `/${httpRequest.file.filename}`,
        n_sales: data.n_sales,
        n_points: data.n_points,
        activated: true,
        sku: `${Date.now()}`,
        id_category: data.id_category,
        quantity: data.quantity,
        gallery: data.gallery,
        slug: data.name.trim().toLowerCase().replace(/ /g, '-').replace(/[*\w]}/g, ''),
        created_at: new Date(),
        activated_at: new Date()
      }

      const DTOProduct = await this.iProduct.add(body);
      return created(DTOProduct)

    } catch (error) {
      this.iFileManager.deleteFile(`/products/${httpRequest.file.filename}`)
      return serverError(error)
    }
  }
}


export class UpdateProductController implements Controller {

  constructor(
    private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository,
    private readonly iFileManager: IFileManager
    ){
    this.iProduct = iProduct
    this.iFileManager = iFileManager
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const requiredField = ['name', 'description', 'details', 'quantity', 'price', 'id_category']
      for (const field of requiredField) {
        if (!httpRequest.body[field]) {
          this.iFileManager.deleteFile(`/products/${httpRequest.file.filename}`)
          return badRequest(new MissingParamError(field))
        }
      }

      const product_id = httpRequest.params.product_id
      const productDb: any = await this.iProductRepository.getById(product_id)      

      if(!productDb) return badRequest(new InvalidParamError(product_id))
      const DTOProduct = await this.iProduct.update(productDb.product.id, httpRequest.body)
      return success(DTOProduct)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class UpdateDataProductController implements Controller {

  constructor(
    private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository,
    private readonly iFileManager: IFileManager
    ){
    this.iProduct = iProduct
    this.iFileManager = iFileManager
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const data = JSON.parse(httpRequest.body.data);
      const requiredField = ['name', 'description', 'details', 'quantity', 'price', 'id_category']
      for (const field of requiredField) {
        if (!data[field]) {
          this.iFileManager.deleteFile(`/products/${httpRequest.file.filename}`)
          return badRequest(new MissingParamError(field))
        }
      }
      const product_id = httpRequest.params.product_id
      const productDb: any = await this.iProductRepository.getById(product_id)
      if(!productDb) return badRequest(new InvalidParamError(product_id))
    
      const DTOProduct = await this.iProduct.update(productDb.product.id, {...httpRequest.body,image: `/${httpRequest.file.filename}`})
      const image = productDb.product.image;
      this.iFileManager.deleteFile(`/products/${image}`);

      return success(DTOProduct)
    } catch (error) {
      this.iFileManager.deleteFile(`/products/${httpRequest.file.filename}`)
      return serverError(error)
    }
  }
}




export class RemoveProductController implements Controller {

  constructor(
    private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository,
    private readonly iFileManager: IFileManager

  ) {
    this.iProduct = iProduct
    this.iFileManager = iFileManager

  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const product_id = httpRequest.params.product_id
      const productDb: any = await this.iProductRepository.getById(product_id)
      if (!productDb) return badRequest(new InvalidParamError(product_id))
      const { image } = productDb.product
      const DTOProduct = await this.iProduct.remove(productDb.product)
      this.iFileManager.deleteFile(`/products/${image}`);
      return success(DTOProduct)
    } catch (error) {
      return serverError(error)
    }
  }
}

export class GetProductController implements Controller {

  constructor(private readonly iProduct: IProduct,
    private readonly iProductRepository: IProductRepository){
    this.iProduct = iProduct

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const product_id = httpRequest.params.product_id
      const productDb: any = await this.iProductRepository.getById(product_id)

      if(!productDb) return badRequest(new InvalidParamError(product_id))
    
      const DTOProduct = await this.iProduct.get(productDb)
      
      return success(DTOProduct)
    } catch (error) {
      return serverError(error)
    }
  }
}



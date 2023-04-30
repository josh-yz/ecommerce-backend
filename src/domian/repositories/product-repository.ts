import { ProductModel } from '../entities/product'
import { IProductResponse } from '../use-cases/product/products';

export interface IProductRepository {
  add: (productData: ProductModel) => Promise<IProductResponse>
  getAll: () => Promise<IProductResponse>
  getOne: (email: string) => Promise<IProductResponse>
  getById: (id: string) => Promise<IProductResponse>
  getProductsByCategoryId: (id: string) => Promise<IProductResponse>
  delete: (id: string) => Promise<IProductResponse>
  update: (id: string, body: ProductModel) => Promise<IProductResponse>
  count: (value?: any) => Promise<IProductResponse>
  select: (value?: any) => Promise<IProductResponse>
}


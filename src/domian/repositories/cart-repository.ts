import { CartModel } from '../entities/cart'
import { ICartResponse } from '../use-cases/cart/cart';

export interface ICartRepository {
  add: (cartData: CartModel) => Promise<ICartResponse>
  addProduct: (id:string,body: any) => Promise<ICartResponse>
  removeProduct: (id:string,product_id:string) => Promise<ICartResponse>
  getAll: () => Promise<ICartResponse[]>
  getOne: (email: string) => Promise<ICartResponse>
  getById: (id: string) => Promise<ICartResponse>
  getCartByUserId: (id: string) => Promise<ICartResponse>
  getCarExiststByUserId: (id: string) => Promise<ICartResponse>
  delete: (id: string) => Promise<ICartResponse>
  update: (id: string, body: CartModel) => Promise<ICartResponse>
  count: (value?: any) => Promise<ICartResponse>
  select: (value?: any) => Promise<ICartResponse>
}


import { CartModel } from "../../entities/cart"

export interface ICartResponse {
    id?: string
    _id?: string
    total : number
    product: any
    user: any
}


export interface ICart {
  add: (cart: CartModel) => Promise<ICartResponse>
  get?: (id: CartModel) => Promise<ICartResponse>
  getAll?: (cart: ICartResponse[]) => Promise<ICartResponse[]>
  update?: (id: string, body: any) => Promise<ICartResponse>
  remove?: (id: CartModel) => Promise<ICartResponse>
}
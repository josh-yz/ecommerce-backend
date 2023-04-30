import { CartModel } from "../../entities/cart"
import { OrderModel } from "../../entities/order"

export interface IOrderResponse {
    id?: string
    _id?: string
    total : number
    products: any
    user: any
    address : string    
    sub_total: number
    note : string
    send_cost : number
    track : string
    method_payment : string
}


export interface IOrder {
  add: (order: OrderModel) => Promise<IOrderResponse>
  get?: (id: OrderModel) => Promise<IOrderResponse>
  getAll?: (order: IOrderResponse[]) => Promise<IOrderResponse[]>
  update?: (id: string, body: any) => Promise<IOrderResponse>
  remove?: (id: CartModel) => Promise<IOrderResponse>
}
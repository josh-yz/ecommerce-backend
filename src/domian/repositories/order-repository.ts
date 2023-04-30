import { OrderModel } from '../entities/order'
import { IOrderResponse } from '../use-cases/order/order';

export interface IOrderRepository {
  add: (orderData: OrderModel) => Promise<IOrderResponse>
  getAll: () => Promise<IOrderResponse[]>
  getOne: (data: string) => Promise<IOrderResponse>
  getById: (id: string) => Promise<IOrderResponse>
  getOrderByUserId: (id: string) => Promise<IOrderResponse>
  delete: (id: string) => Promise<IOrderResponse>
  update: (id: string, body: OrderModel) => Promise<IOrderResponse>
  count: (value?: any) => Promise<IOrderResponse>
  select: (value?: any) => Promise<IOrderResponse>
}


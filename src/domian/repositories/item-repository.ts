import { ItemModel } from "../entities/item"
import { IItemResponse } from "../use-cases/item/items"



export interface IItemRepository {
  add: (productData:ItemModel) => Promise<IItemResponse>
  getAll: () => Promise<IItemResponse>
  getOne: (email: string) => Promise<IItemResponse>
  getById: (id: string) => Promise<IItemResponse>
  delete: (id: string) => Promise<IItemResponse>
  update: (id: ItemModel, body: ItemModel) => Promise<IItemResponse>
  count: (value?: any) => Promise<IItemResponse>
  select: (value?: any) => Promise<IItemResponse>
  getItemsByProductId?: (id: string) => Promise<IItemResponse>

}



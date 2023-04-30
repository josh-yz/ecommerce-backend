import { ItemModel } from '../../entities/item';

export interface IItemResponse {
    id?: string
    _id?: string
    description: string
    price: number
    created_at: Date
    category?: any
    items?: any
    item?: any
}


export interface IItem {
  add: (product: ItemModel) => Promise<IItemResponse>
  get?: (id: ItemModel) => Promise<IItemResponse>
  getAll?: (product: ItemModel) => Promise<IItemResponse>
  update?: (id: ItemModel, body: any) => Promise<IItemResponse>
  remove?: (id: ItemModel) => Promise<IItemResponse>

}

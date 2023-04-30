import { ItemModel } from "../../../domian/entities/item"
import { IItemRepository } from "../../../domian/repositories/item-repository"
import { IItem, IItemResponse } from "../../../domian/use-cases/item/items"


export class DbAddItem implements IItem {

  constructor(private readonly iItemRepository: IItemRepository) {
    this.iItemRepository = iItemRepository
  }
    async add (item: ItemModel): Promise<IItemResponse> {
      const itemDb = await this.iItemRepository.add(item)
      return new Promise(resolve => resolve(
        itemDb
      ))
    }

    async getAll (item: ItemModel): Promise<IItemResponse> {
      return new Promise(resolve => resolve(
        item
      ))
    }

    async get (item: ItemModel): Promise<IItemResponse> {      
      return new Promise(resolve => resolve(
        item
      ))
    }

    async update (id: ItemModel, body: ItemModel): Promise<IItemResponse> {
      
      const itemUpdated = await this.iItemRepository.update(id, body)

      if(!itemUpdated) throw(new Error('Error to updated item'))
      
      return new Promise(resolve => resolve(
        itemUpdated
      ))
    }

    async remove (item: any): Promise<IItemResponse> {
      
      let { id } = item.item
      
      const itemDeleted = await this.iItemRepository.delete(id)
      
      return new Promise(resolve => resolve(
        itemDeleted
      ))
    }
}


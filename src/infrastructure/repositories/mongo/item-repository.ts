import ItemSchema from "../../persistence/mongo/item-schema"
import ProductSchema from "../../persistence/mongo/product-schema"

import { ItemModel } from "../../../domian/entities/item"
import { IItemResponse } from "../../../domian/use-cases/item/items"
import { IItemRepository } from "../../../domian/repositories/item-repository"
import { ProductModel } from "../../../domian/entities/product"
import { relativeTimeRounding } from "moment"

// import { ItemModel } from '../../../../domain/entities/item'
// import { IItemResponse } from '../../../../domain/useCases/item/items'
// import { IItemRepository } from '../../../../data/useCases/protocols/repositories/item-repository'
// import { ProductModel } from '../../../../domain/entities/product'



const props = 'id items price description product'

export class ItemMongoRepository implements IItemRepository {

  async add (productData: ItemModel): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.create(productData)
      const productDb: any = await ProductSchema.findById(collection.product)
      
      await collection.save()
      
      const resultPush = await productDb.items.push(collection.id)

      
      await productDb.save()

      return collection
    } catch (error) {
      return null
    }
  }

  async getAll (): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.find({}, props)
      //.populate({path: 'category', model: CategorySchema})
      const total:number = await ItemSchema.count()

      let items: any = {
        items: collection,
        total: total
      }
      return items
    } catch (error) {
      return null
    }
  }

  async getOne (name: string): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.findOne({ sku: name }, props)

      return collection
    } catch (error) {
      return null
    }
  }

  async getById (id: string): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.findById(id, props)
      const { _id, 
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        quantity,
        lb,
        oz,
        text_offer,
        sku,
        product } = collection

        const newCollection: any = { 
        id: _id,  
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        lb,
        quantity,
        oz,
        text_offer,
        sku,
        product}

        let item: any = {
          item: newCollection
        }
        
        return item
    } catch (error) {
      return null
    }
  }

  async update (id: ItemModel, body: ItemModel): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
      const { _id, 
        tags,
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        quantity,
        lb,
        oz,
        text_offer,
        sku,
        product } = collection
      const newCollection: any = { 
        id: _id,  
        tags,
        name,
        items,
        uploads,
        description,
        image,
        activated,
        price,
        details,
        created_at,
        offer_price,
        quantity,
        lb,
        oz,
        text_offer,
        sku,
        product}

        let item: any = {
          itemUpdated: newCollection
        }
        
        
        return item
    } catch (error) {
      return null
    }
  }

  async delete (id: string): Promise<IItemResponse> {
    try {

      const collectionRemoveItem: ItemModel | any = await ItemSchema.findByIdAndDelete(id)
      
      const collectionProduct: ItemModel | any = await ProductSchema.findById(collectionRemoveItem.product)
    
      let products = await collectionProduct.items;

      const index = products.indexOf(id);
      if (index > -1) {
        products.splice(index, 1);
      }


      await ProductSchema.findByIdAndUpdate({_id: collectionRemoveItem.product}, {$set: {items: products}})

      return  collectionRemoveItem
      
    } catch (error) {
      return null
    }
  }

  async count (value?: any): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.count(value)
      return collection
    } catch (error) {
      return null
    }
  }

  async select (value: any): Promise<IItemResponse> {
    try {
      const collection: ItemModel | any = await ItemSchema.find(value, props)
      return collection
    } catch (error) {
      return null
    }
  }

  async getItemsByProductId (id: string): Promise<IItemResponse> {
    try {
      const items = await ItemSchema.find({ product: id }).select('-__v').lean(); // Obtiene resultados de JavaScript simples
  
      const newCollection: any  = items.map(item=>{
        const {_id,description,created_at,product,price} = item;
        return {
        id:_id,
        description,
        created_at,
        price,
        product : product
        }
      });
      
      let product: any = {
        item: newCollection,
       }

       
      return product
    } catch (error) {
      return null
    }
  }
}

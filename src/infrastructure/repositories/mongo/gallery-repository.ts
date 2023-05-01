import GallerySchema from "../../persistence/mongo/gallery-schema"
import ProductSchema from "../../persistence/mongo/product-schema"
import { IGalleryRepository } from "../../../domian/repositories/gallery-repository"
import { ProductModel } from "../../../domian/entities/product"
import { GalleryModel } from "../../../domian/entities/gallery"
import { IGalleryResponse } from "../../../domian/use-cases/gallery/gallery"


const props = 'id galleries image orden product'

export class GalleryMongoRepository implements IGalleryRepository {

  update: (id: GalleryModel, body: GalleryModel) => Promise<IGalleryResponse>

  async add (productData: GalleryModel): Promise<IGalleryResponse> {
    try {
      const collection: GalleryModel | any = await GallerySchema.create(productData)
      const productDb: any = await ProductSchema.findById(collection.product)
      
      await collection.save()
      
      const resultPush = await productDb.gallery.push(collection.id)

      
      await productDb.save()

      return collection
    } catch (error) {
     return null
    }
  }

  async getAll (): Promise<IGalleryResponse> {
    try {
      const collection: GalleryModel | any = await GallerySchema.find({}, props)
      //.populate({path: 'category', model: CategorySchema})
      const total:number = await GallerySchema.count()

      let items: any = {
        items: collection,
        total: total
      }
      return items
    } catch (error) {
      return null
    }
  }

  async getOne (name: string): Promise<IGalleryResponse> {
    try {
      const collection: GalleryModel | any = await GallerySchema.findOne({ sku: name }, props)

      return collection
    } catch (error) {
     return null
    }
  }


  async getById (id: string): Promise<IGalleryResponse> {
    try {
      const collection: GalleryModel | any = await GallerySchema.findById(id, props)
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


  async delete (id: string): Promise<IGalleryResponse> {
    try {

      const collectionRemoveItem: GalleryModel | any = await GallerySchema.findByIdAndDelete(id)
      
      const collectionProduct: GalleryModel | any = await ProductSchema.findById(collectionRemoveItem.product)
    
      let products = await collectionProduct.galleries;

      const index = products.indexOf(id);
      if (index > -1) {
        products.splice(index, 1);
      }


      await ProductSchema.findByIdAndUpdate({_id: collectionRemoveItem.product}, {$set: {galleries: products}})

      return  collectionRemoveItem
      
    } catch (error) {
      return null
    }
  }

  async count (value?: any): Promise<IGalleryResponse> {
    try {
      const collection: GalleryModel | any = await GallerySchema.count(value)
      return collection
    } catch (error) {
      return null
    }
  }

  async select (value: any): Promise<IGalleryResponse> {
    try {
      const collection: GalleryModel | any = await GallerySchema.find(value, props)
      return collection
    } catch (error) {
      return null
    }
  }

  async getGalleriesByProductId (id: string): Promise<IGalleryResponse> {
    try {
      const items = await GallerySchema.find({ product: id }).select('-__v').lean(); // Obtiene 
      const newCollection: any  = items.map(item=>{
        const {_id,description,created_at,image,order,product} = item;
        return {
        id:_id,
        description,
        image,
        order,
        created_at,
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

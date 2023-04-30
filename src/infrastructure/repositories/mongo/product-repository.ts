import { ProductModel } from "../../../domian/entities/product";
import { IProductRepository } from "../../../domian/repositories/product-repository";
import { IProductResponse } from "../../../domian/use-cases/product/products";

import ProductSchema from '../../persistence/mongo/product-schema'
import CategorySchema from '../../persistence/mongo/category-schema'
import GallerySchema from "../../persistence/mongo/gallery-schema"
import ItemSchema from "../../persistence/mongo/item-schema"
// id?: string
// _id?: string
// name: string;
// description: string;
// price: number;
// offer_price?: number;
// details: string;
// slug: string;
// text_offer: string;
// image: string;
// n_sales? : number;
// n_points? : number;
// activated: boolean;
// created_at: Date;
// activated_at: Date;
// sku: string;
// quantity: number;
// id_category: string;
// gallery? :any;

const props = 'id name description price offer_price details slug text_offer n_sales n_points activated created_at activated_at sku quantity image id_category gallery'

export class ProductMongoRepository implements IProductRepository {
  async updateProductByQuantity (id: string, quantity: number) : Promise<IProductResponse>{
    try {
      const product: ProductModel | null = await ProductSchema.findById(id)

      const currentQuantity: number = product.quantity;
      const currentnsales: number = product.n_sales;
      const newQuantity: number = currentQuantity - quantity;
      const newNSales: number = currentnsales + currentnsales;

      await ProductSchema.findByIdAndUpdate(
        id,
        { $set: { quantity: newQuantity, n_sales :newNSales } },
        { new: true, useFindAndModify: false }
      );
  
      return {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        offer_price: product.offer_price,
        details: product.details,
        slug: product.slug,
        text_offer: product.text_offer,
        image: product.image,
        n_sales: product.n_sales,
        n_points: product.n_points,
        activated: product.activated,
        created_at: product.created_at,
        activated_at: product.activated_at,
        sku: product.sku,
        quantity: newQuantity,
        id_category: product.id_category,
        gallery: product.gallery
      };
    } catch (error) {
      console.log(error)
    }
  }

 async getProductsByCategoryId(id: string) : Promise<IProductResponse>{
  try {
    const products = await ProductSchema.find({ id_category: id });
    
    return products;
  } catch (error) {
    console.log(error)
  }
 }


  async add(productData: ProductModel): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.create(productData)
      //const categoryDb: any = await CategorySchema.findById(collection.category)

      await collection.save()

      //const resultPush = await categoryDb.products.push(collection.id)
      // console.log('send Push', resultPush);

      // await categoryDb.save()

      return collection
    } catch (error) {
      console.log(error)
    }
  }
  async getAll(): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.find({})
        .populate({ path: 'id_category', model: CategorySchema })
      const total: number = await ProductSchema.countDocuments()


      return collection
    } catch (error) {
      console.log(error)
    }
  }
  getOne: (email: string) => Promise<IProductResponse>;

  async getById (id: string): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.findById(id, props)
      .populate({path: 'id_category', model: CategorySchema})
      .populate({path: 'gallery', model: GallerySchema})
      .populate({path: 'items', model: ItemSchema})


      if(!collection) return null;
      
      
      const { _id,
        name,
        description,
        price,
        offer_price,
        details,
        slug,
        text_offer,
        image,
        n_sales,
        n_points,
        activated,
        created_at,
        activated_at,
        sku,
        quantity,
        id_category,
        gallery,items
       } = collection

        const newCollection: any = { 
          id:_id,
          name,
          description,
          price,
          offer_price,
          details,
          slug,
          text_offer,
          image,
          n_sales,
          n_points,
          activated,
          created_at,
          activated_at,
          sku,
          quantity,
          id_category,
          items,
          gallery,}

        let product: any = {
          product: newCollection
        }
        
        return product
    } catch (error) {
      console.log(error)
    }
  }
  async delete(id: string): Promise<IProductResponse> {
    try {
      const collectionRemoveProduct: ProductModel | any = await ProductSchema.findByIdAndDelete(id)

      return collectionRemoveProduct
    } catch (error) {
      console.log(error)
    }
  }
  async update (id: string, body: ProductModel): Promise<IProductResponse> {
    try {
      const collection: ProductModel | any = await ProductSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
      const { _id,
        name,
        description,
        price,
        offer_price,
        details,
        slug,
        text_offer,
        image,
        n_sales,
        n_points,
        activated,
        created_at,
        activated_at,
        sku,
        quantity,
        id_category,
        gallery} = collection
      const newCollection: any = { 
        id:_id,
          name,
          description,
          price,
          offer_price,
          details,
          slug,
          text_offer,
          image,
          n_sales,
          n_points,
          activated,
          created_at,
          activated_at,
          sku,
          quantity,
          id_category,
          gallery,
      }

        
        
        return newCollection
    } catch (error) {
      console.log(error)
    }
  }
  count: (value?: any) => Promise<IProductResponse>;
  select: (value?: any) => Promise<IProductResponse>;

}

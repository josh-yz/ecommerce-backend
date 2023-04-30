import { ProductModel } from "../../../domian/entities/product";
import { IProductRepository } from "../../../domian/repositories/product-repository";
import { IProduct, IProductResponse } from "../../../domian/use-cases/product/products";



export class DbAddProduct implements IProduct {

    constructor(private readonly iProductRepository: IProductRepository) {
        this.iProductRepository = iProductRepository
    }


    async add(product: ProductModel): Promise<IProductResponse> {
        const productDb = await this.iProductRepository.add(product);
        return new Promise(resolve =>  resolve(
            productDb
        ))
    }

    async getAll (product: IProductResponse []): Promise<IProductResponse> {

      const newObj : any = product.map(x => {
        const category : any = x.id_category[0];
        

        /// ver  aqui el error que sale un dato binario
        return {
          id: x._id, 
          n_sales: x.n_sales,
          n_points: x.n_points,
          id_category : category,
          category: category,
          gallery: x.gallery,
          name: x.name,
          description: x.description ,
          price: x.price ,
          offer_price: x.offer_price ,
          details: x.details,
          text_offer: x.text_offer ,
          image: x.image,
          activated: x.activated,
          sku: x.sku,
          quantity: x.quantity,
          slug: x.slug,
          created_at: x.created_at,
          activated_at: x.activated_at,
        }
    });
      return new Promise(resolve => resolve(
         newObj
      ))
    }

    async get (product: ProductModel): Promise<IProductResponse> {
      return new Promise(resolve => resolve(
        product
      ))
    }


    
    async update (id: string, body: ProductModel): Promise<IProductResponse> {
      
      const productUpdated = await this.iProductRepository.update(id, body)

      if(!productUpdated) throw(new Error('Error to updated product'))
      
      return new Promise(resolve => resolve(
        productUpdated
      ))
    }

    
    async remove (product: IProductResponse): Promise<IProductResponse> {
      let { id } = product
      const deleteProduct = await this.iProductRepository.delete(id)
      return new Promise(resolve => resolve(
        deleteProduct
      ))
    }

}
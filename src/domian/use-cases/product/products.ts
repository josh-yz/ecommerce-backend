import { ProductModel } from '../../entities/product';

export interface IProductResponse {
    id?: string
    _id?: string
    name: string;
    description: string;
    price: number;
    offer_price?: number;
    details: string;
    slug: string;
    text_offer: string;
    image: string;
    n_sales? : number;
    n_points? : number;
    activated: boolean;
    created_at?: Date;
    activated_at?: Date;
    sku: string;
    quantity: number;
    id_category: string;
    gallery? :any;
}


export interface IProduct {
  add: (product: ProductModel) => Promise<IProductResponse>
  get?: (id: ProductModel) => Promise<IProductResponse>
  getAll?: (product: IProductResponse[]) => Promise<IProductResponse>
  update?: (id: string, body: any) => Promise<IProductResponse>
  remove?: (id: ProductModel) => Promise<IProductResponse>
}

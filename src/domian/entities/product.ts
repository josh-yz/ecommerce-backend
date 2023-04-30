export class ProductModel {
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
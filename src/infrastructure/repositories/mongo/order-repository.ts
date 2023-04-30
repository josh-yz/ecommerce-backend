import { CartModel } from "../../../domian/entities/cart";
import { ICartRepository } from "../../../domian/repositories/cart-repository";
import { ICartResponse } from "../../../domian/use-cases/cart/cart";

import { ProductModel } from "../../../domian/entities/product";

import CartSchema from '../../persistence/mongo/cart-shema';
import OrderSchema from '../../persistence/mongo/order-shema';
import ProductSchema from '../../persistence/mongo/product-schema'
import UserSchema from "../../persistence/mongo/user-schema";
import ItemSchema from "../../persistence/mongo/item-schema"
import { IOrderRepository } from "../../../domian/repositories/order-repository";
import { OrderModel } from "../../../domian/entities/order";
import { IOrderResponse } from "../../../domian/use-cases/order/order";


const props = 'id name description price offer_price details slug text_offer n_sales n_points activated created_at activated_at sku quantity image id_category gallery'

const propsProduct = 'id name description price slug created_at sku quantity image id_category'

export class OrderMongoRepository implements IOrderRepository {
    async add(orderData: OrderModel): Promise<IOrderResponse> {
        try {
            console.log(orderData.products);
            
            const collection: OrderModel | any = await OrderSchema.create(orderData)
            // collection.product.push(orderData.product);
            await collection.save()
            return collection
        } catch (error) {

        }


    }
    async getById(id: string): Promise<IOrderResponse> {
        try {
            const collection: OrderModel | any = await OrderSchema.findById(id)
            return collection
        } catch (error) {

        }
    }
    async getOrderByUserId(id: string): Promise<IOrderResponse> {
        try {
            const order = await OrderSchema.find({ user: id })
                .populate('products._id', propsProduct)
            return order;
        } catch (error) {
            return null

        }
    }
    delete: (id: string) => Promise<IOrderResponse>;
    update: (id: string, body: OrderModel) => Promise<IOrderResponse>;
    count: (value?: any) => Promise<IOrderResponse>;
    select: (value?: any) => Promise<IOrderResponse>;
    getAll: () => Promise<IOrderResponse[]>;
    getOne: (data: string) => Promise<IOrderResponse>;

}
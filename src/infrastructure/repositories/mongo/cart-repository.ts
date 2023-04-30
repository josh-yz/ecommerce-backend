import { CartModel } from "../../../domian/entities/cart";
import { ICartRepository } from "../../../domian/repositories/cart-repository";
import { ICartResponse } from "../../../domian/use-cases/cart/cart";

import { ProductModel } from "../../../domian/entities/product";

import CartSchema from '../../persistence/mongo/cart-shema';
import ProductSchema from '../../persistence/mongo/product-schema'
import UserSchema from "../../persistence/mongo/user-schema";
import ItemSchema from "../../persistence/mongo/item-schema"


const props = 'id name description price offer_price details slug text_offer n_sales n_points activated created_at activated_at sku quantity image id_category gallery'

const propsProduct = 'id name description price slug created_at sku quantity image id_category'

export class CartMongoRepository implements ICartRepository {
    async getCarExiststByUserId(id: string): Promise<ICartResponse> {
        try {
            const cart = await CartSchema.findOne({ user: id })
            return cart;
        } catch (error) {
           return null;
        }
    }
    async removeProduct(id: string, product_id: string): Promise<ICartResponse> {
        try {
            const collection: CartModel | any = await CartSchema.findById(id);
            const product = collection.products.find(p => p._id.equals(product_id));
            if (product) {
                const productIndex = collection.products.findIndex(p => p._id.equals(product_id));
                collection.products.splice(productIndex, 1);
                const totalPrice = collection.products.reduce((acc, product) => {
                    return acc + (product.price * product.quantity);
                }, 0);
                collection.total = totalPrice
                await collection.save();
            }


            return collection;
        } catch (error) {
            return null
        }
    }
    async addProduct(id: string, body: any): Promise<ICartResponse> {
        try {
            const collection: CartModel | any = await CartSchema.findById(id);
            const existingProduct = collection.products.find(p => p._id.equals(body._id));
            if (existingProduct) {
                existingProduct.quantity = body.quantity;
                existingProduct.price = body.price;
                existingProduct.item = body.item;
            } else {
                collection.products.push({
                    _id: body._id,
                    item: body.item,
                    quantity: body.quantity,
                    price: body.price
                });
            }

            const totalPrice = collection.products.reduce((acc, product) => {
                return acc + (product.price * product.quantity);
            }, 0);

            collection.total = totalPrice

            await collection.save();
            return collection;
        } catch (error) {
            return null
        }
    }
    async add(cartData: CartModel): Promise<ICartResponse> {
        try {
    
            const collection: CartModel | any = await CartSchema.create(cartData)
            const productDb: any = await ProductSchema.findById(cartData.product._id)
            const resultPush = await collection.products.push(cartData.product)
            await collection.save()
            return collection
        } catch (error) {
         return null
        }
    }


    getAll: () => Promise<ICartResponse[]>;
    getOne: (email: string) => Promise<ICartResponse>;
    async getById(id: string): Promise<ICartResponse> {
        try {
            const collection: CartModel | any = await CartSchema.findById(id)
            return collection
        } catch (error) {

        }
    }
    async getCartByUserId(id: string): Promise<ICartResponse> {
        try {
                const cart = await CartSchema.findOne({ user: id })
                    .populate('products._id', propsProduct)


                return cart;

        } catch (error) {
            return null;


        }
    }
    async delete(id: string): Promise<ICartResponse> {
        try {
            const collectionRemoveCart: CartModel | any = await CartSchema.findByIdAndDelete(id)
            return collectionRemoveCart
        } catch (error) {
            return null
        }
    }
    update: (id: string, body: CartModel) => Promise<ICartResponse>;
    count: (value?: any) => Promise<ICartResponse>;
    select: (value?: any) => Promise<ICartResponse>;

}
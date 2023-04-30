import { CartModel } from "../../../domian/entities/cart";
import { ICartRepository } from "../../../domian/repositories/cart-repository";
import { ICart, ICartResponse } from "../../../domian/use-cases/cart/cart";



export class DbCart implements ICart {


    constructor(
        private readonly iCartRepository: ICartRepository) {
        this.iCartRepository = iCartRepository
    }

    async add(cart: CartModel): Promise<ICartResponse> {
        const productDb = await this.iCartRepository.add(cart);
        return new Promise(resolve => resolve(
            productDb
        ))
    }
    async get(cartModel: CartModel): Promise<ICartResponse> {
        return new Promise(resolve => resolve(
            cartModel
        ))
    }
    async getAll?(cart: ICartResponse[]): Promise<ICartResponse[]> {
        return new Promise(resolve => resolve(
            cart
        ))
    }
    async update(id: string, body: any): Promise<ICartResponse> {
        const cartUpdated = await this.iCartRepository.update(id, body)

        if (!cartUpdated) throw (new Error('Error to updated product'))

        return new Promise(resolve => resolve(
            cartUpdated
        ))
    }
    async remove?(cart: CartModel): Promise<ICartResponse> {
        let { id } = cart
        const deleteCart = await this.iCartRepository.delete(id)
        return new Promise(resolve => resolve(
            deleteCart
        ))
    }
}
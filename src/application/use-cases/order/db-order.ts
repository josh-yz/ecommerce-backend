import { CartModel } from "../../../domian/entities/cart";
import { OrderModel } from "../../../domian/entities/order";
import { IOrderRepository } from "../../../domian/repositories/order-repository";
import { IOrder, IOrderResponse } from "../../../domian/use-cases/order/order";



export class DbOrder implements IOrder {

    constructor(
        private readonly iOrderRepository: IOrderRepository) {
        this.iOrderRepository = iOrderRepository
    }
    async add(order: OrderModel): Promise<IOrderResponse> {
        const ordertDb = await this.iOrderRepository.add(order);
        return new Promise(resolve => resolve(
            ordertDb
        ))
    }
    async get(orderModel: OrderModel): Promise<IOrderResponse> {
        return new Promise(resolve => resolve(
            orderModel
        ))
    }
    async getAll(order: IOrderResponse[]): Promise<IOrderResponse[]> {
        return new Promise(resolve => resolve(
            order
        ))
    }
    update?: (id: string, body: any) => Promise<IOrderResponse>;
    remove?: (id: CartModel) => Promise<IOrderResponse>;

}
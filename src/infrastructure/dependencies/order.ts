import { GetOrdersUserController } from './../web/controllers/order/order';
import { DbOrder } from './../../application/use-cases/order/db-order';
import { DbCart } from './../../application/use-cases/cart/db-cart';
import { CartMongoRepository } from "../repositories/mongo/cart-repository";
import { ItemMongoRepository } from "../repositories/mongo/item-repository";
import { ProductMongoRepository } from "../repositories/mongo/product-repository";
import { UserMongoRepository } from "../repositories/mongo/user-repository";
import { GetCartUserController, RegisterCartController, RemoveCartController, RemoveCartProductController } from "../web/controllers/cart/cart";
import {  RegisterOrderController } from '../web/controllers/order/order';
import { MailProvider } from '../../utils-adapters/nodemailer-adapter';
import { Uuid } from '../../utils-adapters/uuid-adapter';
import { OrderMongoRepository } from '../repositories/mongo/order-repository';


export const makeRegisterOrderController = (): RegisterOrderController => {
    const productMongoRepository = new ProductMongoRepository()
    const userMongoRepository = new UserMongoRepository()
    const cartMongoRepository = new CartMongoRepository()
    const orderMongoRepository = new OrderMongoRepository()
    const uuid = new Uuid();
    const mailProvider = new MailProvider()
    const dbOrder = new DbOrder(orderMongoRepository)
    const dbCart = new DbCart(cartMongoRepository)
    const registerOrderController = new RegisterOrderController(
        dbOrder, productMongoRepository, userMongoRepository, cartMongoRepository, orderMongoRepository, uuid, mailProvider,dbCart)
    return registerOrderController
}

export const makeGetOrderstUserController = (): GetOrdersUserController => {
    const orderMongoRepository = new OrderMongoRepository()
    const dbOrder = new DbOrder(orderMongoRepository)
    const getOrdersUserController = new GetOrdersUserController(dbOrder, orderMongoRepository)
    return getOrdersUserController;
}






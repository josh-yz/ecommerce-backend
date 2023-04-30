import { DbCart } from './../../application/use-cases/cart/db-cart';
import { CartMongoRepository } from "../repositories/mongo/cart-repository";
import { ItemMongoRepository } from "../repositories/mongo/item-repository";
import { ProductMongoRepository } from "../repositories/mongo/product-repository";
import { UserMongoRepository } from "../repositories/mongo/user-repository";
import { GetCartUserController, RegisterCartController, RemoveCartController, RemoveCartProductController } from "../web/controllers/cart/cart";


export const makeRegisterCartController = (): RegisterCartController => {
    const productMongoRepository = new ProductMongoRepository()
    const cartMongoRepository = new CartMongoRepository()
    const itemMongoRepository = new ItemMongoRepository()
    const userMongoRepository = new UserMongoRepository()
    const dbCart = new DbCart(cartMongoRepository)
    const registerCartController = new RegisterCartController(dbCart, productMongoRepository,userMongoRepository, cartMongoRepository,itemMongoRepository)
    return registerCartController
}

export const makeRemoveCartProductController = (): RemoveCartProductController => {
    const productMongoRepository = new ProductMongoRepository()
    const cartMongoRepository = new CartMongoRepository()
    const userMongoRepository = new UserMongoRepository()
    const dbCart = new DbCart(cartMongoRepository)
    const removeCartProductController = new RemoveCartProductController(dbCart, productMongoRepository,userMongoRepository, cartMongoRepository)
    return removeCartProductController;
}

export const makeRemoveCartController = (): RemoveCartController => {
    const cartMongoRepository = new CartMongoRepository()
    const dbCart = new DbCart(cartMongoRepository)
    const removeCartController = new RemoveCartController(dbCart, cartMongoRepository)
    return removeCartController;
}

export const makeGetCartUserController = (): GetCartUserController => {
    const cartMongoRepository = new CartMongoRepository()
    const dbCart = new DbCart(cartMongoRepository)
    const getCartUserController = new GetCartUserController(dbCart, cartMongoRepository)
    return getCartUserController;
}





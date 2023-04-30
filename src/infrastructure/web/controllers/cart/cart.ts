import { noContent, notFound, success } from './../../helpers/http-helper';
import { CartModel } from "../../../../domian/entities/cart";
import { ICartRepository } from "../../../../domian/repositories/cart-repository";
import { IItemRepository } from "../../../../domian/repositories/item-repository";
import { IProductRepository } from "../../../../domian/repositories/product-repository";
import { IUserRepository } from "../../../../domian/repositories/user-repository";
import { ICart } from "../../../../domian/use-cases/cart/cart";
import { InvalidParamError, MissingParamError } from "../../errors";
import { ErrorMessage } from "../../errors/errorMessage";
import { badRequest, created, serverError } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse } from "../../interfaces";
import { Controller } from "../../interfaces/controller";


export class GetCartUserController implements Controller {

    constructor(
        private readonly iCart: ICart,
        private readonly iCartRepository: ICartRepository,
      ){
      this.iCart = iCart
      this.iCartRepository = iCartRepository
  
    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const user_id = httpRequest.params.user_id
        
        const cartDb: any = await this.iCartRepository.getCartByUserId(user_id)
        
        if(!cartDb) return noContent()
        const DTOCart= await this.iCart.get(cartDb)
        return success(DTOCart)
      } catch (error) {
        
          
        return serverError(error)
      }
    }
  }


export class RemoveCartController implements Controller {

    constructor(
        private readonly iCart: ICart,
        private readonly iCartRepository: ICartRepository,
      ){
      this.iCart = iCart
      this.iCartRepository = iCartRepository
    }
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const cart_id = httpRequest.params.cart_id
        const cartDb: any = await this.iCartRepository.getById(cart_id)
        if(!cartDb) return badRequest(new InvalidParamError(cart_id))
        const DTOCart = await this.iCart.remove(cartDb)
        return success(DTOCart)
      } catch (error) {
        return serverError(error)
      }
    }
  }


export class RemoveCartProductController implements Controller {
    constructor(
        private readonly iCart: ICart,
        private readonly iProductRepository: IProductRepository,
        private readonly iUserRepository: IUserRepository,
        private readonly iCartRepository: ICartRepository,
    ) {
        this.iCart = iCart
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['user_id', 'product_id']
            for (const field of requiredField) {
                if (!httpRequest.params[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            let { user_id, product_id } = httpRequest.params
            const productDb: any = await this.iProductRepository.getById(product_id)
            if (!productDb) return badRequest(new InvalidParamError(`producto ${product_id} no existe.`))
            const userDb: any = await this.iUserRepository.getById(user_id);
            if (!userDb) return badRequest(new InvalidParamError(`usuario ${user_id} no existe.`))
            const cartDb: any = await this.iCartRepository.getCartByUserId(user_id)
            if (!cartDb) return badRequest(new InvalidParamError(`Carrito no existe.😲`))
            const DTOCart = await this.iCartRepository.removeProduct(cartDb._id, product_id);
            return success(DTOCart)
        } catch (error) {     
            return serverError(error)
        }
    }
}

export class RegisterCartController implements Controller {

    constructor(
        private readonly iCart: ICart,
        private readonly iProductRepository: IProductRepository,
        private readonly iUserRepository: IUserRepository,
        private readonly iCartRepository: ICartRepository,
        private readonly iItemRepository: IItemRepository,
    ) {
        this.iCart = iCart
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['quantity', 'user', 'product']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            let { product, user, quantity, item } = httpRequest.body
            const productDb: any = await this.iProductRepository.getById(product)
            if (!productDb) return badRequest(new InvalidParamError(`producto ${product} no existe.`))
            const productQuantity: number = productDb.product.quantity;
            if (quantity > productQuantity) return badRequest(new ErrorMessage(`Sobrepasa el stock`))
            const userDb: any = await this.iUserRepository.getById(user);
            if (!userDb) return badRequest(new InvalidParamError(`usuario ${user} no existe.`))
            let itemQuantity = 0;
            if (item) {
                const itemDb: any = await this.iItemRepository.getById(item)
                if (!itemDb) return badRequest(new ErrorMessage(`Item ${item} no existe.`))
                //Verificar si el item pertenece el producto
                const itemsProductDb: any = await this.iItemRepository.getItemsByProductId(product)
                if (itemsProductDb) {
                    const searchItem = itemsProductDb.item.find(x => x.id == item);
                    if (!searchItem) return badRequest(new ErrorMessage(`Item ${item} no existe en producto`))
                    itemQuantity = searchItem.price;
                }
            }
            const cartDb: any = await this.iCartRepository.getCarExiststByUserId(user)
            const priceFinal = itemQuantity ? itemQuantity : productDb.product.price
            if (cartDb) { // Si existe un carrito con la id el usuario
                const { _id } = cartDb;

                const DTOCart = await this.iCartRepository.addProduct(_id, {
                    _id: product,
                    quantity: quantity,
                    price: priceFinal,
                    item
                });
                const cartNew: any = await this.iCartRepository.getCartByUserId(user);
                return success(cartNew)
            } else { // no existe 

                const body: CartModel = {
                    product: {
                        _id: product,
                        quantity: quantity,
                        price: priceFinal,
                        item
                    },
                    user,
                    total: priceFinal * quantity,
                    created_at: new Date()
                }

                const DTOCart = await this.iCart.add(body);
                const cartNew: any = await this.iCartRepository.getCartByUserId(user);
                return success(cartNew)
            }

        } catch (error) {
            return serverError(error)

        }

    }

}
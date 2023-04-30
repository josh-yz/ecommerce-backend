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
import { IOrder } from '../../../../domian/use-cases/order/order';
import { IOrderRepository } from '../../../../domian/repositories/order-repository';
import { OrderModel } from '../../../../domian/entities/order';
import { Iuuid } from '../../interfaces/Iuuid';
import { IMailProvider } from '../../interfaces/mail-provider';


export class GetOrdersUserController implements Controller {

    constructor(
        private readonly iOrder: IOrder,
        private readonly iOrderRepository: IOrderRepository,
    ) {
        this.iOrder = iOrder
        this.iOrderRepository = iOrderRepository

    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const user_id = httpRequest.params.user_id

            const ordertDb: any = await this.iOrderRepository.getOrderByUserId(user_id)
            console.log(ordertDb);

            if (!ordertDb) return noContent()
            const DTOCart = await this.iOrder.get(ordertDb)
            return success(DTOCart)
        } catch (error) {
            return serverError(error)
        }
    }
}



export class RegisterOrderController implements Controller {

    constructor(
        private readonly iOrder: IOrder,
        private readonly iProductRepository: IProductRepository,
        private readonly iUserRepository: IUserRepository,
        private readonly iCartRepository: ICartRepository,
        private readonly iOrderRepository: IOrderRepository,
        private readonly iiuuid: Iuuid,
        private readonly mailProvider: IMailProvider,
        private readonly iCart: ICart,
    ) {
        this.iOrder = iOrder
        this.iiuuid = iiuuid
        this.mailProvider = mailProvider;
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['user', 'total', 'sub_total', 'address', 'method_payment']

            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            let { user, total, sub_total, address, method_payment, send_cost, note } = httpRequest.body
            const userDb: any = await this.iUserRepository.getById(user);
            if (!userDb) return badRequest(new InvalidParamError(`usuario ${user} no existe.`))
            const cartDb: any = await this.iCartRepository.getCartByUserId(user);
            if (!userDb) return badRequest(new InvalidParamError(`carrito ${user} no existe.`))
            const track = (await this.iiuuid.id()).toString().toUpperCase();
            const body: OrderModel = {
                products:cartDb.products,
                user,
                address,
                total,
                sub_total,
                note,
                send_cost,
                track,
                method_payment,
                created_at: new Date()
            }          
            const DTOOrder = await this.iOrder.add(body);

            const products = DTOOrder.products;
            ///Bajar el stock del producto
            for(const l of products){
                await this.iProductRepository.updateProductByQuantity(l._id,l.quantity);
            }
            //Borrar el carrito
            await this.iCart.remove(cartDb)
            await this.mailProvider.sendMail({
                to: {
                    name: userDb.name,
                    email: userDb.email
                },
                from: {
                    name: process.env.MAIL_USER,
                    email: process.env.MAIL_USER
                },
                subject: `ORDEN COMPRAR #${track}`,
                body: this.tableHTML(cartDb.products,total,sub_total)
            })




    
        return success(DTOOrder)

        } catch (error) {
            console.log(error);

            return serverError(error)

        }

    }

    tableHTML(products,total,subtotal) {
        // Función que crea un objeto con las propiedades que quieres mostrar en la tabla
        const crearObjetoTabla = ({ _id, item, quantity, price }) => ({
            id_category: _id.id_category,
            _id: _id._id,
            name: _id.name,
            description: _id.description,
            price: _id.price,
            image: _id.image,
            sku: _id.sku,
            quantity: _id.quantity,
            slug: _id.slug,
            created_at: _id.created_at,
            item,
            quantity_item: quantity,
            price_item: price
        });

        // Creas un nuevo arreglo de objetos aplicando la función a cada elemento del arreglo original
        const datosTabla = products.map(crearObjetoTabla);

        // Genera la tabla HTML a partir del nuevo arreglo
        const tablaHTML = `
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        ${datosTabla.map(({ id_category, _id, name, description, price, image, sku, quantity, slug, created_at, item, quantity_item, price_item }) => `
          <tr>
            <td>${name}</td>
            <td>${quantity_item}</td>
            <td>${price_item}</td>
          </tr>
        `).join('')}
        <tr>
    <td colspan="11"></td>
    <td>Subtotal:</td>
    <td>${subtotal}</td>
  </tr>
  <tr>
    <td colspan="11"></td>
    <td>Total:</td>
    <td>${total}</td>
  </tr>
      </tbody>
    </table>
  `;

        return tablaHTML
    }

}
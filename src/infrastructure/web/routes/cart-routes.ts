import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import { makeGetCartUserController, makeRegisterCartController, makeRemoveCartController, makeRemoveCartProductController } from '../../dependencies/cart'

import AuthenticationToken from '../middlewares/auth-middlewares'
export default (router: Router): void => {
    router.post('/cart', AdaptRoute(makeRegisterCartController()))
    router.delete('/cart/:user_id/product/:product_id',AdaptRoute(makeRemoveCartProductController()))
    router.delete('/cart/:cart_id', AdaptRoute(makeRemoveCartController()))
    router.get('/cart/:user_id', AdaptRoute(makeGetCartUserController()))
}
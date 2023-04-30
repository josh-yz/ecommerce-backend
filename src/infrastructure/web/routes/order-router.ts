import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import { makeGetCartUserController, makeRegisterCartController, makeRemoveCartController, makeRemoveCartProductController } from '../../dependencies/cart'
import { makeGetOrderstUserController, makeRegisterOrderController } from '../../dependencies/order'

import AuthenticationToken from '../middlewares/auth-middlewares'
export default (router: Router): void => {
    router.post('/order', AdaptRoute(makeRegisterOrderController()))
    router.get('/order/:user_id', AdaptRoute(makeGetOrderstUserController()))
}
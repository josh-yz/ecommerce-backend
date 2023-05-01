import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import { makeGetItemsProductByIdController, makeListItemsController, makeRegisterItemController, makeRemoveItemController } from '../../dependencies/item'

import AuthenticationToken from '../middlewares/auth-middlewares'

export default (router: Router): void => {
  router.post('/item/:product_id', AdaptRoute(makeRegisterItemController()))
  router.get('/item/', AdaptRoute(makeListItemsController()))
  router.delete('/item/:item_id', AuthenticationToken.veryfyAdminToken, AdaptRoute(makeRemoveItemController()))
  router.get('/item/:product_id', AuthenticationToken.veryfyAdminToken,  AdaptRoute(makeGetItemsProductByIdController()))
}
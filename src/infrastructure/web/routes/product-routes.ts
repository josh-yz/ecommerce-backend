import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import { makeGetProductController, makeListProductsCategoryController, makeListProductsController, makeRegisterProductController, makeRemoveProductController, makeUpdateProductController } from '../../dependencies/product'

import upload from '../middlewares/multter.config';
import AuthenticationToken from '../middlewares/auth-middlewares'





export default (router: Router): void => {
    router.get('/product/', AdaptRoute(makeListProductsController()))
    router.post('/product', upload('products',false), AuthenticationToken.veryfyAdminToken, AdaptRoute(makeRegisterProductController()))
    router.delete('/product/:product_id', AuthenticationToken.veryfyAdminToken, AdaptRoute(makeRemoveProductController()))

    router.put('/product/:product_id', AuthenticationToken.veryfyAdminToken, AdaptRoute(makeUpdateProductController()[0]))
    router.put('/product/data/:product_id',upload('products',false), AuthenticationToken.veryfyAdminToken, AdaptRoute(makeUpdateProductController()[1]))

    router.get('/product/:product_id', AdaptRoute(makeGetProductController()))

    router.get('/product/category/:category_id', AdaptRoute(makeListProductsCategoryController()))

}
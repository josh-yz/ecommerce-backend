import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import { makeCreateCategoryController, makeDeleteCategoryController, makeEditCategoryController, makeListCategoriesController } from '../../dependencies/category'
import { makeListProductsController } from '../../dependencies/product'
import AuthenticationToken from '../middlewares/auth-middlewares'


export default (router: Router): void => {
    router.post('/category', AuthenticationToken.veryfyAdminToken, AdaptRoute(makeCreateCategoryController()))
    router.get('/category', AdaptRoute(makeListCategoriesController()))
    router.put('/category/:id', AuthenticationToken.veryfyAdminToken, AdaptRoute(makeEditCategoryController()))
    router.delete('/category/:category_id', AuthenticationToken.veryfyAdminToken, AdaptRoute(makeDeleteCategoryController()))
}
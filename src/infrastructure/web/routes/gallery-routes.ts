import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import { makeGetGalleriesProductByIdController, makeRegisterGalleryController, makeRemoveGalleryController } from '../../dependencies/gallery'
import upload from '../middlewares/multter.config';
import AuthenticationToken from '../middlewares/auth-middlewares'

export default (router: Router): void => {
  router.post('/gallery/:product_id',upload('products',false), AdaptRoute(makeRegisterGalleryController()))
  router.delete('/gallery/:gallery_id', AuthenticationToken.veryfyAdminToken, AdaptRoute(makeRemoveGalleryController()))
  router.get('/gallery/:product_id', AuthenticationToken.veryfyAdminToken,  AdaptRoute(makeGetGalleriesProductByIdController()))
}
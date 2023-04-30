import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import { makeLoginAdminController, makeLoginController } from '../../dependencies/auth'

export default (router: Router): void => {
    router.post('/auth/admin', AdaptRoute(makeLoginAdminController())) 
    router.post('/auth/user', AdaptRoute(makeLoginController())) 
}
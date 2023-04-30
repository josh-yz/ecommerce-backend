import { Router } from 'express'
import { AdaptRoute } from '../../../utils-adapters/express-route-adapter'
import {  makeSignUpAdminController, makeSignUpController } from '../../dependencies/signup'
import { makeDeleteUserController, makeGetUserController, makeGetUsersController, makeUpdateUserController } from '../../dependencies/user'
import AuthenticationToken from '../middlewares/auth-middlewares'


//AuthenticationToken.veryfyAdminToken,

export default (router: Router): void => {
    router.post('/signup', AdaptRoute(makeSignUpController()))
    router.post('/signup/admin', AdaptRoute(makeSignUpAdminController()))

    router.get('/users',  AdaptRoute(makeGetUsersController()))
    router.put('/user/:id',  AdaptRoute(makeUpdateUserController()))
    router.delete('/user/:user_id',  AdaptRoute(makeDeleteUserController()))

    router.get('/user/:id/', AdaptRoute(makeGetUserController()))
}
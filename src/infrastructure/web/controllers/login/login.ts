import { GetUsers } from './../../../../domian/use-cases/user/get-user';
import { IAdminRepository } from "../../../../domian/repositories/admin-repository";
import { IUserRepository } from "../../../../domian/repositories/user-repository";
import { Authentication } from "../../../../domian/use-cases/authentication/authentication";
import { Dcryptography } from "../../../cryptgraphy/encryper";
import { InvalidParamError, MissingParamError } from "../../errors";
import { ErrorAuth } from "../../errors/error-auth";
import { badRequest, notFound, serverError, success } from "../../helpers/http-helper";
import { Controller, EmailValidator, HttpRequest, HttpResponse } from "../../interfaces";
import { IJwt } from '../../interfaces/jwt-token';


export class LoginController implements Controller {

    constructor(private readonly emailValidator: EmailValidator,
        private readonly authentication: Authentication,
        private readonly dcryptgraphy: Dcryptography,
        private readonly iUserRepository: IUserRepository) {
        this.emailValidator = emailValidator
        this.authentication = authentication
        this.dcryptgraphy = dcryptgraphy
    }


    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['email', 'password']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const user: { email, password } = httpRequest.body
            const isValid = this.emailValidator.isValid(user.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            const account: any = await this.iUserRepository.getOne(user.email)
            if (!account) {
                return notFound(`${user.email}`)
            }
            const passwordDcrypt = await this.dcryptgraphy.dencrypt(user.password, account.password)
            if (!passwordDcrypt) {
                return badRequest(new ErrorAuth())
            }
            const userAuth = await this.authentication.auth(user.email, user.password)
            return success(userAuth)
        } catch (error) {
            return serverError(error)
        }
    }

}


export class LoginAdminController implements Controller {
    constructor(private readonly emailValidator: EmailValidator,
        private readonly authentication: Authentication,
        private readonly dcryptgraphy: Dcryptography,
        private readonly iAdminRepository: IAdminRepository) {
        this.emailValidator = emailValidator
        this.authentication = authentication
        this.dcryptgraphy = dcryptgraphy
    }
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['email', 'password']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }
            const user: { email, password } = httpRequest.body
            const isValid = this.emailValidator.isValid(user.email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            const admin: any = await this.iAdminRepository.getOne(user.email)            
            if (!admin) {
                return notFound(`${user.email}`)
            }
            const passwordDcrypt = await this.dcryptgraphy.dencrypt(user.password, admin.password)
            if (!passwordDcrypt) {
                return badRequest(new ErrorAuth())
            }
            const userAuth = await this.authentication.authAdmin(user.email, user.password)
            return success(userAuth)
        } catch (error) {
            return serverError(error)
        }

    }



    

}


export class GetUserController implements Controller {
    constructor (
        private readonly iUserRepository: IUserRepository,
      private readonly getUsers: GetUsers) {
      this.iUserRepository = iUserRepository
      this.getUsers = getUsers
    }
  
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const id = httpRequest.params.id
        const user = await this.iUserRepository.getById(id)
        if(!user){
          return notFound('No exist Accounts')
        }
        const result = await this.getUsers.get(user)
        return success(result)
      } catch (error) {
        return serverError(error)
      }
    }
  }
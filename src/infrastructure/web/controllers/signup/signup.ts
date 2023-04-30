import { DeleteUser } from './../../../../domian/use-cases/user/delete-user';
import { UpdateUser } from './../../../../domian/use-cases/user/update-user';
import { AddAdmin } from './../../../../domian/use-cases/admin/add-admin';
import { AddUser } from './../../../../domian/use-cases/user/add-user';
import { EmailValidator, HttpRequest, HttpResponse } from "../../interfaces";
import { Controller } from "../../interfaces/controller";
import { IUserRepository } from '../../../../domian/repositories/user-repository';
import { badRequest, created, notFound, serverError, success } from '../../helpers/http-helper';
import { InvalidParamError, MissingParamError, ReadyExist } from '../../errors';
import { IAdminRepository } from '../../../../domian/repositories/admin-repository';
import { GetUsers } from '../../../../domian/use-cases/user/get-user';

export class SignUpController implements Controller {

    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly addUser: AddUser,
        private readonly iUserRepository: IUserRepository,
    ) {
        this.emailValidator = emailValidator
        this.addUser = addUser
        this.iUserRepository = iUserRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['name', 'email', 'password', 'passwordConfirmation', 'last_name']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { name, last_name, email, password, passwordConfirmation, role, phone_number, photo, activated, activated_at, address, age, prefix } = httpRequest.body

            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            const userReadyExist = await this.iUserRepository.getOne(email)
            if (userReadyExist) {
                return badRequest(new ReadyExist(email))
            }
            let photo_default = 'test_url'

            const body = {
                name, last_name, age, email, password, phone_number, prefix, address, role: role || 'USER_ROLE', photo: photo || photo_default, activated: false, activated_at, created_date: new Date()
            }
            const user = await this.addUser.add(body)
            return created(user)

        } catch (error) {
            return serverError(error)
        }

    }
}

export class SignUpAdminController implements Controller {

    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly AddAdmin: AddAdmin,
        private readonly iAdminRepository: IAdminRepository,
    ) {
        this.emailValidator = emailValidator
        this.AddAdmin = AddAdmin
        this.iAdminRepository = iAdminRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['name', 'email', 'password', 'passwordConfirmation', 'last_name']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { name, last_name, email, password, passwordConfirmation, role, photo, activated, activated_at } = httpRequest.body
            if (password !== passwordConfirmation) {
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            const userReadyExist = await this.iAdminRepository.getOne(email)
            if (userReadyExist) {
                return badRequest(new ReadyExist(email))
            }
            let photo_default = 'test_url'

            const body = {
                name, last_name, email, password, role: role || 'USER_ADMIN', photo: photo || photo_default, activated: false, activated_at, created_date: new Date()
            }
            const account = await this.AddAdmin.add(body)
            return success(account)

        } catch (error) {
            return serverError(error)
        }

    }

}

export class GetUsersController implements Controller {
    constructor(
        private readonly iUserRepository: IUserRepository,
        private readonly getUsers: GetUsers) {
        this.iUserRepository = iUserRepository
        this.getUsers = getUsers
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const countUsers = await this.iUserRepository.count()
            if (!countUsers) {
                return notFound('No exist Accounts')
            }
            const users = await this.iUserRepository.getAll()
            const result = await this.getUsers.get(users);
            const mergeObjects = {
                users: result,
                quantity: countUsers
            }
            return success(mergeObjects)
        } catch (error) {
            console.log(error)
            return serverError(error)
        }


    }

}

export class UpdateUserController implements Controller {

    constructor(
        private readonly emailValidator: EmailValidator,
        private readonly updateUser: UpdateUser,
        private readonly iUserRepository: IUserRepository,
    ) {
        this.updateUser = updateUser
        this.iUserRepository = iUserRepository
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const requiredField = ['name', 'email', 'last_name']
            for (const field of requiredField) {
                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field))
                }
            }

            const { name, last_name, email, role, phone_number, photo,country, address, age, prefix } = httpRequest.body

            const id = httpRequest.params.id

            const userDb: any = await this.iUserRepository.getById(id);


            if (!userDb) return badRequest(new InvalidParamError(id))


            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }
            let photo_default = 'test_url'
            const body = {
                name, last_name, age, email, phone_number,country, prefix, address, role: role || 'USER_ROLE', photo: photo || photo_default,
            }
            const account = await this.updateUser.edit(id, body)
            return success(account)

        } catch (error) {
            return serverError(error)
        }

    }
}

export class DeleteUserController implements Controller {
    constructor (
        private readonly iUserRepository: IUserRepository,
      private readonly deleteUser: DeleteUser
      ) {
      this.iUserRepository = iUserRepository
      this.deleteUser = deleteUser      
    }
    
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
        const user_id = await httpRequest.params.user_id
        const usertDb: any = await this.iUserRepository.getById(user_id)
        if (!usertDb) {
          return badRequest(new ReadyExist(user_id))
        }
        const account = await this.deleteUser.delete(user_id)
        return success(account)
      } catch (error) {
        console.log(error)
        return serverError(error)
      }
    }
  }

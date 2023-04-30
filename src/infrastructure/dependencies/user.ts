import { DbAddAdmin } from "../../application/use-cases/admin/db-add-user";
import { DbAddUser } from "../../application/use-cases/user/db-add-user";
import { DbDeleteUser } from "../../application/use-cases/user/db-delete-user";
import { DbGetUsers } from "../../application/use-cases/user/db-get-user";
import { DbUpdateUser } from "../../application/use-cases/user/db-update-user";
import { BcryptAdapter } from "../../utils-adapters/bcrypt-adapter";
import { EmailValidatorAdapter } from "../../utils-adapters/email-validator-adapter";
import { JwtAdapter } from "../../utils-adapters/jwt-adapter";
import { MailProvider } from "../../utils-adapters/nodemailer-adapter";
import { UserMongoRepository } from "../repositories/mongo/user-repository";
import { GetUserController } from "../web/controllers/login/login";
import { DeleteUserController, GetUsersController, UpdateUserController } from "../web/controllers/signup/signup";




export const makeGetUsersController = (): GetUsersController => {
    const userMongoRepository = new UserMongoRepository()
    const dbGetUsers = new DbGetUsers()
    const getUsersController = new GetUsersController(userMongoRepository, dbGetUsers)
    return getUsersController
}

export const makeUpdateUserController = (): UpdateUserController => {
    const salt = 10
    const userMongoRepository = new UserMongoRepository()
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const dbUpdateUser = new DbUpdateUser(bcryptAdapter, userMongoRepository,)
    const updateUserController = new UpdateUserController(emailValidatorAdapter, dbUpdateUser, userMongoRepository)
    return updateUserController
}

export const makeDeleteUserController = (): DeleteUserController => {
    const userMongoRepository = new UserMongoRepository()
    const dbDeleteUser = new DbDeleteUser(userMongoRepository,)
    const deleteUserController = new DeleteUserController(userMongoRepository, dbDeleteUser)
    return deleteUserController
}


export const makeGetUserController = (): GetUserController => {
    const userMongoRepository = new UserMongoRepository()
    const dbGetUsers = new DbGetUsers()
    const getUserController = new GetUserController(userMongoRepository, dbGetUsers)
    return getUserController
}
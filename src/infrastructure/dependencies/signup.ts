import { DbAddAdmin } from "../../application/use-cases/admin/db-add-user";
import { DbAddUser } from "../../application/use-cases/user/db-add-user";
import { BcryptAdapter } from "../../utils-adapters/bcrypt-adapter";
import { EmailValidatorAdapter } from "../../utils-adapters/email-validator-adapter";
import { JwtAdapter } from "../../utils-adapters/jwt-adapter";
import { MailProvider } from "../../utils-adapters/nodemailer-adapter";
import { UserMongoRepository } from "../repositories/mongo/user-repository";
import { AdminMongoRepository } from "../repositories/mongo/admin-repository";
import { GetUsersController, SignUpAdminController, SignUpController } from "../web/controllers/signup/signup";
import { DbGetUsers } from "../../application/use-cases/user/db-get-user";


export const makeSignUpController = (): SignUpController => {
    const salt = 10
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const userMongoRepository = new UserMongoRepository()
    const mailProvider = new MailProvider()
    const jwtAdapter = new JwtAdapter(process.env.AUTH_SECRET, process.env.EXPIRES_IN)
    const dbAddUser = new DbAddUser(bcryptAdapter, userMongoRepository, mailProvider, jwtAdapter)
    const signUpController = new SignUpController(emailValidatorAdapter, dbAddUser, userMongoRepository)
    return signUpController
}


export const makeSignUpAdminController = (): SignUpAdminController => {
    const salt = 10
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const adminMongoRepository = new AdminMongoRepository()
    const jwtAdapter = new JwtAdapter(process.env.AUTH_SECRET, process.env.EXPIRES_IN)
    const dbAddAdmin = new DbAddAdmin(bcryptAdapter, adminMongoRepository, jwtAdapter)
    const signUpController = new SignUpAdminController(emailValidatorAdapter,dbAddAdmin, adminMongoRepository)
    return signUpController
}


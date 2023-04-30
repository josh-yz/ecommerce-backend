import { DbAuth } from "../../application/use-cases/authentication/db-authentication"
import { DcryptAdapter } from "../../utils-adapters/bcrypt-adapter"
import { EmailValidatorAdapter } from "../../utils-adapters/email-validator-adapter"
import { JwtAdapter } from "../../utils-adapters/jwt-adapter"
import { UserMongoRepository } from "../repositories/mongo/user-repository"
import { AdminMongoRepository } from "../repositories/mongo/admin-repository"
import { LoginAdminController, LoginController } from "../web/controllers/login/login"

export const makeLoginController = (): LoginController => {
    const seed = process.env.AUTH_SECRET
    const expiresIn = process.env.EXPIRES_IN
    const jwtAdapter = new JwtAdapter(seed, expiresIn)
    const userMongoRepository = new UserMongoRepository()
    const adminMongoRepository = new AdminMongoRepository()
    const dbauth = new DbAuth(jwtAdapter, adminMongoRepository,userMongoRepository)
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const dcryptAdapter = new DcryptAdapter()
    const loginController = new LoginController(emailValidatorAdapter, dbauth, dcryptAdapter, userMongoRepository)
    return loginController
  }


  export const makeLoginAdminController = (): LoginAdminController => {
    const seed = process.env.AUTH_SECRET
    const expiresIn = process.env.EXPIRES_IN
    const jwtAdapter = new JwtAdapter(seed, expiresIn)
    const userMongoRepository = new UserMongoRepository()
    const adminMongoRepository = new AdminMongoRepository()
    const dbauth = new DbAuth(jwtAdapter, adminMongoRepository,userMongoRepository)
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const dcryptAdapter = new DcryptAdapter()
    const loginAdminController = new LoginAdminController(emailValidatorAdapter, dbauth, dcryptAdapter, adminMongoRepository)
    return loginAdminController
  }



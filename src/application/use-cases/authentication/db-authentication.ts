import { AdminModel } from "../../../domian/entities/admin";
import { UserModel } from "../../../domian/entities/user";
import { IAdminRepository } from "../../../domian/repositories/admin-repository";
import { IUserRepository } from "../../../domian/repositories/user-repository";
import { Authentication } from "../../../domian/use-cases/authentication/authentication";
import { IJwt } from "../../../infrastructure/web/interfaces/jwt-token";



export class DbAuth implements Authentication {

    constructor(
        private readonly iJwt: IJwt,
        private readonly iAdminRepository: IAdminRepository,
        private readonly iUserRepository: IUserRepository,
    ){
        this.iJwt = iJwt
        this.iAdminRepository = iAdminRepository
        this.iUserRepository = iUserRepository    
    }
    
    
   async auth (email: string): Promise<UserModel>{
       try {
        const userDB: any = await this.iUserRepository.getOne(email)
        const User: any = {
            id: userDB._id,
            name: userDB.name,
            email: userDB.email,
            role: userDB.role,
            last_name: userDB.last_name,
            phone: userDB.phone,
            photo: userDB.photo,
            activated: userDB.activated,
            created_date: userDB.created_date,
            activated_at: userDB.activated_at,
          }

          const token = await this.iJwt.token(User.id, User.role)
          if (!token) {
            throw Error('NO exist Token in the data')
          }

          const newUser: any = {
            User,
            token
          }    
          return newUser 
       } catch (error) {
        return error.message
       }
   }



    async authAdmin (email: string) : Promise<AdminModel>{
        try {
            const userDB: any = await this.iAdminRepository.getOne(email)            
            const User: any = {
                id: userDB._id,
                name: userDB.name,
                email: userDB.email,
                role: userDB.role,
                last_name: userDB.last_name,
                photo: userDB.photo,
                activated: userDB.activated,
                created_date: userDB.created_date,
                activated_at: userDB.activated_at,
              }
    
              const token = await this.iJwt.token(User.id, User.role)
              if (!token) {
                throw Error('NO exist Token in the data')
              }
    
              const newAdmin: any = {
                User,
                token
              }    
              return newAdmin 
           } catch (error) {
            return error.message
           }
    }
    
}
import { UserModel } from '../../../domian/entities/user';
import { IUserRepository } from '../../../domian/repositories/user-repository';
import { Cryptography } from '../../../infrastructure/cryptgraphy/encryper';
import { IJwt } from '../../../infrastructure/web/interfaces/jwt-token';
import { IMailProvider } from '../../../infrastructure/web/interfaces/mail-provider';
import { AddUser, AddUserModel } from './../../../domian/use-cases/user/add-user';



export class DbAddUser implements AddUser {

    constructor(
        private readonly cryptgraphy: Cryptography,
        private readonly iUserRepository: IUserRepository,
        private readonly mailProvider: IMailProvider,
        private readonly iJwt: IJwt,
    ) {
        this.cryptgraphy = cryptgraphy
        this.iUserRepository = iUserRepository
        this.iJwt = iJwt
    }

    async add(user: UserModel): Promise<AddUserModel> {
        user.password = await this.cryptgraphy.encrypt(user.password)

        
        let userDB: any = await this.iUserRepository.add(user)

        const { id, role } = userDB

        const token = await this.iJwt.token(id, 'joshua')

        console.log(token);


        let User: any = {
            User: userDB,
            token
        }

        return new Promise(resolve => resolve(
            User

        ))


    }

}
import { UserModel } from '../../../domian/entities/user';
import { IUserRepository } from '../../../domian/repositories/user-repository';
import { AddUserModel, UpdateUser } from '../../../domian/use-cases/user/update-user';
import { Cryptography } from '../../../infrastructure/cryptgraphy/encryper';
import { IJwt } from '../../../infrastructure/web/interfaces/jwt-token';
import { IMailProvider } from '../../../infrastructure/web/interfaces/mail-provider';




export class DbUpdateUser implements UpdateUser {

    constructor(
        private readonly cryptgraphy: Cryptography,
        private readonly iUserRepository: IUserRepository,
    ) {
        this.cryptgraphy = cryptgraphy
        this.iUserRepository = iUserRepository
    }

    async edit(id: string,body: UserModel): Promise<AddUserModel> {
        if (body.password){
            body.password = await this.cryptgraphy.encrypt(body.password)
        }
        let userUpdated: any = await this.iUserRepository.update(id,body)

        let User: any = {
            User: userUpdated,
        }
        return new Promise(resolve => resolve(
            User
        ))
    }

}
import { AdminModel } from '../../../domian/entities/admin';
import { UserModel } from '../../../domian/entities/user'
import { IAdminRepository } from '../../../domian/repositories/admin-repository';
import { AddAdmin, AddAdminModel } from '../../../domian/use-cases/admin/add-admin';
import { Cryptography } from '../../../infrastructure/cryptgraphy/encryper';
import { IJwt } from '../../../infrastructure/web/interfaces/jwt-token';
import { IMailProvider } from '../../../infrastructure/web/interfaces/mail-provider';




export class DbAddAdmin implements AddAdmin {

    constructor(
        private readonly cryptgraphy: Cryptography,
        private readonly iAdminRepository: IAdminRepository,
        private readonly iJwt: IJwt,
    ) {
        this.cryptgraphy = cryptgraphy
        this.iAdminRepository = iAdminRepository
        this.iJwt = iJwt
    }
    async add (admin: AdminModel) : Promise<AddAdminModel> {
        admin.password = await this.cryptgraphy.encrypt(admin.password)
        let adminDB: any = await this.iAdminRepository.add(admin)

        const { id, role } = adminDB

        const token = await this.iJwt.token(id, role)



        let Admin: any = {
            admin: adminDB,
            token
        }

        return new Promise(resolve => resolve(
            Admin
        ))

    }

}
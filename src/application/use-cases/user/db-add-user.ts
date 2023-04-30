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
        try {
            user.password = await this.cryptgraphy.encrypt(user.password)
            let userDB: any = await this.iUserRepository.add(user)
    
            const { id, role,name,last_name,email } = userDB
    
            const token = await this.iJwt.token(id, 'EWEWEEE')
    
            await this.mailProvider.sendMail({
                to: {
                    name: `${name} ${user.last_name}`.toUpperCase(),
                    email: user.email
                },
                from: {
                    name: process.env.MAIL_USER,
                    email: process.env.MAIL_USER
                },
                subject: `"¡Gracias por unirte! Bienvenido/a ${name} ${last_name}".`,
                body: `
                ¡Hola y bienvenido/a!
    
                Nos complace mucho tenerte como parte de nuestra comunidad. ¡Gracias por unirte a nosotros! Esperamos que disfrutes de todos los servicios que ofrecemos y que encuentres en nuestro sitio todo lo que necesitas.
                
                Si tienes alguna pregunta o necesitas ayuda con algo, no dudes en ponerte en contacto con nosotros. Estamos aquí para ayudarte en todo lo que podamos.
                
                ¡Gracias de nuevo por unirte a nosotros y esperamos verte pronto en nuestro sitio!
                
                Atentamente,
                
                Joshua Barraza`
            })
    
            let User: any = {
                User: userDB,
                token
            }
    
            return new Promise(resolve => resolve(
                User
    
            ))
            
        } catch (error) {
            console.log(error);
            
            
        }
     


    }

}
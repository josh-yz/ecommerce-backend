import { IUserRepository } from "../../../domian/repositories/user-repository"
import { AddUserModel, DeleteUser } from "../../../domian/use-cases/user/delete-user"



export class DbDeleteUser implements DeleteUser {
    constructor (
        private readonly iUserRepository: IUserRepository,
        ) {
      this.iUserRepository = iUserRepository
    }
  
    async delete (id: string): Promise<AddUserModel> {
  
      const accountUpdated: any = await this.iUserRepository.delete(id)
    
      return new Promise(resolve => resolve(
        accountUpdated 
      ))
    }
  }
  
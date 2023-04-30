import { UserModel } from "../../../domian/entities/user";
import { GetUsers } from "../../../domian/use-cases/user/get-user";


export class DbGetUsers implements GetUsers {
    async get (data: any): Promise<UserModel> {

        if(Array.isArray(data)){
            const users : any = data.map(x=>{
                return {
                 id : x._id,
                 name : x.name,
                 last_name : x.last_name,
                 email : x.email,
                 role : x.role,
                 phone_number : x.phone_number,
                 prefix : x.prefix,
                 photo: x.photo,
                 country : x.country,
                 age : x.age,
                 address : x.address,
                 activated : x.activated,
                 created_date : x.created_date
                }
            });
     
             return new Promise(resolve => resolve(
                 users
             ))
        }else{
            return new Promise(resolve => resolve(
                data
            ))
        }
    
        

      }
    getAccountsActivateds: (data: any) => Promise<UserModel>;

}
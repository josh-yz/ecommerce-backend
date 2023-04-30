import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import UserSchema from "../../persistence/mongo/user-schema";
import AdminSchema from "../../persistence/mongo/admin-schema";


export class AuthenticationToken  {
    async veryfyToken (req: Request, res: Response, next: NextFunction) {
        try {
          if (!req.headers.authorization) {
            return res.status(403).json({
              ok: false,
              message: 'Token is required'
            })
          }
          
          let token = req.headers.authorization.split(" ")[1];
          
          const user: any = jwt.verify(token, process.env.AUTH_SECRET)
    
          const { id } = user
    
          const userDB = await UserSchema.findById(id)
    
          if (!userDB) {
            return res.status(401).json({msg:"Token no valido"});
          }
          next()
        } catch (error) {
          if (error) {
            res.status(403).json({
              error
            })
          }
        }
      }

      async veryfyAdminToken (req: Request, res: Response, next: NextFunction) {
        try {
          if (!req.headers.authorization) {
            return res.status(403).json({
              ok: false,
              message: 'Token is required'
            })
          }
          
          let token = req.headers.authorization.split(" ")[1];

          const user: any = jwt.verify(token, process.env.AUTH_SECRET)
    
          const { id } = user
    
          const adminDB = await AdminSchema.findById(id)
    
          if (!adminDB) {
            return res.status(401).json({msg:"Token no valido"});
          }
          next()
        } catch (error) {
          if (error) {
            res.status(403).json({
              error
            })
          }
        }
      }

}

export default new AuthenticationToken()

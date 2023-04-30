import jwt from 'jsonwebtoken'
import { serverError } from '../infrastructure/web/helpers/http-helper'
import { IJwt } from '../infrastructure/web/interfaces/jwt-token'




export class JwtAdapter implements IJwt {
  private readonly seed: string
  private readonly expiresIn: any
  constructor (seed: string, expiresIn: any) {
    this.seed = seed
    this.expiresIn = expiresIn
  }

  async token (value: string, role: string): Promise<string> {
    try {
      const token = await jwt.sign({
        id: value,
        role: role
      }, this.seed, { expiresIn: this.expiresIn })
      return token
    } catch (error) {
      console.log(error)
      serverError(error)
    }
  }

  async checkin (value: string, seed?: any): Promise<any> {
    try {
      const token = await jwt.verify(value, seed)
      return token
    } catch (error) {
      console.log(error)
      serverError(error)
    }
  }
}

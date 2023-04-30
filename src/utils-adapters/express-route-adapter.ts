
import { Request, Response } from 'express'
import { Controller, HttpRequest,  } from '../infrastructure/web/interfaces'
export const AdaptRoute = (controler: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      file: req.file,
      headers: req.headers
      
    }
    const httpResponse = await controler.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}

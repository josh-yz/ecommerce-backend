import { Express } from 'express'
import { json } from 'express'
import express from 'express' // Importamos express
//import { expressFile } from '../middlewares/file-upload'

import { Request, Response, NextFunction } from 'express'

const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Methods', '*')
  res.set('Access-Control-Allow-Headers', '*')
  next()
}
export const bodyParser = json()
export default (app: Express): void => {
    app.use(bodyParser)
    app.use(cors)
    //app.use(expressFile)
    app.use(express.static('public')) 
  }
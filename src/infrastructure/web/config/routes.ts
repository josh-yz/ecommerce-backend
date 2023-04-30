/**
 * El código es un módulo de configuración para Express que utiliza el enrutador de Express para enrutar solicitudes HTTP a diferentes archivos de rutas. El módulo comienza importando las dependencias necesarias: Express y Router de Express, así como la función readdirSync de Node.js para leer los archivos de ruta. Luego, exporta una función que toma la instancia de Express como parámetro.
*/

import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/ecommerce/api', router)
  readdirSync(`${__dirname}/../routes`).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
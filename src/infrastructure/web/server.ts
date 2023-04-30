/**
 * Este código se encarga de conectar una aplicación de Express a una base de datos MongoDB utilizando la clase MongooseHelper de un módulo de infraestructura. También carga variables de entorno del archivo .env mediante la librería dotenv. Una vez establecida la conexión, importa la aplicación Express del módulo de configuración y la pone a la escucha en el puerto definido en la variable de entorno PORT. Luego, muestra en consola un mensaje de confirmación de la conexión exitosa a la base de datos y del inicio del servidor.
 */

import { MongooseHelper } from "../../infrastructure/db/mongodb-connect";
import { config as dotenv } from 'dotenv'

dotenv()

MongooseHelper.connect(process.env.MONGODB_CNN)
.then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Express server port: \x1b[32m${process.env.PORT}\x1b[0m`)
        console.log('Base de datos puerto 27017: \x1b[32m%s\x1b[0m', 'online')
      })
})
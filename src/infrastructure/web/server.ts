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
import mongoose, { Collection } from 'mongoose'

export const MongooseHelper = {
  uri: null as string,
  collection: Collection,
  async connect (uri: string): Promise<void> {
    mongoose.connect(uri, {   useNewUrlParser: true,
      useUnifiedTopology: true, useCreateIndex : true }, (err) => {
      if (err) {
        console.log(err.message)
      }
    })
  }
}

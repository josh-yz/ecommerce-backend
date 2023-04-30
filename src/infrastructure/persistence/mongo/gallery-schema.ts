import mongoose, { Schema } from 'mongoose'

const GallerySchema = new Schema({
  image: String,
  created_at: Date,
  order : {type : Number,default : 0 },
  product: { type: Schema.Types.ObjectId }
})

export default mongoose.model('galleries', GallerySchema)

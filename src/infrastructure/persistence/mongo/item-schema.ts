import mongoose, { Schema } from 'mongoose'

const ItemSchema = new Schema({
  description: String,
  created_at: Date,
  price: Number,
  product: { type: Schema.Types.ObjectId }
})

export default mongoose.model('items', ItemSchema)

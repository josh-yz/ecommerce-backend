import mongoose, { Schema } from 'mongoose'
// import uniqueValidator from 'mongoose-unique-validator'

const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  offer_price: Number,
  details: String,
  slug: String,
  text_offer: String,
  image: String,
  n_sales : {type : Number,default : 0},
  n_points : {type : Number,default : 0},
  activated: Boolean,
  created_at: Date,
  activated_at: Date,
  sku: String,
  quantity: Number,
  id_category:[{ type: Schema.Types.ObjectId, ref:'categories'}],
  items:[{ type: Schema.Types.ObjectId, ref:'Items'}],
  gallery:[{ type: Schema.Types.ObjectId, ref:'galleries'}],
})

export default mongoose.model('products', ProductSchema)
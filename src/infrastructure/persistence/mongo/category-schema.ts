import mongoose, { Schema } from 'mongoose'

const CategorySchema = new Schema({
  name: String,
  description: String,
  created_date: Date,
  image: String,
  activated_dates: Array,
  short_description: String, 
})


export default mongoose.model('categories', CategorySchema)
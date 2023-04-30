import mongoose, { Schema } from 'mongoose'

const CouponSchema = new Schema({
    code: { type: String, required: true },
    type : { type: String, required: true },
    value : { type: String, required: true },
    quantity: { type: String, required: true },
    created_date: Date,
  });  

  export default mongoose.model('coupons', CouponSchema)
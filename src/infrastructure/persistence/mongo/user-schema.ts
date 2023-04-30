import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
    name: { type: String, required: true },
    last_name : { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    address: { type: String, },
    age: { type: Date },
    phone_number: {
      type: String,
    },
    prefix : {type: String},
    photo: { type: String, },
    country : { type: String, },
    role : { type: String, required: true },
    created_date: Date,
    activated: Boolean,
    activated_at: Date,
  });  

  export default mongoose.model('users', UserSchema)
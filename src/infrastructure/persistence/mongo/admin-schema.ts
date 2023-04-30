import mongoose, { Schema } from 'mongoose'

const AdminSchema = new Schema({
    name: { type: String, required: true },
    last_name : { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    photo: { type: String, },
    role : { type: String, required: true },
    created_date: Date,
    activated: Boolean,
    activated_at: Date,
  });  

  export default mongoose.model('admins', AdminSchema)
import mongoose, { Schema } from 'mongoose'

const OrderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    products: [{
        _id: { type: Schema.Types.ObjectId, ref: 'products' },
        item: { type: Schema.Types.ObjectId, ref: 'Items' },
        quantity: Number,
        price: Number,
    }],
    address: String,
    total : Number,
    sub_total : Number,
    note : String,
    send_cost : Number,
    track :String,
    method_payment : String,
    created_at: Date,
})

mongoose.pluralize(null);
export default mongoose.model('orders', OrderSchema)

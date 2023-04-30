import mongoose, { Schema } from 'mongoose'

const CartSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users' },
    products: [{
        _id: { type: Schema.Types.ObjectId, ref: 'products' },
        item: { type: Schema.Types.ObjectId, ref: 'Items' },
        quantity: Number,
        price: Number,
    }
    ],
    total: Number,
    created_at: Date,
})

export default mongoose.model('carts', CartSchema)

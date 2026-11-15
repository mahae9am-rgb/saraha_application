import { model, Schema } from 'mongoose'

const schema = new Schema({
    participants: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    request: { type: Schema.Types.ObjectId, ref: 'request' }
}, {
    timestamps: true
})

export const conversation = model('conversation', schema)
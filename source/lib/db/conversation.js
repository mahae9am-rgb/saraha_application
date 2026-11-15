import { model,Schema } from 'mongoose'
export const messagesSchema = new Schema({
    msgId:{type:Schema.Types.ObjectId,ref:'Message',required:true},
    sender:{type:Schema.Types.ObjectId,ref:'User',required:true}
},{
    timestamps:true
})
const schema = new Schema({
    sender:{type:Schema.Types.ObjectId,ref:'User',required:true},
    reciver:{type:Schema.Types.ObjectId,ref:'User',required:true},
    messages:[messagesSchema]
},{
    timestamps:true
})
export const conversation = model('conversation',schema)
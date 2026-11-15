import { model,Schema } from 'mongoose'

const schema = new Schema({
    senderOfReq:{type:Schema.Types.ObjectId,ref:'User'},
    receiverOfReq:{type:Schema.Types.ObjectId,ref:'User'},
    messagesOfReq:{type:Schema.Types.ObjectId,ref:'Message'},
    status:{
        type:String,
        enum:['pending','accept','decline'],
        default:'pending'
    }
},{
    timestamps:true
})
export const requestModel = model('request',schema)
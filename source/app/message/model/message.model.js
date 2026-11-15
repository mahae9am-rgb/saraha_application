import mongoose, { Schema } from "mongoose";
const messageSchema = new Schema({
    content:{
        type:String,
        minlength:1,
        maxlength:600,
        trim:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    conversation:{
        type:Schema.Types.ObjectId,
        ref:"conversation"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},
  {  
        timestamps:{
            createdAt:true,
            updatedAt:true
        }
    

})
export const Message = mongoose.model('Message',messageSchema)
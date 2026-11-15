import mongoose,{ Schema } from "mongoose";
import { type } from "os";
import { number } from "zod";
const userSchema =new Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    faildLoginAttemps:{
        type:number,
        default:0
    },
    lockUntil:{
        type:Date
    },
    password:{
        type:String,
        required: function(){
            return this.provider ==='local'
        }
    },
    provider:{
        type:String,
        enum: ['local','pintrist','tiktok'],
        default:'local'
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    
    },
    profilePicPath:String,
    coverImagePath:[String],
    cvPath:String,
    
    twoStepVerification:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String
    },
    otpExpires:{
        type:Date
    }
})
export const User = mongoose.model('User',userSchema)
import { Types } from 'mongoose'
import {z} from 'zod'
export const sendNewMessage = z.object({
    content:z.string().trim().min(3).max(200),
    receiver:z.string().trim().refine((val)=>{
        return Types.ObjectId.isValid(val)
    })

})
export default {sendNewMessage}
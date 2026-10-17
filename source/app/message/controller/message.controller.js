import * as messageService from '../service/message.service.js'
import { sendNewMessage } from '../dto/message.dto.js'
import { valaditeBody } from '../../../lib/validition/valdition.js'

export async function sendMessages(req,res,next) {
    try{
        const data = valaditeBody(sendNewMessage,req.body)
        const{content,receiver}= data
            const sender = req.user.id

        const result=  await messageService.sendMessage(content,receiver,sender)
        res.status(200).json({
            message:"message create successfully",
            success:true,
            data:result
        })

    }catch(error){
        next(error)
    }
    
}
export async function getAllMessage(req,res,next) {
    try{
        const data = await messageService.getMessages(req.user.id)
        res.status(200).json({message:'get all message successfully',success:true,data:data})
    }catch(error){
        next(error)
    }
    
}
export default {sendMessages,getAllMessage}
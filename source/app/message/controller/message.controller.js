import * as messageService from '../service/message.service.js'
import { sendNewMessage } from '../dto/message.dto.js'
import { valaditeBody } from '../../../lib/validition/valdition.js'
//q1
export async function sendMessages(req,res,next) {
    try{
        const data = valaditeBody(sendNewMessage,req.body)
        const{content,receiver}= data
            const sender = req.user.sub

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
        const data = await messageService.getMessages(req.user.sub)
        res.status(200).json({message:'get all message successfully',success:true,data:data})
    }catch(error){
        next(error)
    }
    
}

export async function createMessagesConversation(req,res,next){
    try{
        const {conversationId}=req.params
        const {content}=req.body

        const data =  await messageService.createMessageConversation(conversationId,content,req.user.sub)
       return res.status(200).json({success:true,data:data})
    }catch(error){
        next(error)
    }
}
export async function getConversationMessages(req,res,next){
    try{
        const {conversationId}=req.params
        const data = await messageService.getConversationMessage(conversationId,req.user.sub)
        res.status(200).json({message:"all messages is getting successfully", data :data })
    }catch(error){
        next(error)
    }
}




export default {sendMessages,getAllMessage,createMessagesConversation,getConversationMessages}
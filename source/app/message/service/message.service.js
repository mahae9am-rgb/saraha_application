import userRepository from '../../user/repository/user.repository.js'
import * as messageRepo from '../repository/message.repository.js'
import { AppError } from '../../../lib/utilis/error.js'
import { conversation} from '../../conversation/model/conversation.model.js'
import { Message } from '../model/message.model.js'
//q1
export async function sendMessage(content,receiver,sender) {
    if(receiver.toString()===sender.toString()){
        throw new AppError("you cannot send messages to yourself",400)
    }
    const user = await userRepository.findUserById(receiver)
    if(!user) throw new AppError("User not found", 404);
    const message =await messageRepo.createsendMessage(content,receiver,sender)
    return {
        id:message.id,
        receiver:message.receiver,
        content:message.content,
        createdAt:message.createdAt
    }
}

export async function getMessages(userId) {
    return await messageRepo.getAllMessages(userId)
    
}
export async function createMessageConversation(conversationId,content,userId) {
    const convo = await conversation.findById(conversationId)
    if(!convo){throw new AppError('conversation not found',400)}

    const isParticipant = convo.participants.includes(userId)
    if(!isParticipant) throw new AppError('not found to participants',403)
     const receiver = convo.participants.find(p=>p.toString()!== userId.toString())   
    return await messageRepo.createConversationMessage(content,userId,receiver,conversationId) 
}

export async function getConversationMessage(conversationId,userId){
    const convo = await conversation.findById(conversationId)
    if(!convo) throw new AppError('conversation not found',400)
    const isParticipant = conversation.participants.includes(userId)
    if(!isParticipant) throw new AppError('participants not found',403)
     return await messageRepo.getMessageByConversationId(conversationId)   
}
export default {sendMessage,getMessages,createMessageConversation,getConversationMessage}
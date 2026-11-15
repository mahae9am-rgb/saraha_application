//5
import { conversation } from "../model/conversation.model.js";
export async function createConversation(participants,requestId){
    return await conversation.create({participants,request:requestId})
}

export async function findConversationById(requestId) {
 return await conversation.findOne({request:requestId}).populate('participants' ,'name email')
    
}

export async function getConversations(userId) {
    return await conversation.find({participants:userId}).populate('participants','name email')
}
export default{createConversation,findConversationById,getConversations}
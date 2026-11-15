import * as repoconversation from '../repo/conversation.repository.js'
//5
export async function createConversation(requestId,senderId,receiverId) {
    const exist= await repoconversation.findConversationById(requestId)
    if(exist){
        return exist
    }
const participants=[senderId,receiverId]
    return await repoconversation.createConversation(participants,requestId)
}

export async function getAllConversation(userId){
    return await repoconversation.getConversations(userId)
}
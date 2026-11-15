import mongoose from "mongoose";
import { Message } from "../model/message.model.js";

//q1
export async function createsendMessage(content,receiver,sender) {
   return await Message.create({
        content:content,
        receiver:receiver,
        sender:sender
    })
    
}


export async function getAllMessages(userId) {
    return await Message.find({ receiver: userId, isDeleted: false })
        .select('-sender')
        .sort('-createdAt')
}

export async function createConversationMessage(content,
    senderId,receiverId,conversationId){
     return await Message.create({
        content:content,
        sender:senderId,
        receiver:receiverId,
        conversation:conversationId
    })
}
export async function getMessageByConversationId(conversationId){
    return await Message.find
    ({conversation:conversationId,isDeleted:false})
    .populate('sender','name email').sort({createdAt:1})
}

export default {createsendMessage,getAllMessages,createConversationMessage,getMessageByConversationId}

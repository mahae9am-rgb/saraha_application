import mongoose from "mongoose";
import { Message } from "../model/message.model.js";


export async function createsendMessage(content,receiver,sender) {
    console.log("Saving Message -> Content:", content, "Receiver:", receiver, "Sender:", sender);
   return await Message.create({
        content:content,
        receiver:receiver,
        sender:sender
    })
    
}


export async function getAllMessages(userId){
    
    const allMessages = await Message.find({});
    console.log(allMessages);
    
    const objectId =  new mongoose.Types.ObjectId(userId)
    
    
  return   await Message.find({receiver:userId}).populate('sender')
    
}


export default {createsendMessage,getAllMessages}

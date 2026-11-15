import { Message } from '../../message/model/message.model.js'
import { AppError } from "../../../lib/utilis/error.js";
import * as requestRepo from '../repo/request.repository.js'
import * as conversationService from '../../conversation/service/conversation.service.js'
import { EREQUIRETLS } from 'nodemailer/lib/errors.js';
//2
export async function identitySender(receiverId,messageId) {

    const message= await Message.findById(messageId)
    if(!message)throw new AppError('message not found',400)
    if(message.receiver.toString()!==receiverId.toString())throw new AppError('unauthroid to req',403) 
     return await requestRepo.createNewRequest(receiverId,message.sender,messageId)    
    
}

export async function getALLReq(userId){
    const requests= await requestRepo.getAllRequests(userId)
    return requests
}
export async function updateRequestStatus(requestId,status) {
    const updateReq = await requestRepo.acceptOrRejectReq(requestId,status)
    if(!updateReq){
        throw new AppError('req not found')
    }
    return updateReq

    
}
//4
export async function updateReqStatus(requestId,status,userId) {
    const request = await requestRepo.findRequestById(requestId)
    if(!request){ throw new AppError(' req not found',400)}
    // create conversation 
    if(request.receiverOfReq.toString()!==userId.toString())
        throw new AppError('not allowed',403)
    const updateStatues = await requestRepo.acceptOrRejectReq(requestId,status)

    if(status==='accept'){
       const conversation =  await conversationService.createConversation(
            requestId,
            updateStatues.senderOfReq,
            updateStatues.receiverOfReq
        )
        return{
            message:"status updated successfully and created conversation",
            updateStatues,
            conversation
        }
    }
    return {
        message:"request reject successfully",
        updateStatues
    }

}





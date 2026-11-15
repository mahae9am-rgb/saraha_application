import { requestModel } from "../model/request.js";


export async function createNewRequest(senderId,
    receiverId,messageId) {
     return await requestModel.create({
        senderOfReq:senderId,
        receiverOfReq:receiverId,
        messagesOfReq:messageId,
        status:'pending'
    })
    
}
export async function getAllRequests(userId){
    return await requestModel.find({receiverOfReq:userId})
    .populate('messagesOfReq','content')
    .populate('senderOfReq','name email')
}
export async function findRequestById(requestId) {
    return requestModel.findById(requestId)
    
}
export async function acceptOrRejectReq(requestId,status) {
    return await requestModel.findByIdAndUpdate(
        requestId,
        {status:status},
        {new:true}
    )


    
}
export default {createNewRequest,getAllRequests,findRequestById,acceptOrRejectReq}
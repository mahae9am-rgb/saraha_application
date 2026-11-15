import * as requestService from '../service/request.secvice.js'

export async function identitySender(req,res,next) {
  try{
      const {messageId}= req.body
          const receiverId= req.user.sub
    const result = await requestService.identitySender(receiverId,messageId)
    return res.status(201).json({success:true,data:result})
    
  }catch(error){
    next(error)
  }
}
//3
export async function getRequests(req,res,next) {
    try{
        const userId=req.user.sub
        const data= await requestService.getALLReq(userId)
        res.status(200).json({success:true,data:data})

    }catch(error){
        next(error)
    }
    
}
//4
export async function changeREQStatus(req,res,next) {
    try{
        const {requestId,status}= req.body
    
        const result= await requestService.updateReqStatus
        (requestId,status,req.user.sub)
         return res.status(200).json({success:true,data:result})



     } catch(error){
            next(error)
        }
    
    
}
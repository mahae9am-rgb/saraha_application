import * as conversationService from '../service/conversation.service.js'
//5

export async function getConversation(req,res,next) {
  try{
      const userId= req.user.sub
    const result = await conversationService.getAllConversation(userId)
return res.status(200).json({success:true,data:result})
  }catch(error){
    next(error)
  }
    
}

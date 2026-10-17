import userRepository from '../../user/repository/user.repository.js'
import * as messageRepo from '../repository/message.repository.js'
import { userNotExist } from '../../auth/error.js'
import { AppError } from '../../../lib/utilis/error.js'

export async function sendMessage(content,receiver,sender) {
    console.log("receiver:", receiver, "sender:", sender)
    const user = await userRepository.findUserById(receiver)
    if(!user) 
    throw new AppError("User not found", 404);
    return await messageRepo.createsendMessage(content,receiver,sender)
}

export async function getMessages(userId) {
    return await messageRepo.getAllMessages(userId)
    
}
export default {sendMessage,getMessages}
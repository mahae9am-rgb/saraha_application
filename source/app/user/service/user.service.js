import userRepo from '../repository/user.repository.js'

import { userNotExist } from '../../auth/error.js'
import fs from 'node:fs'
export async function uploadProfilePic(userId,file){
const user=  await userRepo.findUserById(userId)
if(!user) throw userNotExist 

if(user.profilePicPath&&fs.existsSync(user.profilePicPath)){
    fs.unlinkSync(user.profilePicPath)
}
await userRepo.updateUserByEmail(user.email,{profilePicPath:file.path})

}

export default {uploadProfilePic}
import { Router } from "express";
import { withCache } from "../../lib/cahce/withCache.js";
import { User } from "./model/user.model.js";
import{uploadSingleFile,uploadArrayFiles,uploadFields} from '../../lib/media/multer.js'
import { allowedFields, fileValidation } from "../../lib/media/file.valadition.js";
import userController from './controller/user.controller.js'
import guard from '../auth/guard/guard.js'
const userRouter = Router()

userRouter.get('/get-all-users',async(req,res,next)=>{
try{
    console.log("Request reached get-all-users route!");
    const users= await User.find()
    res.json(users)
}catch(error){
    next(error)
}
})


userRouter.post('/upload-single-file',
    uploadSingleFile('pp'),
    guard,
    fileValidation(),
    userController.uploadsFilePic
)
userRouter.post('/upload-array-files',uploadArrayFiles('cover-image',3),(req,res,next)=>{
    fileValidation(),
     res.json('ok')
})
userRouter.post('/opload-single-file',uploadSingleFile('pp',allowedFields.files))
userRouter.post('/upload-fields',uploadFields('fileds'),(req,res,next)=>{
    console.log(req.files),
    fileValidation()
    res.json('ok')
    
})
export default userRouter

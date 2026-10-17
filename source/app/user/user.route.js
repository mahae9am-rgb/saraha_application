import { Router } from "express";
import { withCache } from "../../lib/cahce/withCache.js";
import { User } from "./model/user.model.js";
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

export default userRouter

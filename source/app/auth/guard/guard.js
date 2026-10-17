import jwt from "jsonwebtoken"
import { AppError } from "../../../lib/utilis/error.js"
import { env } from "../../../lib/config/env.js"


export  async function guard(req,res,next){
    try{
        const authHeader = req.headers.authorization
        const token = req.cookies?.['access-token']||(authHeader?.startsWith('Bearer ')? authHeader.split(" ")[1]:null)
        if(!token) throw new AppError('no token',401)
            req.user = jwt.verify(token,env.jwt.secret)
        next()

    }catch(error){
        next(error)
    }
}
export default guard

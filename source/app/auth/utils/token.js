import JWT from 'jsonwebtoken'
import { toSeconds } from '../../../pkg/utilis/time.js'
import { env } from "../../../lib/config/env.js"
export function generateToken(payload){
    return JWT.sign(payload,env.jwt.secret,{
        expiresIn:toSeconds(1,'hours')
    })
}
 export default {generateToken}


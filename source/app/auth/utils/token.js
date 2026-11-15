import JWT from 'jsonwebtoken'
import { toSeconds } from '../../../pkg/utilis/time.js'
import { env } from "../../../lib/config/env.js"
export function generateToken(payload){
    return JWT.sign(payload,env.jwt.secret,{
        expiresIn:toSeconds(1,'hours')
    })
}
export function verifyRefreshToken(token)
{
    return JWT.verify(token,env.jwt.refreshSecret)
}
export function generateAccessToken(payload) {
    return JWT.sign(payload,env.jwt.secret,{
        expiresIn:toSeconds(15,'minutes')
    })
    
}
export function generateRefreshToken(payload){
    return JWT.sign(payload,env.jwt.refreshSecret,{
        expiresIn:toSeconds(7,'days')
    })
}

export function setCookies(res,accessToken,refreshToken){
  res.cookie('access-token',accessToken,{
        httpOnly:true,
        maxAge:toSeconds(15,'minutes')
    })
    res.cookie('refresh-token',refreshToken,{
        httpOnly:true,
        maxAge:toSeconds(7,'days'),
        path:'/api/auth'
    })
}

 export default {generateToken,generateAccessToken,verifyRefreshToken,generateRefreshToken,setCookies}


import { toSeconds } from '../../../pkg/utilis/time.js'
import { valaditeBody } from '../../../lib/validition/valdition.js'
import { loginDTO, registerDTO, resetpasswordDTO, sendOTPDTO, verifiyaccountDTO } from '../dto/auth.dto.js'
import authService  from  '../service/auth.service.js'
import { success } from 'zod';
import token, { setCookies } from '../utils/token.js';
import { AppError } from '../../../lib/utilis/error.js';

export async function createUser(req,res,next) {
      console.log("REGISTER HIT", req.body);

    try{
    const data = valaditeBody(registerDTO,req.body)
const {name,email,password}= data

    const registration = await authService.register({name,email,password})
    res.status(201).json({
        message:"user create successfully",
        data:registration,
        success:true
    })
    }catch(error){
        next(error)
    }
}

export async function updateUser(req,res,next) {
    try{
        const data= valaditeBody(verifiyaccountDTO,req.body)
        const { email, code}= data
const updated = await authService.verifiyAccount(email,code)
res.status(200).json({
    message:'user updated successfully',
    data:updated,
    success:true
})


    }catch(error){
        next(error)
    }
    
}
export async function enable2stepVerification(req,res,next) {
    try{
        const {email,code}= req.body
        const data= await authService.twoStepVerification(email,code)
        res.status(200).json({
            message:'two step verification is true',
            success:true
        })

    }catch(error){
        next(error)
    }
    
}
export async function login(req,res,next) {
   try{
    const data = valaditeBody(loginDTO,req.body)
     const {email,password}= data
     const tokens = await authService.login(email,password)
     if(!tokens){
        return res.json({message:'check your box, we sent otp'})
     }
     setCookies(res, tokens.accessToken, tokens.refreshToken)
    res.status(200).json({message:'login successfullty',success:true,data:tokens})
   }catch(error){

    next(error)
   }
}

export async function verifyCodeToLogin(req,res,next) {
    try{
    const {email,code}= req.body
    const{accessToken,refreshToken}=await authService.verifyCodeToLogin(email,code)
   setCookies(res,accessToken,refreshToken)
    res.status(200).json({message:'login successfullty',success:true,data:{accessToken,refreshToken}})
    }catch(error){
        next(error)
    }
}
export async function sendotp(req,res,next) {
    try{
        const data = valaditeBody (sendOTPDTO,req.body)
const {email}= data
    await authService.sendOtp(email)
    res.status(200).json({message:"otp is send, check your email",success:true})
    
    }catch(error){
        next(error)
    }
}
export async function resetPassword(req,res,next) {
    try{
        const data= valaditeBody(resetpasswordDTO,req.body)
        const {email,code,newPassword}=data
        await authService.resetPassword(email,code,newPassword)
        res.status(200).json({message:' reset password successfully',success:true})
    
    }catch(error){
        next(error)
    }
    
}
export async function loginWithG(req,res,next) {
     const token = await authService.loginWithGoogle(req.body.idToken)
    res.cookie('access token',token,{
        httpOnly:true,
        maxAge:toSeconds(1,'hours')
    })
    res.status(200).json({
        message:'login with google successfully',success:true
    })
}

export async function refreshToken(req,res,next) {
    try{
        const token = req.cookies?.['refresh-token']||req.body?.refreshToken
const tokens = await authService.refreshAccessToken(token)
setCookies(res,tokens.accessToken,tokens.refreshToken)
return res.status(200).json({success:true,data:tokens})
    }catch(error){
        next(error)
    }
    
}

export async function logout(req,res,next) {
    try{
        const token = req.cookies?.['refresh-token'] || req.body?.refreshToken
        await authService.logout(token)
        res.clearCookie('access-token')
        res.clearCookie('refresh-token',{path:'/api/auth'})
        return res.status(200).json({success:true,message:'logged out'})

    }catch(error){
        next(error)
    }
    
}
export default {createUser,updateUser,
    enable2stepVerification,login,verifyCodeToLogin,
    sendotp,resetPassword,
    loginWithG,refreshToken,logout}

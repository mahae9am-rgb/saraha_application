import * as authRepository from '../repository/auth.repository.js'
import * as authOTP from '../repository/auth.otp.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { sendEmail } from '../../../lib/email/nodemailer.js'
import userRepository from '../../user/repository/user.repository.js'
import { OTP } from '../model/otp.model.js'
import JWT from 'jsonwebtoken'
import otpjs, { generateOTPCode } from '../../../lib/otp.js'
import { toMs, toSeconds } from '../../../pkg/utilis/time.js'
import * as userError from '../error.js'
import { generateAccessToken, generateToken,generateRefreshToken, verifyRefreshToken } from '../utils/token.js'
import { comparePassword, hashPassword } from '../utils/hash.js'
import { invalidCode, otpExpiresin } from '../error.js'
import { verifyidToken } from '../../../lib/utilis/google-auth.js'
import { cacheProvider } from '../../../lib/cahce/init.js'

import { AppError } from '../../../lib/utilis/error.js'


export async function baseFunction(email,code,factory) {
    const userExist = await authRepository.checkUserExistByEmail(email)
    if(!userExist)
         throw userError.userNotExist
    
    const otp = await cacheProvider.get(`otp:${email}`)
    if(!otp) throw otpExpiresin
    if (String(otp) !== String(code)) throw invalidCode
   const result = await factory();
    await cacheProvider.del(`otp:${email}`)
       return result
}

export async function register(userData) {

   const userExist = await authRepository.checkUserExistByEmail(userData.email)
   if(userExist){ throw userError.userAlreadtyExist}
userData.password =  await hashPassword(userData.password)
const createUser = await authRepository.createUser(userData)
const code =  await generateOTPCode()
await cacheProvider.set(`otp:${userData.email}`,code,toSeconds(3,'minutes'))
await sendEmail({
    to:userData.email,
    subject:"otp verification",
    html:`<h1> your otp to verify new account is ${code}</h1>`
})
return createUser
}
export async function verifiyAccount(email,code) {
     const user = await authRepository.checkUserExistByEmail(email)
    if (user?.isVerified) throw userError.userAlreadyVerified

     await baseFunction(email,code,async()=>{
    await userRepository.updateUserByEmail(email,{isVerified:true})
   })
}
   export async function twoStepVerification(email,code) {
    await  baseFunction(email,code,async()=>{
    await userRepository.updateUserByEmail(email,{twoStepVerification:true})
   })
}

export async function verifyCodeToLogin(email,code) {
   const {accessToken,refreshToken}= await baseFunction(email,code,async()=>{
    const user = await authRepository.checkUserExistByEmail(email)
 const jti=crypto.randomUUID()
 const accessToken =await  generateAccessToken({sub:user.id,name:user.name})
 const refreshToken = await generateRefreshToken({jti:jti,sub:user.id,name:user.name})
 await cacheProvider.set(`refreshToken:${jti}`,user.id,toSeconds(7,'days'))
 return {accessToken,refreshToken}
})
return{
    accessToken,refreshToken
}
}

export async function login(email,password) {
   
const user = await authRepository.checkUserExistByEmail(email)
if(!user) throw userError.userNotExist

if(user.lockUntil>Date.now()){
    const remainingMin = Math.ceil((user.lockUntil-Date.now())/1000/60)
    throw new AppError(`your lockUntil after${remainingMin}minutes`,403)
}

if(user.isVerified===false){throw userError.userNotVerified} 

const match = await comparePassword(password,user['password'])
if(!match){ 
user.faildLoginAttemps=(user.faildLoginAttemps||0)+1
if(user.faildLoginAttemps>=5){
    user.lockUntil=Date.now()+5*60*1000
    // user.lockUntil=0
    await user.save()
    throw new AppError("your account is locked try again after 5 minutes",403)
}
    await user.save()
    throw new AppError('wrong email or password ')
}
user.faildLoginAttemps=0
user.lockUntil=undefined
await user.save()

if(user.twoStepVerification==true){
    const code=await generateOTPCode()
    await cacheProvider.set(`otp:${email}`,code,toSeconds(3,'minutes'))
    await sendEmail({
        to:email,
        subject:"2 step verification",
        html:`<h1>your otp to login is ${code} </h1>`
    })
return;

}
const jti=crypto.randomUUID()
const accessToken = generateAccessToken({sub:user.id,name:user.name})
const refreshToken = generateRefreshToken({jti:jti,sub:user.id,name:user.name})
await cacheProvider.set(`refreshToken:${jti}`,user.id,toSeconds(7,'days'))

//let cacheTTL = await cacheProvider.ttl(`login-tries:${email}`)
//cacheTries=cacheTries ??4
//const ttl = cacheTTL== -2 ? toSeconds(3,'minutes'):cacheTTL
// await cacheProvider.set(`login-tries:${email}`,cacheTries-1,cacheTTL)
return {accessToken,refreshToken}
}


export async function sendOtp(email) {
    const user = await authRepository.checkUserExistByEmail(email)
    if(!user) throw userError.userNotExist
     await cacheProvider.del(`otp:${email}`) 
       const code =  await generateOTPCode()
       await cacheProvider.set(`otp:${email}`,code,toSeconds(3,'minutes'))
       await sendEmail({
        to:user.email,
        subject:"new otp",
        html:`<h1>your new otp is ${code}</h1>`
       })       

}
export async function resetPassword(email,code,newPassword){
    const otp = await cacheProvider.get(`otp:${email}`)
    if(!otp)throw otpExpiresin
    if(String(otp)!==String(code))throw invalidCode
    const hashedPassword = await hashPassword(newPassword)
    await userRepository.updateUserByEmail(email,{password:hashedPassword})
await cacheProvider.del(`otp:${email}`)
}

export async function loginWithGoogle(idToken) {
     const payload = await verifyidToken(idToken)
   const user= await authRepository.checkUserExistByEmail(payload.email)
   if(user){
    return generateToken({
        id:user.id,email:user.email
    })
   }
   const createUser = await authRepository.createUser({
    name:payload.name,
    email:payload.email,
    provider:'google',
    isVerified:true
   })
   return generateToken({
    id:createUser.id, email:createUser.email
   })
    
}
export async function refreshAccessToken(refreshToken) {
    if(!refreshToken) throw new AppError('no refresh token',401)
    let payload 
    try{
payload=verifyRefreshToken(refreshToken)
}catch{
    throw new AppError('invalid refresh token',401)
}
const stored = await cacheProvider.get(`refreshToken:${payload.jti}`)
if(!stored)throw new AppError('refresh token expired',401)
await cacheProvider.del(`refreshToken:${payload.jti}`)
const newJti =  crypto.randomUUID()
const accessToken = generateAccessToken({sub:payload.sub,name:payload.name})
const newRefreshToken= generateRefreshToken({jti:newJti,sub:payload.sub,name:payload.name})
await cacheProvider.set(`refreshToken:${newJti}`,payload.sub,toSeconds(7,'days'))
return {
    accessToken,refreshToken:newRefreshToken
}

}
export async function logout(refreshToken) {
    if(!refreshToken)return
    try{
        const payload=verifyRefreshToken(refreshToken)
        await cacheProvider.del(`refreshToken:${payload.jti}`)

    }catch{

    }
    
}

export default {register,verifiyAccount,twoStepVerification,
    login,verifyCodeToLogin,
    sendOtp,resetPassword,loginWithGoogle,refreshAccessToken,logout}
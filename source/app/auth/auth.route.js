import { Router } from "express"
import authController from './controller/auth.controller.js'
const authRouter = Router()

authRouter.post('/register',authController.createUser)
authRouter.patch('/verifiy-account',authController.updateUser)
authRouter.post('/login',authController.login)
authRouter.patch('/verify-code-to-login',authController.verifyCodeToLogin)
authRouter.post('/send-otp',authController.sendotp)
authRouter.patch('/reset-password',authController.resetPassword)
authRouter.post('/login-with-google',authController.loginWithG)
authRouter.patch('/enable-2-step-verification',authController.enable2stepVerification)

authRouter.post('/refresh-token',authController.refreshToken)
authRouter.post('/logout',authController.logout)
authRouter.post('/logout',(req,res,next)=>{
    res.clearCookie('access-token')
    res.json({message:"logged out"})
})
export default authRouter

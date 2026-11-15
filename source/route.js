import { Router } from 'express'
import authRoute from './app/auth/auth.route.js'
import messageRoute from './app/message/message.route.js'
import userRoute from './app/user/user.route.js'
import conversationRoute from './app/conversation/route.js'
import requestRoute from './app/request/route.js'
export const router = Router()

router.use('/auth',authRoute)
router.use('/users',userRoute)
router.use('/message',messageRoute)
router.use('/conversation',conversationRoute)
router.use('/request',requestRoute)

export default router

import { Router } from "express";
import messageController from "./controller/message.controller.js";
import {guard} from '../auth/guard/guard.js'
const messageRouter = Router()

messageRouter.post('/',guard,messageController.sendMessages)
messageRouter.post('/public',guard,messageController.sendMessages)
messageRouter.get('/',guard,messageController.getAllMessage)
export default messageRouter

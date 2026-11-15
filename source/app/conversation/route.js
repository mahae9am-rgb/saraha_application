import { Router} from "express";
import * as conversationController from './controller/conversation.controller.js'
import guard from "../auth/guard/guard.js";
const router=Router()

router.post('/create-conversation',guard,conversationController.getConversation)

export default router
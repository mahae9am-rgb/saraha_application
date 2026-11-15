import { Router } from "express";
import * as requestController from './controller/request.controller.js'
import guard from "../auth/guard/guard.js";
const router= Router()

//2
router.post('/message/identity-sender',guard,requestController.identitySender)
//3
router.get('/message/get-all-req',guard,requestController.getRequests)
//4
router.patch('/message/update-status',guard,requestController.changeREQStatus)

export default router
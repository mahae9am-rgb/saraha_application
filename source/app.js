import express from 'express'
import cors from 'cors'
import router  from './route.js'
import correlationId from './lib/correlationId/correlationId.js'
import cookieParser from 'cookie-parser'
import {rateLimit}from 'express-rate-limit'
import userRouter from './app/user/user.route.js'
import { AppError } from './lib/utilis/error.js'
export function createApp(){
    const app = express()

    const limiter=rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,

      handler:function(req,res,next){
        next( new AppError(this.message,this.statusCode))
      }
    })
    
    app.use(limiter)
    app.use(cors({origin:'http://localhost:3000'}))
    app.use(express.json())
    app.use(cookieParser())
    app.use(correlationId)
    app.use('/uploads',express.static('uploads'))
    app.use(userRouter)

    app.use('/api',router)



  app.use((err, req, res, next) => {
  console.dir(err, { depth: null });
  res.status(err?.status || 500).json({
    success: false,
    error: err?.message ?? err,
  });
});

    return app
}
export default {createApp}
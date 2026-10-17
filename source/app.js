import express from 'express'
import cors from 'cors'
import router  from './route.js'
import correlationId from './lib/correlationId/correlationId.js'
import cookieParser from 'cookie-parser'
export function createApp(){
    const app = express()

    app.use(cors({origin:'http://localhost:3000'}))

    app.use(express.json())
    
    app.use(cookieParser())

    app.use(correlationId)

    app.use('/api',router)
    app.use((err, req, res, next) => {
  console.dir(err, { depth: null });
  res.status(err?.status || 400).json({
    success: false,
    error: err?.message ?? err,
  });
});

    return app
}
export default {createApp}
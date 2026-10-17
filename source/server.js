import { logger  } from "./pkg/logger/logger.js";
import mongoose from "mongoose";
import { env } from "./lib/config/env.js"; 
import { createApp } from "./app.js";
import http from 'http'

    await mongoose.connect(env.db.URL)
    logger.info('mongoose connect')

const app = createApp()
const server = http.createServer(app)
server.listen(env.PORT,()=>{logger.info(`server is running on port ${env.PORT}`)})



export function shutdown(){
    setTimeout(()=>process.exit(1),1000).unref()
    

    server.close(async()=>{
        await mongoose.disconnect()
        process.exit(0)
    })
}

process.on('SIGINT',shutdown)
process.on('SIGTERM',shutdown)
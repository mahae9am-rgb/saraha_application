import Redis from "ioredis";
 export class RedisCacheProvider{
    client;
    constructor(config){
        this.client = new Redis({
            host:config.host,
            port:config.port,
            password:config.password,
            userName:config.userName,
            lazyConnect:true,
            maxLoadingRetryTime:1,
            retryStrategy: () => null
        })
        this.client.on('error',(err)=> console.log("redis fail server:",err.message))
        this.client.connect().catch(err=>console.log('fail to connect to redis:',err.message))
    }
async set(key,value,ttl){
    try{
         return   this.client.set(key,value,"EX",ttl)
    }catch(error){
    return null}
    }
async get(key){
    try{

        return this.client.get(key)
    }catch(error){
    return null
}
}
async del(key) {
        try{
            return this.client.del(key)
    }catch(error){
        return null
    }
 
        }
async ttl(key){try{
    
    return this.client.ttl(key)
 }catch(error){
    return -1
 }
}
}
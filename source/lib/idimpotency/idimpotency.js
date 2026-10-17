import { cacheProvider } from "../cahce/init.js"

export function idImpotency(ttl){

return async(req,res,next)=>{
const id = req.Headers['id-Impotency']
let key = `${req.method}:${req.originalUrl}:${idImpotency}`
 const cached = await cacheProvider.get(key)
 if(cached){
    res.setHeaders('X-Cache',"HIT")
    res.json(JSON.parse(cached))
 }
 const originalJson= res.json.bind(res)
 res.json = async(body)=>{
    cacheProvider.set(key,JSON.stringify(body,ttl))
    res.setHeaders('X-Cache',"MISS")
    return originalJson(body)
 }
 next()
    }
}
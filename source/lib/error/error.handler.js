export function globalHandler(err,req,res,next){
    console.error(err);
    res.status(400).json({
        message:err.message
    })
    
    logger.error(err.message,{
        stack:err.stack,
        correlationId:req.correlationId
    })
    if(err.isOpertional===true){
        return res.status(err.statusCode).json({
            message:err.messagge,
            success:false
        })
    }
    return res.status(500).json({
        message:"something Wrong",
        success:false
    })
}
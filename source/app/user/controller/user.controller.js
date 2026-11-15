import userService from '../service/user.service.js'

export async function uploadsFilePic(req,res,next) {
     try{
        await userService.uploadsFilePic(req.user.id,req.file)
    res.json({message:'upload file successfully',success:true})
    
     }catch(error){next(error)}
}

export default {uploadsFilePic}
import multer, { diskStorage } from 'multer'
import crypto from 'crypto'
import { AppError } from '../utilis/error.js';
import { allowedFields } from './file.valadition.js';
export function uploadFiles(allowedTypes){
   
    return  multer({
         fileFilter: function(req,file,cb){
        if(!allowedTypes.includes(file.mimetype)){
        return   cb(new AppError('invalid file format',404),false)
        }
    cb(null,true)
},

        storage:diskStorage({
            destination:'uploads',
            filename:function(req,file,cb){
                console.log(file);
                cb(null,`${crypto.randomUUID()}-${file.originalname}`)
                
            }
        })
    })
}
 export function uploadSingleFile(fieldname,allowedTypes=allowedFields.images){
    return uploadFiles(allowedTypes).single(fieldname,allowedTypes)
}

 export function uploadArrayFiles(fieldname,maxCount){
    return uploadFiles().array(fieldname,maxCount)
}
 export function uploadFields(fieldname){
    return uploadFiles().fields(fieldname)
}


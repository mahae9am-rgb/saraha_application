import nodemailer from "nodemailer";
import {env} from '../config/env.js'
export async function sendEmail({to,subject,html}) {
    const transporter =  nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        auth:{
            user:env.nodemailer.user,
            pass:env.nodemailer.password
        }
    })
   await  transporter.sendMail({
    from:`"saraha-app"<${env.nodemailer.user}>`,
    to:to,
    subject:subject,
    html:html
   })
    
}
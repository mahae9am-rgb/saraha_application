import {optional, z } from "zod";
import 'dotenv/config'

const Schema= z.object({
    PORT:z.string().default("3000"),
    MONGODB_URL:z.string(),
    JWT_SECRET:z.string(),
    JWT_REFRESH_SECRET:z.string(),
    REDIS_PASSWORD:z.string().optional(),
    REDIS_PORT:z.string().default('6379'),
    REDIS_HOST:z.string().default('localhost'),
    GOOGLE_WEB_OAUTH_CLIENT_ID:z.string().optional(),
    MAIL_USER:z.string().optional(),
    MAIL_PASSWORD:z.string().optional(),
    MAIL_JET_API_KEY:z.string().optional(),
    MAIL_JET_API_SECRET:z.string().optional(),
    MAIL_FROM_EMAIL:z.string().optional(),
    MAIL_FROM_NAME:z.string().default("saraha")
    

})
const parsed = Schema.parse(process.env)
export const env = {
    PORT:Number(parsed.PORT),
    db:{URL:parsed.MONGODB_URL},

google:{
    webClient_Id:parsed.GOOGLE_WEB_OAUTH_CLIENT_ID,
    iosClient_Id:parsed.GOOGLE_WEB_OAUTH_CLIENT_ID
},
redis:{
    host:parsed.REDIS_HOST,
    port:Number(parsed.REDIS_PORT),
    password:parsed.REDIS_PASSWORD
},
mailJet:{
api_key:parsed.MAIL_JET_API_KEY,
api_Secret:parsed.MAIL_JET_API_SECRET,
fromEmail:parsed.MAIL_FROM_EMAIL,
fromName:parsed.MAIL_FROM_NAME
},
nodemailer:{
    user:parsed.MAIL_USER,
    password:parsed.MAIL_PASSWORD
},jwt:{
    secret:parsed.JWT_SECRET,
    refreshSecret:parsed.JWT_REFRESH_SECRET
}

}
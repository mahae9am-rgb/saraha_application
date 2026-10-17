import mailJet from "../../pkg/mailjet/mailjet.js";
import { env } from "../config/env.js";

export const mailJetProvider=new mailJet({
    apiKey:env.mailJet.api_key,
    api_Secret:env.mailJet.api_Secret,
    fromEmail:env.mailJet.fromEmail,
    fromName:env.mailJet.fromName
})

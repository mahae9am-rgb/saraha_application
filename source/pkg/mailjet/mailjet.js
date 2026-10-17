import Mailjet from "node-mailjet";
export class mailJet{
client
fromEmail
fromName
constructor(config){
    this.fromEmail=this.fromEmail
    this.fromName=this.fromName

    this.client = new Mailjet({
        apiKey:config.apiKey,
        apiSecret:config.apiSecret
        
    })
}
sendMail(email,subject,html){

}

}
export default mailJet
const nodemailer = require("nodemailer")
const template = require("../utils/templates/auth") 


const createTrans =()=>{
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "arquihub06@gmail.com", 
          pass: "xypnwvwtazgfesmo", 
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    return transport
}


  const sendMail = async(user, subject, template)=>{
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: "arquihub@gmail.com",
        to: user,
        subject,
        html:template

    })
    console.log("Message sent :", info.messageId);
    return
}


exports.sendMail=(user, subject, template)=>sendMail(user, subject, template)
const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")
const { SENDGRID_APIKEY } = process.env

const createTrans=()=>{

    // const transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "22540a9b412056",
    //       pass: "609adab73fe3ce"
    //     }
    //   });
    const transport = nodemailer.createTransport(
        nodemailerSendgrid({
            apiKey: SENDGRID_APIKEY
        })
    )

      return transport
    }


const sendMail = async(email, subject, html)=>{
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from:"'Arquihub' <arquihub06@gmail.com >",
        to: `${email}`,
        subject,
        html
        // attachments:[{
        //     file:"url.txt",
        //     path:"https://arquihub-git-main-frann24.vercel.app/"
        // }]
    })
    console.log("Message sent ", info.messageId)

    return
}

exports.sendMail=(email, subject, html)=> sendMail(email, subject, html)
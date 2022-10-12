const nodemailer = require("nodemailer")
const nodemailerSendgrid = require("nodemailer-sendgrid")

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
            apiKey: "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"
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
const nodemailer = require("nodemailer")


export const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, 
    auth: {
      user: "gonzalopirovano1@gmail.com", 
      pass: "qlxuyjanvhyfwmfu", 
    },
  });


  transporter.verify().then(()=>{
    console.log("ready to send emails");
  })



  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
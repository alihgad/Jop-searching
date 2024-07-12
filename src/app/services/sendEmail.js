import dotenv from "dotenv";
import { createTransport } from "nodemailer";
dotenv.config()
const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "alihgad2@gmail.com",
    pass: process.env.APP_PASSWORD
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function main(email,html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"ALi hassan 👻" <alihgad2@gmail.email>', // sender address
    to: email , // list of receivers
    subject: "Verification Email", // Subject line
    html: html, // html body
  });

  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);

export default main;

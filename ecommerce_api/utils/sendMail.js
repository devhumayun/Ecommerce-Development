import nodemailer from "nodemailer"
export const sendMail = ({ to, sub, msg }) => {
    // create trams transport
    let transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "humayunkabir9408@gmail.com",
        pass: "fyxfdctchgvwzlob",
      },
    });
  
    // send activation mail
    transport.sendMail({
      from: `Wolmart <${to}>`,
      to: to,
      subject: sub,
      text: msg,
    });
  };
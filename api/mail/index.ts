import nodemailer from "nodemailer";
import { Resource } from "sst";

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: Resource.MailUsername.value,
    pass: Resource.MailPassword.value,
  },
});

export const sendMail = async (to: string, subject: string, text: string) => {
  var message = {
    from: "brian.ng@entwurfhaus.com",
    to,
    subject,
    text,
    html: `<code>${text}</code>`,
  };

  transporter.sendMail(message);
};

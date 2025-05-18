import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const { EMAIL_USER, EMAIL_PASS } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendUserVerificationLink = async (
  baseURL: string,
  email: string
) => {
  await transport.sendMail({
    from: EMAIL_USER,
    to: email,
    subject: "Verify your email",
    html: `
    <div> 
    <h1> User Verfication Link </h1>
    <p>This verification link is valid for 1 hour </p>
    <a href="${baseURL}"> Verify</a>
    </div>
    `,
  });
};

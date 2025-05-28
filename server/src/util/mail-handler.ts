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
  email: string,
  type: "verify" | "reset" = "verify"
) => {
  const subject =
    type === "reset" ? "Reset Your Password" : "Verify Your Email";

  const html =
    type === "reset"
      ? `
    <div> 
      <h1>Password Reset Request</h1>
      <p>You requested to reset your password. This link is valid for 1 hour.</p>
      <a href="${baseURL}">Reset Password</a>
    </div>
  `
      : `
    <div> 
      <h1>User Verification Link</h1>
      <p>This verification link is valid for 1 hour.</p>
      <a href="${baseURL}">Verify Email</a>
    </div>
  `;

  await transport.sendMail({
    from: EMAIL_USER,
    to: email,
    subject,
    html,
  });
};

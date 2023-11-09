"use strict";
require("dotenv").config();
const nodemailer = require("nodemailer");

import { getUserByEmail } from "./getUserByEmail";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.VERIFY_SEND_EMAIL_ADDRESS,
    pass: process.env.VERIFY_SEND_EMAIL_PASSWORD,
  },
});

const userVerificationCode = async (email: string) => {
  const user = await getUserByEmail(email);
  return user.verification.randomSeed;
};

// async..await is not allowed in global scope, must use a wrapper
export const verifyUserEmail = async (userEmail: string) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"prologue.owner@gmail.com', // sender address
    to: userEmail, // list of receivers
    subject: "Email Verification for Prologue: Your blog service", // Subject line
    text: `Here is your verificaton code`,
    html: `<b>Hello from Prologue. Here is your verificaton code</b> ${await userVerificationCode(
      userEmail
    )}`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

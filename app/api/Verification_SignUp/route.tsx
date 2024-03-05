

import { NextResponse, userAgentFromString } from "next/server";
import nodemailer from "nodemailer";
import { verificationLink, user, pass } from "@/app/global";
import User from "@/models/user";

// Function to generate a random 5-digit code
function generateRandomCode() {
  return Math.floor(10000 + Math.random() * 90000);
}

export async function POST(request) {
  try {
    const { username, email , role } = await request.json();

    // Generate a random 5-digit verification code
    const verificationCode = generateRandomCode();

  

    // Send an email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: user,
        pass: pass,
      },
    });

    /////////////  by email  find User ////////

  // Check if the user already exists in the database
  let users:any = await User.findOne({ email }).lean();
  let userId = '';

  // If user doesn't exist, create a new user
  if (!users) {
    users = await new User({ username, email, role }).save();
    userId = users._id.toString();
    console.log("New user created:", users);
  } else {
    userId = users['_id'].toString();
    console.log("User already exists:", users);
  }

    // HTML email content with the verification link
    const htmlContent = `
      <p>Dear ${username},</p>
      <p>Thank you for creating an account with our service.</p>
      <h1>Verification Code</h1>
      <p>Your Verification Code: ${verificationCode}</p>
      <p>To verify your email address, please click the link below:</p>
      <p><a href="${verificationLink}?_id=${userId}">Verify Email</a></p>
      <p>${email}</p>
      <p>If you did not create an account with us, please ignore this email.</p>
      <p>Thank you for using our service!</p>
    `;

    const mailOptions = {
      from: user,
      to: email,
      subject: "Account Verification",
      html: htmlContent,
    };

 
    const info = await transporter.sendMail(mailOptions);

    if (info.messageId) {
      console.log("Email sent successfully");


      return NextResponse.json({ status: 200 , code:verificationCode , '_id':userId });
    } else {
      console.error("Email sending failed");
      return NextResponse.json({ status: 400 });
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
    return NextResponse.json({ status: 400, error: error.message });
  }
}

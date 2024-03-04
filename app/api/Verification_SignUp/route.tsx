

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verificationLink, user, pass } from "@/app/global";


export async function POST(request) {
  try {
    const { username, email , role } = await request.json();

    // Validate the email address format
    if (!isValidEmail(email)) {
      throw new Error("Invalid email address format");
    }

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

    const verificationLinkData = {
      username: username,
      email: email,
      role : role
    };

    // Convert the verificationLinkData object to a JSON string
    const encodedData = encodeURIComponent(JSON.stringify(verificationLinkData));

    // HTML email content with the verification link
    const htmlContent = `
      <p>Dear ${username},</p>
      <p>Thank you for creating an account with our service.</p>
      <p>To verify your email address, please click the link below:</p>
      <p><a href="${verificationLink}?data=${encodedData}">Verify Email</a></p>
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
      return NextResponse.json({ status: 200});
    } else {
      console.error("Email sending failed");
      return NextResponse.json({ status: 400 });
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
    return NextResponse.json({ status: 400, error: error.message });
  }
}

// Function to validate email format
function isValidEmail(email) {
  // Use a regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

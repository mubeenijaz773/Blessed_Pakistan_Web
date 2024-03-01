import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { verificationLink, user, pass } from "@/app/global";


export async function POST(request) {
  try {
    const { username, email } = await request.json();

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


    // HTML email content with the verification link
    const htmlContent = `
    <!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
    p {
      color: #555;
      line-height: 1.4;
    }
    a {
      color: #007BFF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
<div className="container">
<h1>Dear ${username},</h1>
<p>Thank you for taking the first step toward your dream home!</p>
<p>We're excited to have you on board. To ensure the security of your account and provide you with an exceptional home-buying experience, please take a moment to verify your email address:</p>

<p>If the above button doesn't work, you can also copy and paste the following link into your browser:</p>

<p>Need assistance or have questions? Feel free to reach out to our dedicated support team at ${email}.</p>
<p>If you did not create an account with us, kindly ignore this email.</p>
<p>Your dream home is just a click away. Thank you for choosing us to make it happen!</p>
</div>
</body>
</html>

    `;

    const mailOptions = {
      from: user,
      to: email,
      subject: "Response to Your Property Inquiry: Let's Talk!",
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

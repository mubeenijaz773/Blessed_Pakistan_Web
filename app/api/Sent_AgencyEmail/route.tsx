
import { NextResponse } from 'next/server';
import nodemailer from "nodemailer";
import { pass, user } from '@/app/global';

// Your existing POST function
export async function POST(request) {
  try {
    const { yourname, phonenumber, email, subject, message } = await request.json();

console.log("req:", yourname, phonenumber, email, subject, message)

    if (!isValidEmail(email)) {
        throw new Error("Invalid email address format");
      }

    // Create mailOptions object
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
  
  
    
 const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body {
              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f7f7f7;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 10px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            h1 {
              color: #333;
              font-size: 24px;
              margin-bottom: 20px;
            }
            p {
              color: #555;
              line-height: 1.4;
              margin-bottom: 10px;
            }
            ul {
              list-style-type: none;
              padding: 0;
              margin: 0;
            }
            li {
              margin-bottom: 10px;
            }
            strong {
              font-weight: bold;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007BFF;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Dear ${yourname},</h1>
            <p>Thank you for reaching out regarding your property inquiry. We appreciate your interest!</p>
            <p>Here are the details of your inquiry:</p>
            <ul>
              <li><strong>Name:</strong> ${yourname}</li>
              <li><strong>Phone Number:</strong> ${phonenumber}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>We will get back to you as soon as possible to assist with your property needs. Thank you for choosing us!</p>
            <p>If you have any further questions or require immediate assistance, feel free to contact our dedicated support team at ${email}.</p>
            <p>Looking forward to helping you find your dream home!</p>
            <a href="http://localhost:3000"  class="button">Visit Our Website</a>
          </div>
        </body>
        </html>
      `

      const mailOptions = {
        from: user,
        to: email,
        subject: "Response to Your Property Inquiry: Let's Talk!",
        html: htmlContent,
      };



    // Send email

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

function isValidEmail(email) {
  // Use a regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

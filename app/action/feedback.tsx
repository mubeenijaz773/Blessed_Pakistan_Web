"use server"

import nodemailer from "nodemailer";
import {  user, pass , feedbackuser , feedbackpass , complainuser, complainpass , reportuser , reportpass } from "../global";
import  FeedBack from "@/models/feedback";
import Complain from "@/models/Usercomplain";
import Report from "@/models/report_product";
import connectDB from "@/utils/dbconnect";


export async function FeedbackUser(userid  , email , description) {
  try {
   

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
        user: feedbackuser,
        pass: feedbackpass,
      },
    });

  
  // HTML email content with the verification link
  const htmlContent = `
    <p>Thank you for your feedback</p>
    <p>We have received the following information:</p>
    <p>Email: ${email}</p>
    <p>Description: ${description}</p>
    <p>We will address your concerns promptly.</p>
    <p>Thank you for using our service!</p>
  `;



    const mailOptions = {
      from: feedbackuser,
      to: email,
       subject: 'User Feedback',
      html: htmlContent,
    };

 
    const info = await transporter.sendMail(mailOptions);

    if (info.messageId) {


    // Create a new user instance
    const newUser = new FeedBack({
        userid : userid,
        email : email,
        description:description
    });
    await connectDB();
    await newUser.save();

      console.log("Email sent successfully");

   
      return ({ status: 200});
    
    
    } else {
      console.error("Email sending failed");
      return ({ status: 400 });
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
    return ({ status: 400, error: error.message });
  }
}

// Function to validate email format
function isValidEmail(email) {
  // Use a regular expression for basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// /////////////////////////////  complain  ////////////////////////////////////////////





export async function   ComplainUser(userid  , email , description) {
  try {
   

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
        user: complainuser,
        pass: complainpass,
      },
    });

  
  // HTML email content with the verification link
  const htmlContent = `
    <p>Thank you for your complaint.</p>
    <p>We have received the following information:</p>
    <p>Email: ${email}</p>
    <p>Description: ${description}</p>
    <p>We will address your concerns promptly.</p>
    <p>Thank you for using our service!</p>
  `;



    const mailOptions = {
      from: complainuser,
      to: email,
       subject: 'User Complaint',
      html: htmlContent,
    };

 
    const info = await transporter.sendMail(mailOptions);

    if (info.messageId) {


    // Create a new user instance
    const newUser = new Complain({
        userid : userid,
        email : email,
        description:description
    });
    await connectDB();
    await newUser.save();

      console.log("Email sent successfully");

   
      return ({ status: 200});
    
    
    } else {
      console.error("Email sending failed");
      return ({ status: 400 });
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
    return ({ status: 400, error: error.message });
  }
}




// /////////////////////////////  User Report  ////////////////////////////////////////////





export async function   UserReportProduct(userid  , email , description) {
  try {
   

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
        user: reportuser,
        pass: reportpass,
      },
    });

  
  // HTML email content with the verification link
  const htmlContent = `
    <p>Thank you for your complaint.</p>
    <p>We have received the following information:</p>
    <p>Email: ${email}</p>
    <p>Description: ${description}</p>
    <p>We will address your concerns promptly.</p>
    <p>Thank you for using our service!</p>
  `;



    const mailOptions = {
      from: reportuser,
      to: email,
       subject: 'User Report On Property',
      html: htmlContent,
    };

 
    const info = await transporter.sendMail(mailOptions);

    if (info.messageId) {


    // Create a new user instance
    const newUser = new Report({
        userid : userid,
        email : email,
        description:description
    });
    await connectDB();
    await newUser.save();

      console.log("Email sent successfully");

   
      return ({ status: 200});
    
    
    } else {
      console.error("Email sending failed");
      return ({ status: 400 });
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
    return ({ status: 400, error: error.message });
  }
}



import { NewUser, User } from "@models";
import { connectToDB } from "@utils";
import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";

export const POST = async (request) => {
  const { email, designation, domain } = await request.json();
  try {
    await connectToDB();

    if (!email || !designation || !domain)
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
      });
    const token = uuid();

    let alreadyExists = await NewUser.findOne({ email });
    if (alreadyExists)
      return new Response(
        JSON.stringify({ message: "Activation link already sent" }),
        {
          status: 409,
        },
      );

    alreadyExists = await User.findOne({ email });
    if (alreadyExists)
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 409,
      });

    const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
    await new Promise((resolve, reject) => {
      mailTransporter.verify((error, success) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log("Nodemailer is ready");
          resolve(success);
        }
      });
    });
    const activationLink = `${process.env.NEXTAUTH_URL}/register/${token}`;
    const mailDetails = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Activate Account on Coding Ninjas Tech Stack Tracker",
      text: token,
      html: `<p>Click the following link to activate your account:</p>
         <a href="${activationLink}">Activate Account</a>`,
    };

    await new Promise((resolve, reject) => {
      mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
          console.log("Error Occurs");
          reject(err);
        } else {
          console.log("Email sent successfully");
          resolve(data);
        }
      });
    });

    const newUser = new NewUser({
      email,
      designation,
      domain,
      token,
    });

    await newUser.save();

    return new Response(JSON.stringify({ message: "Activation link sent" }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
};

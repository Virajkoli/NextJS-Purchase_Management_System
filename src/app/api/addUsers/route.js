import { hash } from "bcryptjs";
import dbConnect from "../../../../lib/mongodb";
import User from "../../../../models/User";
import Role from "../../../../models/Role";
import Department from "../../../../models/Department";
import Position from "../../../../models/Position";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (jsonError) {
      console.error("Invalid JSON payload:", jsonError);
      return new Response(JSON.stringify({ message: "Invalid JSON payload" }), {
        status: 400,
      });
    }

    const {
      name,
      username,
      email,
      password,
      role,
      gender,
      position,
      department,
      phone,
    } = requestBody;

    // Validate input
    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !role ||
      !position ||
      !department
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Connect to DB
    await dbConnect();

    // Check for existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 400,
      });
    }

    // Assign role, department, position
    const assignedRole = await Role.findOne({ name: role });
    const assignedDept = await Department.findOne({ name: department });
    const assignedPos = await Position.findOne({ name: position });

    if (!assignedRole) {
      return new Response(JSON.stringify({ message: "Invalid role" }), {
        status: 400,
      });
    }
    if (!assignedDept) {
      return new Response(JSON.stringify({ message: "Invalid department" }), {
        status: 400,
      });
    }
    if (!assignedPos) {
      return new Response(JSON.stringify({ message: "Invalid position" }), {
        status: 400,
      });
    }

    // Create new user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role: assignedRole._id,
      gender,
      position: assignedPos._id,
      department: assignedDept._id,
      phone,
    });

    await newUser.save();

    // Email logic
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailSubject = `Welcome to Our Platform, ${name}!`;
    const emailBody = `
    Hi ${name},

    Welcome to our platform! We are excited to have you on board.

    Here are your login details:
    - Username: ${username}
    - Password: ${password}

    Please keep this information secure.

    Best regards,
    The Team
  `;

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: emailSubject,
      text: emailBody,
      html: `
      <p>Hi ${name},</p>
      <p>Welcome to our platform! We are excited to have you on board.</p>
      <p><strong>Here are your login details:</strong></p>
      <ul>
        <li>Username: <strong>${username}</strong></li>
        <li>Password: <strong>${password}</strong></li>
      </ul>
      <p>Please keep this information secure.</p>
      <p>Best regards,</p>
      <p>Team SDC</p>
    `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${email}`);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return new Response(
      JSON.stringify({ message: "User added and email sent successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: "Error adding user" }), {
      status: 500,
    });
  }
}

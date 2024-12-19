import nodemailer from "nodemailer";

export async function sendmail(to, name, username, password) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transport.verify();

    const subject = `Welcome to Our Platform, ${name}!`;
    const body = `
      <p>Hi ${name},</p>
      <p>Welcome to our platform! We are excited to have you on board.</p>
      <p><strong>Here are your login details:</strong></p>
      <ul>
        <li>Username: <strong>${username}</strong></li>
        <li>Password: <strong>${password}</strong></li>
      </ul>
      <p>Please keep this information secure.</p>
      <p>Best regards,</p>
      <p>The Team</p>
    `;

    await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

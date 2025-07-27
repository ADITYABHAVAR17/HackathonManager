const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1) Create transporter
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail service
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your Gmail app password
    },
  });

  // 2) Define email options
  const mailOptions = {
    from: `"Your App" <${process.env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    // html: options.html, // Optional HTML version
  };
  console.log("Email options:", mailOptions);

  // 3) Send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

const transporter = require("../config/nodemailerConfig");
const path = require("path");
const fs = require("fs");

const sendEmail = async (req, res) => {
  const { recipientEmail, subject, message } = req.body;
  const file = req.file; // Access the uploaded file

  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: subject,
      html: message,
      attachments: file
        ? [
            {
              filename: file.originalname,
              path: file.path,
            },
          ]
        : [],
    };

    await transporter.sendMail(mailOptions);

    // Delete the file after sending
    if (file) {
      fs.unlinkSync(file.path);
    }

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendEmail };

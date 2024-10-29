import React, { useState } from "react";
import { sendEmail } from "../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './EmailForm.css';
import { RingLoader } from 'react-spinners'; // Importing a loading spinner component

function EmailForm() {
  const [emailData, setEmailData] = useState({
    recipientEmail: "",
    message: `Dear Sir,<br><br>
      I am Aryaman Sinha, a student of NIT Jalandhar, expressing my interest in the 6-month internship at your esteemed company as a MERN Stack Developer.<br><br>
      My experience in full-stack applications and eagerness to contribute make me excited about this role. Please find my resume attached for your consideration.<br><br>
      Sincerely,<br>
      Aryaman Sinha<br>
      8630756879`,
    file: null, // State to handle file uploads
  });

  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setEmailData({ ...emailData, file: files[0] }); // Ensure file is stored
    } else {
      setEmailData({ ...emailData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("recipientEmail", emailData.recipientEmail);
    formData.append("subject", "6-Month Internship Inquiry");
    formData.append("message", emailData.message); // Formatted as HTML

    if (emailData.file) {
      formData.append("attachment", emailData.file); // Attach the file with the same name as Multer expects
    }

    try {
      const response = await sendEmail(formData);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to send email");
    } finally {
      setLoading(false); // Stop loading after email is sent or an error occurs
    }
  };

  const handleFocus = async () => {
    try {
      const text = await navigator.clipboard.readText();
      // Regular expression to validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(text)) {
        setEmailData({ ...emailData, recipientEmail: text });
      } else {
        toast.error("Clipboard does not contain a valid email address.");
      }
    } catch (err) {
      console.error("Failed to read clipboard contents: ", err);
    }
  };

  return (
    <div className="email-form-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <dotlottie-player
        src="https://lottie.host/bff68aa2-2d29-40f6-8476-7e3f09f3f109/ZiTNHWFljL.json"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay
      ></dotlottie-player>

      <form className="email-form" onSubmit={handleSubmit}>
        
        <input
          type="email"
          name="recipientEmail"
          placeholder="Recipient Email"
          value={emailData.recipientEmail}
          onChange={handleChange}
          onFocus={handleFocus}  // Fetch email from clipboard when the input is focused
          required
        />

        <textarea
          name="message"
          value={emailData.message}
          onChange={handleChange}
          className="large-textarea"
          required
        />

        <input
          type="file"
          name="attachment" // This must match the field name expected by Multer
          onChange={handleChange}
          accept=".pdf,.doc,.docx,.txt"
          required
          className="file-input"
        />

        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? <RingLoader size={20} color="#ffffff" loading={loading} /> : "Send Email"}
        </button>
      </form>
    </div>
  );
}

export default EmailForm;

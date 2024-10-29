import axios from "axios";

const api = axios.create({
  baseURL: "https://email-portal-sre3.onrender.com/api", // Use Render URL here
});

export const sendEmail = (formData) =>
  api.post("/send-email", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

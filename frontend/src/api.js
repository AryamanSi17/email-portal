import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const sendEmail = (formData) =>
  api.post("/send-email", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

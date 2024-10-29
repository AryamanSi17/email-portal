const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const emailRoutes = require("./routes/emailRoutes");
const multer = require("multer");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ dest: "uploads/" });

// Middleware
app.use(cors()); // Allows cross-origin requests from your frontend
app.use(express.json());
app.use("/api", emailRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

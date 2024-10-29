const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); // Ensure dotenv is imported here
const emailRoutes = require("./routes/emailRoutes");
const multer = require('multer');
dotenv.config(); // Call this function to load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer({ dest: 'uploads/' }); 
// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON body
app.use("/api", emailRoutes); // Mount email routes at /api

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log("Email:", process.env.EMAIL);
console.log("Password:", process.env.PASSWORD); // Be cautious with logging passwords!

});

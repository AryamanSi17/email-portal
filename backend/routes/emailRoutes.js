const express = require("express");
const { sendEmail } = require("../controllers/emailController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });

router.post("/send-email", upload.single("attachment"), sendEmail);

module.exports = router;

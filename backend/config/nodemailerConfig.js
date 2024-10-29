const nodemailer=require("nodemailer");

const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"aryamansi1712@gmail.com",
        pass:"xbbaiykivtsyjovi"
    }
})

module.exports=transporter;


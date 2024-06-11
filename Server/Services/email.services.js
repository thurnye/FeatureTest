const nodemailer = require("nodemailer");

var mailService = async (to, sub, html, res) => {
    try {
        console.log('PROPS::::', { to, sub, html });
        console.log('user:', process.env.EMAIL, "pass:", process.env.PSWD);

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PSWD
            },
            tls: {
                rejectUnauthorized: true
            }
        });

        let mailOption = {
            from: process.env.EMAIL,
            to: to,
            subject: sub,
            html: html
        };

        let info = await transporter.sendMail(mailOption);
        console.log("Message Sent:", info.accepted);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
        console.log('SENT::::');
        
    } catch (error) {
        console.log("mailService-Error::", error);
        if (res) {
            res.status(505).json("Error on mail service");
        }
    }
}

module.exports.mailService = mailService;

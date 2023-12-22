"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const email = process.env.EMAIL;
const password = process.env.PASSWORD;
console.log(`email${email} password${password}`);
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: email,
        pass: password,
    },
});
const sendMail = (userMail, res) => {
    const otp = parseInt((Math.random() * 1000000).toString(), 10);
    console.log(otp, "otppppppppppppp");
    const globalData = otp;
    const mailOptions = {
        from: email,
        to: userMail,
        subject: "Sending Email using Node.js",
        html: "<h3>OTP for account verification is </h3>" +
            "<h1 style='font-weight:bold;'>" +
            otp +
            "</h1>",
        text: "That was easy!",
    };
    transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Email sending failed" });
        }
        else {
            res.status(200).json({ message: "Email sent successfully" });
        }
    });
    return globalData;
};
exports.sendMail = sendMail;

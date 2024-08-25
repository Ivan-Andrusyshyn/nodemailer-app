"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const dotenv_1 = require("dotenv");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const nodemailer = require("nodemailer");
(0, dotenv_1.config)();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_EMAIL_PASSWORD,
    },
});
function main(_a) {
    return __awaiter(this, arguments, void 0, function* ({ email, city, warehouse }) {
        const htmlTemplate = yield (0, promises_1.readFile)((0, path_1.join)(__dirname, "email.html"), "utf-8");
        console.log(city, warehouse);
        const htmlContent = htmlTemplate
            .replace(/{{city}}/g, city)
            .replace(/{{warehouse}}/g, warehouse);
        try {
            const info = yield transporter.sendMail({
                from: `"Ivan Dev 🧑‍💻" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: "Hello ✔",
                text: "Hello world?",
                html: htmlContent,
            });
            console.log("Message sent: %s", info.messageId);
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    });
}

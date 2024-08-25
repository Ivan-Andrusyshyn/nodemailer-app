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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const nodemailer_1 = require("./nodemailer");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "styles.css")));
app.use((0, cors_1.default)({
    origin: ["https://nodemailer-app-nu.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "/index.html"));
});
app.get("/send-email/config", (req, res) => {
    res.json({ api: process.env.NP_API_KEY });
});
app.post("/send-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, selectedCity, selectedWarehouse } = req.body;
        yield (0, nodemailer_1.main)({ email, city: selectedCity, warehouse: selectedWarehouse });
        res.status(200).json({ message: "Email sent successfully!" });
    }
    catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Failed to send email!" });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running http://localhost:3000`);
});

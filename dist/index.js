"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { signupauth, loginauth } = require("./auth");
const middleware_1 = __importDefault(require("./middleware"));
const { contentpost, contentget, contentdelete } = require("./content");
const cors = require("cors");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://ishant:ishant1234@cluster0.kdiuh.mongodb.net/brain');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.post("/api/vi/signin", signupauth);
app.post("/api/v1/login", loginauth);
app.use(middleware_1.default);
app.post("/api/v1/content", contentpost);
app.get("/api/v1/content", contentget);
app.delete("/api/v1/content", contentdelete);
app.listen(3000, () => {
    console.log("hosted at http://localhost:3000");
});

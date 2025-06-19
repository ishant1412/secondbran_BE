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
const env_config_1 = require("./env_config");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(env_config_1.env.DATABASE_URL);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.post("/api/v1/signup", signupauth);
app.post("/api/v1/login", loginauth);
app.delete("/api/v1/contentdelete", contentdelete);
app.post("/api/v1/contentpost", contentpost);
app.use(middleware_1.default);
app.get("/api/v1/getcontent", contentget);
app.listen(Number(env_config_1.env.PORT), () => {
    console.log("hosted at http://localhost:3000" + env_config_1.env.DATABASE_URL + Number(env_config_1.env.PORT));
});

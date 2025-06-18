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
app.use(cors(env_config_1.env.FE_URL));
app.post("/api/vi/signin", signupauth);
app.post("/api/v1/login", loginauth);
app.use(middleware_1.default);
app.post("/api/v1/content", contentpost);
app.get("/api/v1/contents", contentget);
app.delete("/api/v1/content", contentdelete);
app.listen(parseInt(env_config_1.env.PORT), () => {
    console.log("hosted at http://localhost:3000");
});

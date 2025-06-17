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
const zod_1 = __importDefault(require("zod"));
const express = require("express");
const jwt = require("jsonwebtoken");
const secret = "hehee";
const { usermodel, linkmodel, contentmodel } = require("./db");
const usertype = zod_1.default.object({
    username: zod_1.default.string(),
    password: zod_1.default.string()
});
const app = express();
app.use(express.json());
function signupauth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const isright = usertype.safeParse(req.body);
        if (isright) {
            let userexist = yield usermodel.findOne({ username: username });
            if (!userexist) {
                try {
                    yield usermodel.create({ username: username, password: password });
                }
                catch (e) {
                    res.send({
                        message: "not able to store data"
                    });
                }
            }
            else {
                res.send({
                    message: "user already exist"
                });
            }
        }
        else {
            res.send({
                message: "format is not correct"
            });
        }
    });
}
function loginauth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entered llogin auth");
        var { username, password } = req.body;
        const isright = usertype.safeParse(req.body);
        if (isright) {
            let userexist = yield usermodel.findOne({ username: username });
            if (userexist) {
                if (userexist.password === password) {
                    const token = jwt.sign({ user_id: userexist._id }, secret, { expiresIn: "1h" });
                    res.setHeader("Authorization", token);
                    res.setHeader("Access-Control-Expose-Headers", "Authorization");
                    res.status(200).send({
                        message: "logged in"
                    });
                }
                else {
                    res.send({
                        message: "password incorrect"
                    });
                }
            }
            else {
                res.status(200).send({
                    message: "user does not exist go signin"
                });
            }
        }
        else {
            res.status(200).send({
                message: "format incorrrect"
            });
        }
    });
}
module.exports = {
    signupauth,
    loginauth
};

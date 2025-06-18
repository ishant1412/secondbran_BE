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
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env_config_1 = require("./env_config");
const { usermodel, linkmodel, contentmodel } = require("./db");
const types_1 = require("./types");
const app = express();
app.use(express.json());
function signupauth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isright = types_1.usertype.safeParse(req.body);
        if (isright) {
            const { username, password, email } = req.body;
            let userexist = yield usermodel.findOne({ username: username });
            if (!userexist) {
                try {
                    const hashed_pass = yield bcrypt.hash(password, parseInt(env_config_1.env.SALT_ROUND));
                    yield usermodel.create({ username: username, password: hashed_pass, email: email });
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
                message: isright.result.flatten() // this will send the input errors to FE
            });
        }
    });
}
function loginauth(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isright = types_1.usertype.safeParse(req.body);
        if (isright) {
            const { username, password, email } = req.body;
            let userexist = yield usermodel.findOne({ username: username });
            if (userexist) {
                const hashed_pass = yield bcrypt.hash(password, env_config_1.env.SALT_ROUND);
                if (userexist.password === hashed_pass) {
                    const token = jwt.sign({ user_id: userexist._id }, env_config_1.env.JWT_SECRET, { expiresIn: "1d" });
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
                res.status(400).send({
                    message: "user does not exist go signin"
                });
            }
        }
        else {
            res.status(400).send({
                message: isright.result.flatten() // same as we did in signin time 
            });
        }
    });
}
module.exports = {
    signupauth,
    loginauth
};

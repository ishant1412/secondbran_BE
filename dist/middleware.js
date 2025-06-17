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
const secret = "hehee";
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
function Authuser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.headers['authorization']) {
            console.log("hi");
            const decoded = yield jwt.verify(req.headers['authorization'], secret);
            if (decoded.user_id) {
                req.user_id = decoded.user_id;
                next();
            }
            else {
                res.status(500).send({
                    msessage: "couldnt decode the token"
                });
            }
        }
        else {
            res.send({
                message: "login must"
            });
        }
    });
}
exports.default = Authuser;

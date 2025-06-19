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
const express = require("express");
const app = express();
const mongoose_1 = __importDefault(require("mongoose"));
const { contentmodel } = require("./db");
const contentTypes = ['video', 'article', 'podcast']; // Extend as needed
app.use(express.json());
const types_1 = require("./types");
function contentpost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isvalid = types_1.contentZodSchema.safeParse(req.body);
        if (isvalid.success) {
            const data = isvalid.data;
            const oid = new mongoose_1.default.Types.ObjectId(data.userId);
            const content = { link: data.link,
                type: data.type,
                title: data.title,
                description: data.description,
                shareable: data.shareable,
                tags: data.tags,
                userId: oid };
            try {
                yield contentmodel.create(content);
                res.status(200).send({
                    message: "succesfully inserted content"
                });
            }
            catch (e) {
                res.status(404).send({
                    message: "unable to store the data"
                });
            }
        }
        else {
            res.status(400).send({
                message: isvalid.error.flatten()
            });
        }
    });
}
function contentget(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //  console.log("entered the content get")
        console.log("hi");
        if (req.user_id) {
            console.log(req.user_id);
            const userId = new mongoose_1.default.Types.ObjectId(req.user_id);
            try {
                const usercontentdata = yield contentmodel.find({ userId: userId });
                // console.log(usercontentdata);
                res.status(200).json({
                    usercontentdata: usercontentdata,
                    message: "the data is sent"
                });
            }
            catch (e) {
                res.status(400).send({
                    message: "unable to fetch content from ddatabse"
                });
            }
        }
        else {
            res.status(300).send({
                message: "invalid user or user id not provided"
            });
        }
    });
}
function contentdelete(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.params.contentId) {
            const contentId = new mongoose_1.default.Types.ObjectId(req.params.contentId);
            try {
                yield contentmodel.findOneAndDelete({ ObjectId: contentId });
                res.status(200).send({
                    message: "successfully deleted the content"
                });
            }
            catch (e) {
                res.status(300).send({
                    message: "unable to delete the content ort did not fint the content to be deleted"
                });
            }
        }
        else {
            res.status(200).send({
                message: "invalid content id or not provided"
            });
        }
    });
}
module.exports = {
    contentpost,
    contentget,
    contentdelete
};

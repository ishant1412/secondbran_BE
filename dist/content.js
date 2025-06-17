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
const app = express();
const mongoose_1 = __importDefault(require("mongoose"));
const { contentmodel } = require("./db");
const contentTypes = ['video', 'article', 'podcast']; // Extend as needed
app.use(express.json());
const contentZodSchema = zod_1.default.object({
    token: zod_1.default.string(),
    link: zod_1.default.string().url(),
    type: zod_1.default.enum(contentTypes),
    title: zod_1.default.string(),
    tags: zod_1.default.array(zod_1.default.string().regex(/^[a-f\d]{24}$/i)).optional(), // ObjectId as string
    userId: zod_1.default.string().regex(/^[a-f\d]{24}$/i), // ObjectId as string
});
function contentpost(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const contentdata = req.body;
        const isvalid = contentZodSchema.safeParse(req.body);
        if (isvalid.success) {
            const data = isvalid.data;
            const content = {
                title: data.title,
                type: data.type,
                link: data.link,
                tags: (_a = data.tags) === null || _a === void 0 ? void 0 : _a.map((id) => new mongoose_1.default.Types.ObjectId(id)),
                userId: new mongoose_1.default.Types.ObjectId(data.userId)
            };
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
                message: "foramt tupe is unvalid"
            });
        }
    });
}
function contentget(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("entered the content get");
        if (req.user_id) {
            console.log(req.user_id);
            const userId = new mongoose_1.default.Types.ObjectId(req.user_id);
            try {
                const usercontentdata = yield contentmodel.find({ userId: userId });
                console.log(usercontentdata);
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

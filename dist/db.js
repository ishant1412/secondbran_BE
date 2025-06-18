"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const mongo = require("mongoose");
const userschema = new mongo.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true }
}); // Extend as needed
const contentSchema = new mongo.Schema({
    link: { type: String },
    type: { type: String, enum: types_1.contentTypes, required: true },
    title: { type: String, required: true },
    description: { typeL: String },
    shareable: { type: Boolean, required: true },
    tags: [{ type: mongo.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongo.Schema.Types.ObjectId, ref: 'User', required: true },
});
const contentmodel = mongo.model("contents", contentSchema);
const usermodel = mongo.model("users", userschema);
module.exports = {
    contentmodel: contentmodel,
    usermodel: usermodel
};

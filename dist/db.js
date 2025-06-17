"use strict";
const mongo = require("mongoose");
const userschema = new mongo.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed
const contentSchema = new mongo.Schema({
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongo.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongo.Schema.Types.ObjectId, ref: 'User', required: true },
});
const linkSchema = new mongo.Schema({
    hash: { type: String, required: true },
    userId: { type: mongo.Schema.Types.ObjectId, ref: 'User', required: true },
});
const linkmodel = mongo.model("links", linkSchema);
const contentmodel = mongo.model("contents", contentSchema);
const usermodel = mongo.model("users", userschema);
module.exports = {
    linkmodel: linkmodel,
    contentmodel: contentmodel,
    usermodel: usermodel
};

const { signupauth, loginauth } = require("./auth");
import Authuser from "./middleware";
const {contentpost,contentget,contentdelete}=require("./content");
const cors = require("cors")
import express from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";
import mongoose from "mongoose";



mongoose.connect('mongodb+srv://ishant:ishant1234@cluster0.kdiuh.mongodb.net/brain');


const app=express();
app.use(express.json());
app.use(cors())
app.post("/api/vi/signin",signupauth);
app.post("/api/v1/login",loginauth);
app.use(Authuser);
app.post("/api/v1/content",contentpost);
app.get("/api/v1/content",contentget);
app.delete("/api/v1/content",contentdelete);

app.listen(3000,()=>{
    console.log("hosted at http://localhost:3000")
});



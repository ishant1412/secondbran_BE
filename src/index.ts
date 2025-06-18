const { signupauth, loginauth } = require("./auth");
import Authuser from "./middleware";
const {contentpost,contentget,contentdelete}=require("./content");
const cors = require("cors")
import express from "express";
import jwt from "jsonwebtoken";
import {z} from "zod";
import { env } from "./env_config";
import mongoose from "mongoose";



mongoose.connect(env.DATABASE_URL);


const app=express();
app.use(express.json());
app.use(cors(env.FE_URL))
app.post("/api/vi/signin",signupauth);
app.post("/api/v1/login",loginauth);
app.use(Authuser);
app.post("/api/v1/content",contentpost);
app.get("/api/v1/contents",contentget);
app.delete("/api/v1/content",contentdelete);

app.listen(parseInt(env.PORT),()=>{
    console.log("hosted at http://localhost:3000")
});



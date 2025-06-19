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
app.use(cors())
app.post("/api/v1/signup",signupauth);
app.post("/api/v1/login",loginauth);



app.delete("/api/v1/contentdelete",contentdelete);
app.post("/api/v1/contentpost",contentpost);
app.use(Authuser);
app.get("/api/v1/getcontent",contentget);

app.listen(Number(env.PORT),()=>{
    console.log("hosted at http://localhost:3000" +env.DATABASE_URL +Number(env.PORT))
});



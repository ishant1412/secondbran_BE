import { Request, Response } from "express";
import mongoose from "mongoose";
import z, { number } from "zod";
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { env } from "./env_config";
const { usermodel, linkmodel, contentmodel } = require("./db")
import { usertype } from "./types";
const app = express();
app.use(express.json());
async function signupauth(req: Request, res: Response) {
console.log("hi");

    const isright = usertype.safeParse(req.body);

    if (isright.success) {
        
        const { username, password, email } = req.body;
        let userexist = await usermodel.findOne({ username: username });
        let email_exist= await usermodel.findOne({email:email});
        if (!userexist && !email_exist) {
            try {
                const hashed_pass = await bcrypt.hash(password, parseInt(env.SALT_ROUNDS))
                await usermodel.create({ username: username, password: hashed_pass, email: email });
                res.status(200).send({
                    message:"signed up successfully"
                })
                                                                                  
            }
            catch (e) {
                res.send({
                    message: "not able to store data"
                })
            }

        }
        else {
            res.send({
                message: "user already exist"
            })
        }
    }
    else {
        res.send({
            message: isright.error.flatten() // this will send the input errors to FE
        })
    }


}

async function loginauth(req: Request, res: Response) {
      
    const isright = usertype.safeParse(req.body);
    if (isright.success) {
        const { username, password, email } = req.body;
        const userexist = await usermodel.findOne({ username: username });
       const email_exist = await usermodel.findOne({email:email})

        if (userexist && email_exist) {
            const ismatch = await bcrypt.compare(password,userexist.password)
            if (ismatch) {
                const token = jwt.sign({ user_id: userexist._id }, env.JWT_SECRET, { expiresIn: "1d" })
                res.setHeader("Authorization", token);
                res.setHeader("Access-Control-Expose-Headers", "Authorization");
                res.status(200).send({
                    message: "logged in"
                });
            }
            else {
                res.send({
                    message: "password incorrect"
                })
            }


        }
        else {
            res.status(400).send({
                message: "user does not exist go signin"
            })
        }
    }
    else {
        res.status(400).send({
            message: isright.error.flatten() // same as we did in signin time 
        })
    }
}
module.exports = {
    signupauth,
    loginauth
}
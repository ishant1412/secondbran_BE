import { Request, Response } from "express";
import mongoose from "mongoose";
import z from "zod";
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import { env } from "./env_config";
const { usermodel, linkmodel, contentmodel } = require("./db")
import { usertype } from "./types";
const app = express();
app.use(express.json());
async function signupauth(req: Request, res: Response) {


    const isright = usertype.safeParse(req.body);
    if (isright) {
        const { username, password, email } = req.body;
        let userexist = await usermodel.findOne({ username: username });
        if (!userexist) {
            try {
                const hashed_pass = await bcrypt.hash(password, parseInt(env.SALT_ROUND))
                await usermodel.create({ username: username, password: hashed_pass, email: email });

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
            message: isright.result.flatten() // this will send the input errors to FE
        })
    }


}

async function loginauth(req: Request, res: Response) {

    const isright = usertype.safeParse(req.body);
    if (isright) {
        const { username, password, email } = req.body;
        let userexist = await usermodel.findOne({ username: username });


        if (userexist) {
            const hashed_pass = await bcrypt.hash(password, env.SALT_ROUND)
            if (userexist.password === hashed_pass) {
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
            message: isright.result.flatten() // same as we did in signin time 
        })
    }
}
module.exports = {
    signupauth,
    loginauth
}
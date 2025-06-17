import { Request, Response } from "express";
import mongoose from "mongoose";
import z from "zod";
const express = require("express");
const jwt = require("jsonwebtoken");
const secret="hehee"
const { usermodel, linkmodel, contentmodel } = require("./db")
const usertype = z.object({
    username: z.string(),
    password: z.string()
})
const app= express();
app.use(express.json());
async function signupauth(req: Request, res: Response) {
    const { username, password } = req.body;
   
    const isright = usertype.safeParse(req.body);
    if (isright) {
        let userexist = await usermodel.findOne({ username: username });
        if (!userexist) {
            try {
                await usermodel.create({ username: username, password: password });
          
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
            message: "format is not correct"
        })
    }


}

async function loginauth(req:Request,res:Response){
    console.log("entered llogin auth");
    var { username, password } = req.body;
  
 
    const isright = usertype.safeParse(req.body);
    if (isright) {
        let userexist = await usermodel.findOne({ username: username });
        

        if(userexist){
            if(userexist.password===password){
                const token = jwt.sign({user_id:userexist._id},secret,{expiresIn:"1h"})
             res.setHeader("Authorization",  token);
             res.setHeader("Access-Control-Expose-Headers", "Authorization");
                res.status(200).send({
                  message: "logged in"
                });
            }  
            else{
                res.send({
                    message:"password incorrect"
                })
            }   

            
        }
        else{
            res.status(200).send({
                message:"user does not exist go signin"
            })
        }
    }
    else{
        res.status(200).send({
            message:"format incorrrect"
        })
    }
} 
module.exports={
    signupauth,
    loginauth
}
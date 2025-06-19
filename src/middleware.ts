import {Response,Request,NextFunction,Express} from "express";

import { Navigate } from "react-router-dom";
 const express = require("express");
import { env } from "./env_config";

 const app = express();
 app.use(express.json());

const jwt = require("jsonwebtoken");




async function Authuser(req:Request,res:Response,next:NextFunction){
     console.log("hi")

    if(req.headers['authorization']){
         const authheader = req.headers['authorization'];
           const token = authheader.split(' ')[1];
           console.log(req.body)
      const decoded= await jwt.verify(token,env.JWT_SECRET);
      if(decoded.user_id){ 
        req.user_id= decoded.user_id;
     next()
      }
      else{
        res.status(500).send({
            msessage:"couldnt decode the token"
        })
      }
    }
    else{
        res.send({
            message:"login must"
            
        })
    }

}

export default Authuser;
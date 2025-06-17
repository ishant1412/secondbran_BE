import {Response,Request,NextFunction,Express} from "express";
import { Navigate } from "react-router-dom";
 const express = require("express");
 const secret="hehee"

 const app = express();
 app.use(express.json());

const jwt = require("jsonwebtoken");
async function Authuser(req:Request,res:Response,next:NextFunction){
    if(req.headers['authorization']){
         
     console.log("hi")
      const decoded= await jwt.verify(req.headers['authorization'],secret);
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
import { boolean } from "zod";
import {contentTypes}from "./types"
const mongo =require("mongoose");




const userschema = new mongo.Schema({
   
    username:{type:String,required:true,unique:true},
    password:{type:String ,required:true},
    email:{type:String,required:true}

}) // Extend as needed

const contentSchema = new mongo.Schema({
  link: { type: String },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  description:{type:String},
  shareable:{type:Boolean,required:true},
  tags:{type:[String]},
  userId: { type: mongo.Schema.Types.ObjectId, ref: 'User', required: true },
});


const contentmodel = mongo.model("contents",contentSchema);
const usermodel = mongo.model("users",userschema);
module.exports={
  
    contentmodel:contentmodel,
    usermodel:usermodel
}

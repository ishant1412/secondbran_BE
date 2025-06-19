import { Response, Request } from "express";
import z from "zod";
import { ObjectId } from "mongoose";
const express = require("express");
const app= express();
import mongoose from "mongoose";
const { contentmodel } = require("./db")
const contentTypes = ['video', 'article', 'podcast'] as const; // Extend as needed
app.use(express.json());
import { contentZodSchema } from "./types";
 declare global {
  namespace Express {
    interface Request {
      user_id?:string
  }
}}
async function contentpost(req: Request, res: Response) {
   
    const isvalid = contentZodSchema.safeParse(req.body);
    if (isvalid.success) {

        const data = isvalid.data;
        const oid = new mongoose.Types.ObjectId(data.userId);
      const content = {    link:data.link,
     type:data.type,
     title:data.title,
     description:data.description,
     shareable:data.shareable,
     tags:data.tags,
     userId:oid}
        try {
            await contentmodel.create(content);
            res.status(200).send({
                message: "succesfully inserted content"

            })
        }
        catch (e) {
            res.status(404).send({
                message: "unable to store the data"
            })
        }
    }
    else {
        res.status(400).send({
            message: isvalid.error.flatten()
        })
    }


}

async function contentget(req: Request, res: Response) {
  //  console.log("entered the content get")
  console.log("hi");
    if (req.user_id) {
        console.log(req.user_id);
        const userId = new mongoose.Types.ObjectId(req.user_id);
        try {

            const usercontentdata = await contentmodel.find({ userId: userId });
           // console.log(usercontentdata);
            res.status(200).json({
                usercontentdata: usercontentdata,
                message: "the data is sent"
            })
        }
        catch (e) {
            res.status(400).send({
                message: "unable to fetch content from ddatabse"
            })
        }
    }
    else {
        res.status(300).send({
            message: "invalid user or user id not provided"
        })
    }


}
async function contentdelete(req: Request, res: Response) {
    if (req.params.contentId) {
        const contentId = new mongoose.Types.ObjectId(req.params.contentId);
        try {
            await contentmodel.findOneAndDelete({ ObjectId: contentId });
            res.status(200).send({
                message: "successfully deleted the content"
            })
        }
        catch (e) {
            res.status(300).send({
                message: "unable to delete the content ort did not fint the content to be deleted"
            })

        }
    }
    else {
        res.status(200).send({
            message: "invalid content id or not provided"
        })
    }
}

module.exports={
    contentpost,
    contentget,
    contentdelete
}
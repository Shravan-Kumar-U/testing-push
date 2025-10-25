import express from 'express'
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { GetAuthRequest } from './definitionFile'
import { LinkModel, UserModle } from './db';
import { ContestModel } from './db'
import { JWT_SECRETE } from './config'
import { userMiddlware } from './middleware';
import { randomGen } from './util'
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/signup", async (req, res) => {
    //zod validation, hash the passowrd
    const username = req.body.username;
    const password = req.body.password;
    try{
        await UserModle.create({
            username: username,
            password: password
        })
        res.status(200).json({
            msg: "You are signed up"
        })
    }catch(e){
        res.status(411).json({
            msg: "User is already exists"
        })
    }
})

app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const existingUser = await UserModle.findOne({
        username: username,
        password: password
    })
    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, JWT_SECRETE);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            msg: "Incurrect Credentials"
        })
    }
    

})

app.post("/api/v1/content", userMiddlware , async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    await ContestModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    })

    res.json({
        message: "content added"
    })

})

app.get("/api/v1/content", userMiddlware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContestModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })

})
app.delete("/api/v1/content", userMiddlware, async (req, res) => {
    const contentId = req.body.contentId;
    await ContestModel.deleteMany({
        contentId,
        //@ts-ignore
        requserId

    })

})

app.post("/api/v1/brain/share", userMiddlware, async (req, res) => {
    const share = req.body.share;
    //const { share } = req.body;
    if(share){
        const findUser = await LinkModel.findOne({
            //@ts-ignore 
            userId: req.userId
        })
        
        if(findUser){
            res.json({
                //@ts-ignore 
                hash: findUser.hash
            })
            return;
        }
        let hash = randomGen(10);
        await LinkModel.create({
            //@ts-ignore    
            userId: req.userId,
            hash: hash
        })
        res.json({
            hash
        })
        
    }else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            message: "Removed link"
        })
    }
    
})

app.get("/api/v1/brain/:sharelink", async (req, res) => {
    const hash = req.params.sharelink;
    let link = await LinkModel.findOne({
        hash: hash
    })
    if(!link){
        res.status(411).json({
            message: "Sorry incorrect output"
        })
        return;
    }
    const content = await ContestModel.find({
        userId: link.userId
    })

    const user = await UserModle.findOne({
        _id: link.userId
    })

    //Logically it won't happen. Because if a user is not exists then how can a link can be send by the user
    if(!user){
        res.status(411).json({
            message: "Sorry incorrect output"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })
})

app.listen(3000);
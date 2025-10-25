import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRETE } from './config'

//Writing the middleware using TS
export const userMiddlware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    //Just a writing it in TS
    const decoded = jwt.verify(header as string, JWT_SECRETE);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }else{
        res.json(403).json({
            message: "You are not Loged in"
        })
    }

}

//override the types of the express request object
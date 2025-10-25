import { Request } from "express";

export interface GetAuthRequest extends Request {
    userId: string 
}
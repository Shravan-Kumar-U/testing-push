"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddlware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
//Writing the middleware using TS
const userMiddlware = (req, res, next) => {
    const header = req.headers["authorization"];
    //Just a writing it in TS
    const decoded = jsonwebtoken_1.default.verify(header, config_1.JWT_SECRETE);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.json(403).json({
            message: "You are not Loged in"
        });
    }
};
exports.userMiddlware = userMiddlware;
//override the types of the express request object

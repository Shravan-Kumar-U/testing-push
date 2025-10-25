"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const db_2 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const util_1 = require("./util");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //zod validation, hash the passowrd
    const username = req.body.username;
    const password = req.body.password;
    try {
        yield db_1.UserModle.create({
            username: username,
            password: password
        });
        res.status(200).json({
            msg: "You are signed up"
        });
    }
    catch (e) {
        res.status(411).json({
            msg: "User is already exists"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = yield db_1.UserModle.findOne({
        username: username,
        password: password
    });
    if (existingUser) {
        const token = jsonwebtoken_1.default.sign({
            id: existingUser._id
        }, config_1.JWT_SECRETE);
        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({
            msg: "Incurrect Credentials"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddlware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    yield db_2.ContestModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "content added"
    });
}));
app.get("/api/v1/content", middleware_1.userMiddlware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield db_2.ContestModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
}));
app.delete("/api/v1/content", middleware_1.userMiddlware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield db_2.ContestModel.deleteMany({
        contentId,
        //@ts-ignore
        requserId
    });
}));
app.post("/api/v1/brain/share", middleware_1.userMiddlware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    //const { share } = req.body;
    if (share) {
        const findUser = yield db_1.LinkModel.findOne({
            //@ts-ignore 
            userId: req.userId
        });
        if (findUser) {
            res.json({
                //@ts-ignore 
                hash: findUser.hash
            });
            return;
        }
        let hash = (0, util_1.randomGen)(10);
        yield db_1.LinkModel.create({
            //@ts-ignore    
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
app.get("/api/v1/brain/:sharelink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.sharelink;
    let link = yield db_1.LinkModel.findOne({
        hash: hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect output"
        });
        return;
    }
    const content = yield db_2.ContestModel.find({
        userId: link.userId
    });
    const user = yield db_1.UserModle.findOne({
        _id: link.userId
    });
    //Logically it won't happen. Because if a user is not exists then how can a link can be send by the user
    if (!user) {
        res.status(411).json({
            message: "Sorry incorrect output"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
app.listen(3000);

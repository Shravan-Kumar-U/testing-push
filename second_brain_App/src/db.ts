//creating models and schemas here
import mongoose, { model, Schema } from "mongoose";

//Connecting to the mongoDB
mongoose.connect("mongodb+srv://project_01:45fiqVP8Bjm9DFVL@cluster0.v8zmr.mongodb.net/Brainly");
//Creating the Schema for the User
const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})

//Creating the Model for the User, We need to export the models
export const UserModle = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    type: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}]
})      

export const ContestModel = model("Content", ContentSchema);

const LinkSchema = new Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true},
    hash: String
})

export const LinkModel = model("Links", LinkSchema);
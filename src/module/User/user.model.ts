import mongoose, { model, Schema } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    age: number;
    types: string[];
    _id: mongoose.ObjectId
  }

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    types: [{
        type: String
    }]
})

export const userModel = model<IUser>("user", userSchema)
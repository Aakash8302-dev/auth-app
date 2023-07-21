import { Document, Model } from "mongoose";

export interface IUser extends Document{
    email: string;
    name:string;
    password: string;
    role: "user" | "admin",
    
}
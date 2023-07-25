import mongoose,{Schema, Document} from "mongoose";
import bcryptjs from 'bcryptjs'
import { IUser} from "../types";

interface IUserDocument extends IUser {
    matchPassword(enteredPassword: string): boolean
}

const userSchema = new Schema<IUserDocument>({
    email:{
        type:String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    }
})

userSchema.methods.matchPassword = async function (enteredPassword: string){
    return await bcryptjs.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(this:IUser, next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
})

export default mongoose.model<IUserDocument>("User", userSchema);





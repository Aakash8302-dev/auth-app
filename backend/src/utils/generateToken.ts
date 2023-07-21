import jsonwebtoken from 'jsonwebtoken'
import User from '../models/userModel'
import dotenv from 'dotenv'
import { IUser } from '../types';
dotenv.config();

const generateToken = (user:IUser, expiresIn: string|number) => {

        return jsonwebtoken.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role

        }, process.env.JWT_SECRET || '', {
            expiresIn
        })
   
}

export default generateToken
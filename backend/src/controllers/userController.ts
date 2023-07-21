import express, { Request, Response } from 'express'
import { IUser } from '../types';
import User from '../models/userModel'
import generateToken from '../utils/generateToken';
import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config();

const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const body:IUser = req.body;
        
        const user = new User({
            email: body.email,
            name: body.name,
            password: body.password,
            role: body.role
        })

        await user.save();
        res.status(200).json({
            message: "User Created",
            user
        })

    }catch(error){
        throw error
    }
}

const getAllUsers = async(req: Request, res: Response):Promise<void> => {
    try {
        const user = await User.find({});
        if(user){
            res.status(200).json(user)
        }else{
            res.json({
                message: "No Users found"
            })
        }
    } catch (error) {
        throw error
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if(user){
            await User.findByIdAndDelete(id);
            res.json({
                "message": "User deleted Successfully"
            })

        }else{
            res.json({
                message: `User with id ${id} not found`
            })
        }

    } catch (error) {
        throw error
    }
}

const getUserById = async(req:Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if(user){
            res.json(user);
        }

    } catch (error) {
        throw error
    }
}

const loginUser = async(req: Request, res: Response) => {
    try {
        const body = req.body;
        
        const user = await User.findOne({email: body.email});

        if(user && (await user.matchPassword(body.password))){
            const token = generateToken(user, '30d');
            res.json({
                user:{
                    id :user._id,
                    name: user.name,
                    email: user.email,   
                    role: user.role
                },
                token
            })
        }else{
            res.status(400).json({
                message: `Incorrect Email or Password`
            })
        }
        

    } catch (error) {
        throw error
    }
}

export {createUser, getAllUsers, deleteUser, getUserById, loginUser}
import express, { Request, Response } from 'express'
import { IUser } from '../types';
import User from '../models/userModel'
import Route from '../models/routeModel'
import generateToken from '../utils/generateToken';
import nodemailer from 'nodemailer'
import {ROUTE_TYPES, returnDefaultRoutes} from '../constants/index'
import { ALL_PERMISSIONS, USER_DEFAULT_PERMISSIONS } from '../constants/permissions';
import dotenv from "dotenv"
dotenv.config();

const createUser = async (req: Request, res: Response): Promise<void> => {
    try{
        const body = req.body;
        
        const user = new User({
            email: body.email,
            name: body.name,
            password: body.password,
            role: body.role 
        })

        let optionalPermissions = body.permissions
        optionalPermissions = optionalPermissions.slice(1,);
        const newUser = await user.save();

        let routesAccessible:string[] 

        if(user.role === 'admin'){
            routesAccessible = Object.keys(ALL_PERMISSIONS)
        }else{

            console.log(optionalPermissions);

            routesAccessible = Object.keys(USER_DEFAULT_PERMISSIONS) 
            routesAccessible = optionalPermissions ? routesAccessible.concat(optionalPermissions) : routesAccessible
        }

        if(newUser){
            const userPermissions  = new Route({
                userId: user._id,
                routesAccessible
            })
            await userPermissions.save();
        }
 

        res.status(200).json({
            message: "User Created",
            user
        })

    }catch(error:any){
        res.status(500).json({
            error: error.message
        })
    }
}

const getAllUsers = async(req: Request, res: Response):Promise<void> => {
    try {
        const user = await User.find({});
        if(user){
            res.status(200).json(user)
        }else{
           throw new Error("No Users found")
        }
    } catch (error:any) {
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);
        const userPermissions = await Route.findOne({userId: id});

        if(user && userPermissions){
            await User.findByIdAndDelete(id);
            await Route.findOneAndDelete({userId:id})
            res.status(200).json({
                "message": "User deleted Successfully"
            })

        }else{
            throw new Error(`invalid user id`)
        }

    } catch (error:any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getUserById = async(req:Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if(user){
            res.json(user);
        }else{
            throw new Error(`User not found`)
        }

    } catch (error:any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const loginUser = async(req: Request, res: Response) => {
    try {
        const body = req.body;
        
        const user = await User.findOne({email: body.email});

        if(user && (await user.matchPassword(body.password))){
            const token = generateToken(user, '15m');
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
            throw new Error("Incorrect email or password")
        }
        

    } catch (error:any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const createAdmin = async(req:Request, res:Response) => {

    const body:IUser = req.body;
        
    const user = new User({
        email: body.email,
        name: body.name,
        password: body.password,
        role: body.role
    })

    await user.save();

    let routesAccessible:string[] = []

        if(user.role === "admin"){
            routesAccessible = Object.keys(ALL_PERMISSIONS);
        }

        const userPermissions  = new Route({
            userId: user._id,
            routesAccessible
        })

        await userPermissions.save();

        res.status(200).json({
            message: "User Created",
            user
        })

}

export {createUser, getAllUsers, deleteUser, getUserById, loginUser, createAdmin}
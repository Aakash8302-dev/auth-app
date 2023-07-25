import express,{Request, Response} from "express"
import Route from "../models/routeModel"
import { Document, Model } from "mongoose";

const getAllUserPermissions = async(req: Request, res: Response) => {
    try {

        const routes = await Route.find({});
        if(routes){
            res.status(200).json(routes)
        }

    } catch (error) {
        
    }
}

const getUserPermissions = async(req:Request, res:Response) => {
    try {        
        const userId = req.params.id;

        const routes = await Route.findOne({userId: userId});

        if(routes){
            res.status(200).json(routes)
        }else{
            throw new Error("Invalid user")
        }
    } catch (error:any) {
        res.status(500).json({
            error: error.message
        })
    }
}

const createUserPermissions = async(req:Request,res:Response) => {
    try {
        
        const userId = req.params.id
        const body = req.body;

        const route = new Route({
            userId: userId,
            routesAccessible:{
                userRoutes: body.userRoutes,
                appRoutes: body.appRoutes,
                routeRoutes: body.routeRoutes
            }
        })

        await route.save();

        res.status(200).json({
            message: "Route Created successfully"
        })


    } catch (error) {
        
    }
}  

const updateUserPermissions = async(req:Request, res: Response) => {
    try {
        const userId = req.params.id
        const body = req.body

        const doc= await Route.findOne({userId:userId});
        const routesAccessible = doc?.routesAccessible
        
        Object.keys(body).map(async (routes) => { 

            let routePermissions = routesAccessible?.[routes as keyof typeof routesAccessible]

            body[routes].map((route:string) =>{
               !routePermissions?.includes(route) && routePermissions?.push(route)
            });   
        })

        const newRoutes = await doc?.save();

        if(newRoutes){
            res.status(200).json({
                message: "Routes updated successfully"
            });
        }
      

    } catch (error:any) {
        res.status(500).json({
            error: error.message
        })
    }
}

export {createUserPermissions, getAllUserPermissions, getUserPermissions, updateUserPermissions}
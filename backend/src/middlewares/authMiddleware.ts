import { Request,Response, NextFunction } from 'express'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

export class Authentication{
    static protect(role: string[] | "any"){
        return async (req:Request,res: Response,next: NextFunction) => {
            let token;
            if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
                try {

                    token = req.headers.authorization.split(' ')[1];
                    const decoded:any = jsonwebtoken.verify(token, process.env.JWT_SECRET || '');
                    res.locals.user = decoded;

                    if( role!=="any" && !role.includes(decoded.role)){
                        throw new Error("You are not allowed")
                    }else{
                        next();
                    }

                } catch (error) {
                    return res.status(500).send({
                        msg: "Unable to parse request",
                        error
                    })
                }
            }

            if(!token){
                res.status(401).json({
                    msg: "Not Authorized or no token"
                });
            }
           
        }
    }
}
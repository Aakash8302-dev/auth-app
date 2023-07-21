import {Request, Response} from "express"
import User from "../models/userModel"
import nodemailer from "nodemailer"
import generateToken from '../utils/generateToken'


const passwordEmailReset = async(req:Request, res: Response) => {
    try {
        const body = req.body;
        const user =  await User.findOne({email: body.email});

        if(user){

            const token = generateToken(user, 60*60*5)

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: process.env.MAILER_USER,
                    pass: process.env.MAILER_PASS
                }
            });
    
            const mailOptions = {
                from: process.env.MAILER_USER,
                to: user.email,
                subject: "Password Reset",
                text: `Here is the link to reset password ${process.env.FALLBACK_URI}?key=${token}`
            }
    
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    res.status(400).send(error)
                }else{
                    res.status(200).send("Email sent ")
                }
            })


        }else{
            res.status(400).json({
                message: "User with email doesn't exist"
            })
        }

    } catch (error) {
        
    }

}

const verifyToken = async(req:Request, res: Response) => {
    res.status(200).json(res.locals.user);
}

const sendEmail = async(req:Request, res:Response) => {
    try {
        const body = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAILER_USER,
            to: body.recipient,
            subject: body.subject,
            text: body.text
        }

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.status(400).send(error)
            }else{
                res.status(200).send("Email sent ")
            }
        })

    } catch (error) {
        throw error
    }
}   


export {passwordEmailReset, verifyToken}
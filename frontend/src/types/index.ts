import { SelectProps } from "@mui/material"

export interface ILogin{
    email:string | null,
    password:string | null
}

export interface IUserDetails{
    token: string,
    user:{
        id:string,
        email:string,
        name: string,
        role:string
    }
}

export interface IUser{
    _id: string,
    email: string,
    name: string,
    role:string
}

export interface IUserCreate{
    name: string | null,
    email: string | null,
    role: string | null,
    password: string | null,
    cPassword: string | null,
    permissions: string[] | null | string
}

export interface IPasswordReset{
    password: string | null,
    cPassword: string | null
}

export interface IAlert{
    severity: "error" | "success" | "info" | "warning" | undefined,
    message: string,
    open: boolean,
}
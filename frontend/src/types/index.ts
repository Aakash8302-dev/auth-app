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
    cPassword: string | null
}
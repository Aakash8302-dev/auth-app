import axios from 'axios'
import { getUser } from './storage'

const uri = `${import.meta.env.VITE_BACKEND_URI}/api/app`

const user = getUser();

interface IResetPass{
    token:string,
    password: string
}

const resetPasswordEmail = (email:string) => {
    return axios.post(`${uri}/reset`, {email})
}

const verifyToken = () => {
    return axios.get(`${uri}/verify`,{headers:{
        Authorization: `Bearer ${user?.token}`
    }})
}

const resetPassword = ({token,password}:IResetPass) => {
    return axios.post(`${uri}/resetpass`,{newPassword:password}, {headers:{
        Authorization: `Bearer ${token}`
    }})
}

export {resetPasswordEmail, verifyToken, resetPassword}
import axios from 'axios'

const uri = `${import.meta.env.VITE_BACKEND_URI}/api/app`

interface IResetPass{
    token:string,
    password: string
}

const resetPasswordEmail = (email:string) => {
    return axios.post(`${uri}/reset`, {email})
}

const verifyToken = (token:string) => {
    return axios.get(`${uri}/verify`,{headers:{
        Authorization: `Bearer ${token}`
    }})
}

const resetPassword = ({token,password}:IResetPass) => {
    return axios.post(`${uri}/resetpass`,{newPassword:password}, {headers:{
        Authorization: `Bearer ${token}`
    }})
}

const getUserPermissions = (token:string, id:string) => {
    return axios.get(`${uri}/route/${id}`, {headers:{
        Authorization: `Bearer ${token}`
    }})
}

export {resetPasswordEmail, verifyToken, resetPassword, getUserPermissions}
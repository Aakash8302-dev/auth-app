import axios from 'axios'
import { ILogin } from '../types'
import { getUser } from './storage'
import { IUserCreate } from '../types'

const uri = `${import.meta.env.VITE_BACKEND_URI}/api/user`

export const userLogin = (data:ILogin) => {
    return axios.post(`${uri}/login`, data)
}

export const getAllUsers = () => {
    const userDetails = getUser();
    return axios.get(`${uri}/`,{headers:{Authorization: `Bearer ${userDetails?.token}`}});
}

export const deleteUser = (id:string) => {
    const userDetails = getUser();
    return axios.delete(`${uri}/${id}`, {headers:{Authorization: `Bearer ${userDetails?.token}`}});
}

export const createUser = ({name, role,email, password, permissions}:IUserCreate) => {
    const userDetails = getUser();
    return axios.post(`${uri}/`, {name,role,email,password, permissions}, {headers:{Authorization: `Bearer ${userDetails?.token}`}});
}
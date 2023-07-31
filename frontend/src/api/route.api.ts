import axios from 'axios'
import { getUser } from './storage'

const uri = `${import.meta.env.VITE_BACKEND_URI}/api/route`

const getUserPermissions = () => {
    const userDetails = getUser();
    return axios.get(`${uri}/permissions/${userDetails?.user.id}`, {headers:{
        Authorization: `Bearer ${userDetails?.token}`
    }})
}

const getOptionalRoutes = () => {
    return axios.get(`${uri}/optionalpermissions`);
}

export {getUserPermissions, getOptionalRoutes}
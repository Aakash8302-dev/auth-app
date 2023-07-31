import {ReactNode,createContext, useState} from 'react'
import { getUser } from '../api/storage'
import { getUserPermissions } from '../api/route.api'

type UserData = {
    id: string,
    name: string,
    email: string,
    role:string,
    token: string
}

interface ContextProps {
    userData: UserData | null,
    userPermissions: null | Promise<string[]>,
    setUserData: (userData: UserData) => void,
    loadUserData: () => Promise<void>
}

export const UserContext = createContext<ContextProps>({
    userData: null,
    userPermissions: null,
    setUserData: () => null,
    loadUserData: async () => {},
})

type UserProviderProps = {
    children: ReactNode
}


let userDataExists = getUser();
let permissions = userDataExists ? getUserPermissions().then(res => {
    return res.data.routesAccessible
}) : null

const UserProvider = ({children}:UserProviderProps) => {
  
    const [userData, setUserData] = useState<UserData | null>(
        userDataExists ? { 
            id:userDataExists.user.id,
            name: userDataExists.user.name,
            email: userDataExists.user.email,
            role: userDataExists.user.role,
            token: userDataExists.token
        } : null
    );

    const [userPermissions, setUserPermissions] = useState<Promise<string[]> | null>(permissions ? permissions : null);


    const loadUserData = async () => {
        console.log('load')
    }

    const value = {
        userData,
        userPermissions,
        setUserData,
        loadUserData
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}


export default UserProvider
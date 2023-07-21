import { IUserDetails } from "../types"

const USER_DETAILS_KEY = "userDetails"

export function saveUser(user: IUserDetails){
    localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(user))
}

export function getUser():IUserDetails| undefined {
    const user = localStorage.getItem(USER_DETAILS_KEY);
    return user ? JSON.parse(user) : undefined
}

export function removeUser(): void {
    localStorage.removeItem(USER_DETAILS_KEY);
}
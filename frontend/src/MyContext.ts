import { createContext } from "react";

export type ThemeContextType = {
    name: string,
    age: number
}

export const MyContext = createContext("");

export const ThemeContext = createContext<ThemeContextType | null>(null)
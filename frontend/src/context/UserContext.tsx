import { createContext } from "react";

import useAuth from "../hooks/useAuth";

interface UserProviderTypes {
    children: React.ReactNode;
}

const Context = createContext<any>({});

function UserProvider({children}: UserProviderTypes){
    const { authenticated, register, logout, login }  = useAuth();
    return (
    <Context.Provider value={{authenticated, register, logout, login}}>
        {children}
    </Context.Provider>)
};

export { Context, UserProvider }
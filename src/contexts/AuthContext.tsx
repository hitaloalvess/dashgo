import { createContext, ReactNode, useState, useEffect } from "react";
import { setCookie } from 'nookies'

import { apiAuth } from "../services/apiAuth";
import Router  from "next/router";


type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData{
    signIn: (credentials : SignInCredentials ) => Promise<void>;
    user: User;
    isAuthenticated: boolean;
}

interface AuthProviderProps{
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider( { children } : AuthProviderProps){
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    // useEffect(() => {
    //     //AUTHCHANNEL
    // }, [])

    async function signIn({email, password}){
        try{
            console.log('Dentro do SignIn')
            const { data } = await apiAuth.post<any>('/sessions',{
                email, password
            })

            console.log('Dentro do SignIn --> Após request post')

            const { token, refreshToken, permissions, roles } = data

            //Armazenar token e refreshToken do usuário
            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: '/'
            })

            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: '/'
            })

            //Salvar dados do usuário em um estado
            setUser({
                email, 
                permissions,
                roles
            })

            //Atualiza o token passado no cabeçalho das requisições de apiAuth
            apiAuth.defaults.headers['Authtorization'] = `Bearer ${token}`

            Router.push('/dashboard');

        }catch(error){
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{user, isAuthenticated, signIn}}>
            {children}
        </AuthContext.Provider>
    )
}
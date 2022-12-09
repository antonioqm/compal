import jwtDecode from "jwt-decode";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { api, apiClient } from "../api/api";
import { currentUser } from "../state/atom";


export type User = {
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    status: boolean;
    roles: any[];
  };
  token: string;
};

type SignInCredentials = {
  password: string;
  email: string;
};
type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  user?: User;
  isAuthenticaton: boolean;
};

type AuthProvideProps = {
  children: ReactNode;
};

export function signOut() {
  destroyCookie(undefined, 'nextAuth.token')
  Router.push('/')
} 
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProvideProps) {
  const [user, setUser] = useState<User>();
  const [user_current, setCurrentUser] = useRecoilState<any>(currentUser)
  const isAuthenticaton = !!user;

  
  useEffect(() => {
    const { 'nextAuth.token': token } = parseCookies()
    if (token) {
      console.log('hasToken-------')
      apiClient.getCurrentUser()
        .then(({ data }) => {
          setCurrentUser(data)
          console.log('response--------user----user_current: ', user_current)
          const decoded = jwtDecode<any>(token)

          setUser(user)
        }).catch(() => {
          signOut()
      })
    }
  },[])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const userResponse = await apiClient.create<User>("account/login", {
        email,
        password,
      });
      const { token, user } = userResponse;

      setCookie(undefined, `nextAuth.user`, JSON.stringify(user), {
        maxAge: 60 * 60 * 24 * 30, //1 month
        path: '/'
      })
      setCookie(undefined, `nextAuth.token`, token, {
        maxAge: 60 * 60 * 24 * 30, //1 month
        path: '/'
      })
      setUser(userResponse)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push('/')
      
    } catch (error) {
      
    } 
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticaton, user }}>
      {children}
    </AuthContext.Provider>
  );
}

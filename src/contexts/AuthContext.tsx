import Router  from "next/router";
import { createContext, ReactNode, useState, useEffect } from "react";
import { apiClient, api } from "../api/api";
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import jwtDecode,  {JwtPayload } from "jwt-decode";


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
  const isAuthenticaton = !!user;
  
  useEffect(() => {
    const { 'nextAuth.token': token } = parseCookies()
    if (token) {

      apiClient.getCurrentUser()
        .then(response => {
          const decoded = jwtDecode<any>(token)
          console.log('decoded', decoded.name!)
          console.log('process.cwd()', process.cwd())
          console.log('process--->', process.browser)
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
      const { token } = userResponse;

      setCookie(undefined, `nextAuth.token`, token, {
        maxAge: 60 * 60 * 24 * 30, //1 month
        path: '/'
      })
      setUser(userResponse)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      Router.push('/')
      console.log('User-->', userResponse);
    } catch (error) {
      console.log(error);
    } 
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticaton, user }}>
      {children}
    </AuthContext.Provider>
  );
}

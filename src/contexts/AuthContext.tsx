import { createContext, ReactNode, useState } from "react";
import { apiClient } from "../api/api";
import { api } from "../services/api";


type UserTokenResponse =  {
  user: User;
  token: string;
}

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  roles: any[];
}

type SignInCredentials = {
  password: string;
  email: string;
};
type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticaton: boolean;
};

type AuthProvideProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProvideProps) {
  const isAuthenticaton = false;
  const [user, setUser] = useState<UserTokenResponse>()

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await  apiClient.create("account/login", {
        email,
        password
      });
      console.log(response);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticaton }}>
      {children}
    </AuthContext.Provider>
  );
}

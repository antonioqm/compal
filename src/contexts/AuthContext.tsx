import { createContext, ReactNode } from "react";
import { apiClient } from "../api/api";
import { api } from "../services/api";

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

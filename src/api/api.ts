import axios, { AxiosError } from 'axios';
import jwt_decode, { JwtPayload } from "jwt-decode";
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies';
import { signOut, User } from '../contexts/AuthContext';
import { AuthTokenError } from '../services/errors/AuthTokenError';

let isRefreshing = false;
let failRequestsQueue: any[] = []


export function setupApiClient(ctx:GetServerSidePropsContext | undefined = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'http://200.129.173.244:5001/v1/',
  });

  api.defaults.headers.common.Authorization = `Bearer ${cookies['nextAuth.token']}`

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {

        if (isExpiredToken()) {
          // renovar o token
          const originalConfig = error.config;

          if (!isRefreshing) {
            isRefreshing = true;
            apiClient.create<User>('account/login', {
              email: 'admin@admin.com',
              password: '123456'
            }).then((response: User) => {

              const { token } = response;

              

              setCookie(ctx, `nextAuth.token`, token, {
                maxAge: 60 * 60 * 24 * 30, //1 month
                path: '/'
              })
              
              api.defaults.headers.common['Authorization'] = `Bearer ${token}`

              failRequestsQueue.forEach(request => request.onSuccess(token))
              failRequestsQueue = [];
              if (process.browser) {
                signOut()
              }
            }).catch((error) => {
              failRequestsQueue.forEach(request => request.onFailure(error))
              failRequestsQueue = [];
              if (process.cwd())
                signOut()
            }).finally(() => {
              isRefreshing = false
            })
          }
          return new Promise((resolve, reject) => {
            failRequestsQueue.push({
              onSuccess: (token: string) => {
                
                originalConfig.headers!.Authorization = `Bearer ${token}`;
                resolve(api(originalConfig))
              },
              onFailure: (error: AxiosError) => {
                reject(error)
              }
            })
          });
        } else {
          // deslogar o usuário
          if (process.browser) {
            
            signOut()
          } else {
            return Promise.reject(new AuthTokenError())
          }
        }


      }
      return Promise.reject(error)
    });
  
    function isExpiredToken(): boolean {
      const { exp } = getDateExpirationToken(cookies['nextAuth.token'])
      return (Date.now() >= exp! * 1000)
    
    }
    function getDateExpirationToken(token: string): JwtPayload {
      const decodeToken: JwtPayload = jwt_decode(token)
      return decodeToken
    }
  
  return api;

}






// --------
export const api = setupApiClient()

export const apiClient = {
  listAll: async <Resource = any>(endpoint: string): Promise<Resource> => {
    const { data } = await api.get(endpoint)
    return data;
  },
  getCurrentUser: async (): Promise<any> => {
    const data = await api.get('account/currentuser')
    return data;
  },
  create: async <Resource = any>(endpoint: string, payload: Resource | {} = {}): Promise<Resource> => {
    return new Promise(async (resolve, reject) => {
      api.post(endpoint, payload)
        .then(({ data }) => resolve(data))
        .catch(error => reject(error))
    })
  },
  update: async <Resource = any>(endpoint: string, payload = {}): Promise<Resource> => {
    return new Promise(async (resolve, reject) => {
      api.put(endpoint, payload)
        .then(({ data }) => resolve(data))
        .catch(error => reject(error))
    })

  },
  delete: async <Resource = any>(endpoint: string): Promise<Resource> => {
    return new Promise(async (resolve, reject) => {
      api.delete(endpoint)
        .then(({ data }) => resolve(data))
        .catch(error => reject(error))
    })
  },
  get: async <Resource = any>(endpoint: string): Promise<Resource> => {
    const { data } = await api.get(`${endpoint}`)
    return data;
  }
}


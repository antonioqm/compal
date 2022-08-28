import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loadingState, ResponseState } from 'src/state/atom';

export const Axios = axios.create({
  baseURL: 'http://200.129.173.244:5001/v1/',
});


export const apiClient = {
  listAll: async (endpoint: string) => {
    const { data } = await Axios.get(endpoint)
    return data;
  },
  create: async (endpoint: string, payload = {}) => {
    const { data } = await Axios.post(endpoint, payload)
    return data;
  },
  update: async (endpoint: string, payload = {}) => {
    const { data } = await Axios.put(endpoint, payload)
    return data;

  },
  delete: async (endpoint: number) => {
    const { data } = await Axios.delete(`${endpoint}`)
    return data;
  }
}

// export function useApiCLient() {
//   const [loading, setLoading] = useRecoilState(loadingState)
//   const [responseError, setResponseError] = useRecoilState(ResponseState)

//   // Adiciona um interceptador na requisição
//   Axios.interceptors.request.use(function (config) {
//     // Faz alguma coisa antes da requisição ser enviada
//     setLoading(true)
//     return config;
//     setResponseError({
//       status: 200,
//       statusText: '',
//       data: '',
//       hasError: false,
//     })
//   }, function (error) {
//     // Faz alguma coisa com o erro da requisição
//     const { response } = error;
//     setResponseError({
//       hasError: true,
//       status: response.status as number,
//       statusText: response.statusText as string,
//       data: response.data as string,

//     })
//     return Promise.reject(error);
//   });

//   // Adiciona um interceptador na resposta
//   Axios.interceptors.response.use(function (response) {
//     // Qualquer código de status que dentro do limite de 2xx faz com que está função seja acionada
//     // Faz alguma coisa com os dados de resposta
//     setLoading(false)
//     setResponseError({
//       status: 200,
//       statusText: '',
//       data: '',
//       hasError: false,
//     })
//     return response;
//   }, function (error) {
//     // Qualquer código de status que não esteja no limite do código 2xx faz com que está função seja acionada
//     // Faz alguma coisa com o erro da resposta
//     const { response } = error;
//     setLoading(false)
//     setResponseError({
//       hasError: true,
//       status: response.status as number,
//       statusText: response.statusText as string,
//       data: response.data as string,

//     })
//     console.log(error.response.data)
//     return Promise.reject(error);
//   });

//   return { apiClient }
// }
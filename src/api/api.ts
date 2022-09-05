import axios from 'axios';
import { useRecoilState } from 'recoil';
import { loadingState, ResponseState } from '../state/atom';

export const Axios = axios.create({
  baseURL: 'http://200.129.173.244:5001/v1/',
});


export const apiClient = {
  listAll: async <Resource>(endpoint: string): Promise<Resource> => {
    const { data } = await Axios.get(endpoint)
    return data;
  },
  create: async <Resource>(endpoint: string, payload = {}):Promise<Resource>  => {
    const { data } = await Axios.post(endpoint, payload)
    return data;
  },
  update: async <Resource>(endpoint: string, payload = {}):Promise<Resource>  => {
    const { data } = await Axios.put(endpoint, payload)
    return data;

  },
  delete: async <Resource>(endpoint: string):Promise<Resource>  => {
    const { data } = await Axios.delete(`${endpoint}`)
    return data;
  }
}

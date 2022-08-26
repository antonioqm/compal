import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://200.129.173.244:5001/v1/',
  // headers: {
    // 'Content-Type': 'application/json; charset=utf-8',
    // 'Date': 'Wed, 24 Aug 2022 21:10:01 GMT',
    // 'Server': 'Kestrel',
    // 'Location': 'v1/level/create/8',
    // 'Transfer-Encoding': 'chunked',
  // },
});

export const apiClient =  {
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
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://200.129.173.244:5001/v1/'
})
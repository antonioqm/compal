import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://http://10.162.254.30:8089/v1/'
})
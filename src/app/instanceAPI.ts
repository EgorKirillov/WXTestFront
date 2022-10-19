import axios from 'axios'

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5432/'
    : 'https://herokuapp.com/'

export const instance = axios.create({
  baseURL,
})

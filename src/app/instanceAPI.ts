import axios from 'axios'

export const baseURL = 'https://wx-back.herokuapp.com/'
  // process.env.NODE_ENV === 'development'
  //   ? 'http://localhost:5000/'
  //   : 'https://wx-back.herokuapp.com/'

export const instance = axios.create({
  baseURL,
})

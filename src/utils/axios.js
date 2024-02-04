// lib
import axios from 'axios'
import Cookies from 'js-cookie'

import { api_url } from './constants'

export const axiosClient = axios.create({
  baseURL: api_url,
  headers: {
    'Content-Type': 'application/json',
  },
})

const getHeaders = (data, isDeleteMethod) => {
  let axiosConfig = {
    headers: {},
  }
  const userToken = Cookies.get('token')
  axiosConfig.headers['accept-language'] = 'en'
  axiosConfig.headers['Content-Type'] = 'application/json'
  axiosConfig.headers['ngrok-skip-browser-warning'] = '69420'

  if (data) {
    if (data.headers) {
      for (var key in data.headers) {
        if (data.headers.hasOwnProperty(key)) {
          axiosConfig.headers[key] = data.headers[key]
        }
      }
    }
    if (data.params) {
      axiosConfig.params = { ...data.params }
    }
    if (data.data && isDeleteMethod) {
      axiosConfig.data = { ...data.data }
    }
  }
  if (userToken) {
    axiosConfig.headers['authorization'] = `Bearer ${userToken}`
  } else {
    axiosConfig.headers['authorization'] = ``
  }

  return axiosConfig
}

export const get = async (path, config) => {
  return await axiosClient
    .get(`${path}`, getHeaders(config))
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('auth')
        Cookies.remove('token')
        window.location.pathname = '/login'
      }
      return error.response.data
    })
}

export const post = async (path, payload, config) => {
  return await axiosClient
    .post(`${path}`, payload, getHeaders(config))
    .then((response) => {
      if (response?.data?.data?.token) {
        Cookies.set('token', response?.data?.data?.token, {
          expires: 7,
          path: '/',
        })
        //localStorage.setItem("userDetails", JSON.stringify(response?.data?.data?.user));
      }
      return response.data
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('auth')
        Cookies.remove('token')
        window.location.pathname = '/login'
      }
      return error.response ? error.response.data : error.message
    })
}

export const put = async (path, payload, config) => {
  return await axiosClient
    .put(`${path}`, payload, getHeaders(config))
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('auth')
        Cookies.remove('token')
        window.location.pathname = '/login'
      }
      return error.response.data
    })
}

export const patch = async (path, payload, config) => {
  return await axiosClient
    .patch(`${path}`, payload, getHeaders(config))
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('auth')
        Cookies.remove('token')
        window.location.pathname = '/login'
      }
      return error.response.data
    })
}

export const deleteMethod = async (path, config) => {
  return await axiosClient
    .delete(`${path}`, getHeaders(config, true))
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('auth')
        Cookies.remove('token')
        window.location.pathname = '/login'
      }
      return error.response.data
    })
}

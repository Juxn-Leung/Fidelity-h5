import axios from 'axios'
import { logout } from '../helpers/oauth'
// import { qsStringify } from '@metaarchit/common-utils'

const axiosInstance = axios.create({
  timeout: 30000,
})

axiosInstance.defaults.baseURL = import.meta.env.VITE_APP_API_CONTEXT_PATH

// axiosInstance.defaults.paramsSerializer = function (params) {
//   return qsStringify(params)
// }

axiosInstance.interceptors.request.use((config) => {
  const authorization = localStorage.getItem('token') || ''
  if (authorization) {
    if (config.headers && config.url?.indexOf('/public') === -1) {
      config.headers['Authorization'] = authorization
    }
  }
  return config
})
axiosInstance.interceptors.response.use(
  (config) => {
    const authorization = config.headers['authorization']
    if (authorization && authorization !== localStorage.getItem('token')) localStorage.setItem('token', authorization)
    return config
  },
  (error) => {
    if (error?.response?.status === 401) {
      logout()
    }
    return Promise.reject(error)
  }
)
export default axiosInstance

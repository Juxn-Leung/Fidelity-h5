import axios from 'axios'
import { logout } from '../helpers/oauth'
// import { qsStringify } from '@metaarchit/common-utils'

const axiosFile = axios.create({
  // timeout: 180000,
  timeout: 600000,
})

axiosFile.defaults.baseURL = import.meta.env.VITE_APP_API_CONTEXT_PATH

// axiosFile.defaults.paramsSerializer = function (params) {
//   return qsStringify(params)
// }

axiosFile.interceptors.request.use((config) => {
  const authorization = localStorage.getItem('token') || ''
  if (authorization) {
    if (config.headers && config.url?.indexOf('/public') === -1) {
      config.headers['Authorization'] = authorization
    }
  }
  return config
})
axiosFile.interceptors.response.use(
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
export default axiosFile

import axiosInstance from './axiosInstance'
import { BaseAPI } from './BaseAPI'

export class LoginAPI extends BaseAPI {
  async login(credentials: { account: string; password: string }) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/login`,
      method: 'post',
      data: credentials,
    })
    return data
  }
}

export default new LoginAPI(
  '/api/user'
)
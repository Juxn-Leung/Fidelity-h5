import axiosInstance from './axiosInstance'
import { BaseAPI } from './BaseAPI'

export class LoginAPI extends BaseAPI {
  async getLinkInfo(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/getLinkInfo`,
      method: 'post',
      params,
    })
    return data
  }
}

export default new LoginAPI(
  '/api/wechat'
)
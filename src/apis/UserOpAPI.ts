import axiosInstance from './axiosInstance'
import { TempBaseEntityAPI } from './TempBaseEntityAPI'
import { ListResponse } from './types'

class UserOpAPI extends TempBaseEntityAPI {
  async find(
    bodyData: any,
    pageNo = 1,
    pageSize = 10,
    sort?: string
  ): Promise<ListResponse> {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/searchUsers`,
      method: 'post',
      data: {
        ...bodyData,
        pageNo,
        pageSize,
        sort,
      },
    })
    return data
  }

  async createUser(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/wxRegister`,
      method: 'post',
      data: params,
    })
    return data
  }

  async editUser(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/editUser`,
      method: 'post',
      data: params,
    })
    return data
  }

  async userStatusAudit(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/userStatusAudit`,
      method: 'post',
      data: params,
    })
    return data
  }
}

export default new UserOpAPI(
  '/api/userOp'
)

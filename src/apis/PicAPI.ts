import axiosInstance from './axiosInstance'
import { TempBaseEntityAPI } from './TempBaseEntityAPI'
import { ListResponse } from './types'

class PicAPI extends TempBaseEntityAPI {
  async find(
    bodyData: any,
    pageNo = 1,
    pageSize = 10,
    sort?: string
  ): Promise<ListResponse> {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/list`,
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

  async add(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/add`,
      method: 'post',
      data: params,
    })
    return data
  }

  async edit(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/edit`,
      method: 'post',
      data: params,
    })
    return data
  }

  async picStatusAudit(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/picStatusAudit`,
      method: 'post',
      data: params,
    })
    return data
  }
}

export default new PicAPI(
  '/api/pic'
)

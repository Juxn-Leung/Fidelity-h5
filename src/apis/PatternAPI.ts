import axiosInstance from './axiosInstance'
import { TempBaseEntityAPI } from './TempBaseEntityAPI'
import { ListResponse } from './types'

class PatternAPI extends TempBaseEntityAPI {
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

  async patternAudit(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/patternAudit`,
      method: 'post',
      data: params,
    })
    return data
  }

   async one(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/one`,
      method: 'post',
      data: params,
    })
    return data
  }
}

export default new PatternAPI(
  '/api/pattern'
)

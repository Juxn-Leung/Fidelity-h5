import axiosInstance from './axiosInstance'
import { TempBaseEntityAPI } from './TempBaseEntityAPI'
import { ListResponse } from './types'

class LogAPI extends TempBaseEntityAPI {
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
}

export default new LogAPI(
  '/api/log'
)

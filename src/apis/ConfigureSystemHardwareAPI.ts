import axiosInstance from './axiosInstance'
import { TempBaseEntityAPI } from './TempBaseEntityAPI'
import { ListResponse } from './types'

class ConfigureSystemHardwareAPI extends TempBaseEntityAPI {
  async find(
    bodyData: any,
    page = 0,
    size = 10,
    sort?: string
  ): Promise<ListResponse> {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/list`,
      method: 'get',
      params: {
        ...bodyData,
        page,
        size,
        sort,
      },
    })
    return data
  }

  async save(params: any) {
    const { data } = await axiosInstance.post(`${this.endpoint}/add`, params)
    return data
  }

  async getById(id: string) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/getDetailById`,
      method: 'get',
      params: {
        id,
      },
    })
    return data
  }

  async batchEnable(ids: string[]) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/enable`,
      method: 'post',
      params: {
        ids,
      },
    })
    return data
  }

  async batchDisable(ids: string[]) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/disable`,
      method: 'post',
      params: {
        ids,
      },
    })
    return data
  }

  async batchDelete(ids: string[]) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/batchDelete`,
      method: 'delete',
      data: ids,
    })
    return data
  }

  async listSelf() {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/listSelf`,
      method: 'get',
    })
    return data
  }
}

export default new ConfigureSystemHardwareAPI(
  '/admin/api/v1/configure-system-hardware'
)

import axiosInstance from './axiosInstance'
import { BaseAPI } from './BaseAPI'
import { ListResponse } from './types'

export class TempBaseEntityAPI extends BaseAPI {
  async findAll(bodyData: any): Promise<ListResponse> {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/find`,
      method: 'post',
      params: {
        unpaged: true,
      },
      data: bodyData,
    })
    return data
  }

  async find(
    bodyData: any,
    page = 0,
    size = 10,
    sort?: string
  ): Promise<ListResponse> {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/find`,
      method: 'post',
      params: {
        page,
        size,
        sort,
      },
      data: bodyData,
    })
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

  async create(params: any) {
    const { data } = await axiosInstance.post(`${this.endpoint}/add`, params)
    return data
  }

  async update(id: string, params: any) {
    const { data } = await axiosInstance.put(`${this.endpoint}/update`, {
      ...params,
      id,
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
}

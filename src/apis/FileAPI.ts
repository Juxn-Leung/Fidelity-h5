import axiosInstance from './axiosInstance'
import { TempBaseEntityAPI } from './TempBaseEntityAPI'

class FileAPI extends TempBaseEntityAPI {
  async upload(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/upload`,
      method: 'post',
      data: params,
    })
    return data
  }

  async show(id: string) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/V1/${id}`,
      method: 'get',
    })
    return data
  }

  async showBase64(id: string) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/files/${id}`,
      method: 'get',
    })
    return data
  }
}

export default new FileAPI(
  '/api/file'
)

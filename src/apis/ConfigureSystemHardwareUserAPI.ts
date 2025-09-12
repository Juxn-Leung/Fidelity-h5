import axiosInstance from './axiosInstance'
import { TempBaseEntityAPI } from './TempBaseEntityAPI'

class ConfigureSystemHardwareUserAPI extends TempBaseEntityAPI {
  async find(params: any) {
    const { data } = await axiosInstance({
      url: `${this.endpoint}/list`,
      method: 'get',
      params,
    })
    return data
  }

  async save(params: any) {
    const { data } = await axiosInstance.post(`${this.endpoint}/add`, params)
    return data
  }
}

export default new ConfigureSystemHardwareUserAPI(
  '/admin/api/v1/configure-system-hardware-user'
)

import { createGetOptionTextFn } from '@/utils'

export enum StatusCode {
  one = '成功',
  two = '失败',
}

export const useStatusCodeHelpers = () => {
  const statusCodeEnumOptions = [
    { value: StatusCode.one, label: '成功' },
    { value: StatusCode.two, label: '失败' },
  ]
  const getStatusCodeText = createGetOptionTextFn(statusCodeEnumOptions)
  return { statusCodeEnumOptions, getStatusCodeText }
}

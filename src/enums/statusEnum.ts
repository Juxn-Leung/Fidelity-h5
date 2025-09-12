import { createGetOptionTextFn } from '@/utils'

export enum Status {
  one = 1,
  two = 2,
}

export const useStatusHelpers = () => {
  const statusEnumOptions = [
    { value: Status.one, label: '生效' },
    { value: Status.two, label: '失效' },
  ]
  const getStatusText = createGetOptionTextFn(statusEnumOptions)
  return { statusEnumOptions, getStatusText }
}

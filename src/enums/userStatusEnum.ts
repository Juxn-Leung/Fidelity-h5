import { createGetOptionTextFn } from '@/utils'

export enum UserStatus {
  zero = 0,
  one = 1,
  two = 2,
}

export const useUserStatusHelpers = () => {
  const userStatusEnumOptions = [
    { value: UserStatus.zero, label: '待审核' },
    { value: UserStatus.one, label: '生效' },
    { value: UserStatus.two, label: '失效' },
  ]
  const getUserStatusText = createGetOptionTextFn(userStatusEnumOptions)
  return { userStatusEnumOptions, getUserStatusText }
}

import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { Permission } from '@/enums/permissionEnum'
type UserProfile = any
export const AuthContext = createContext<{
  user: UserProfile
  setUser: SetStateAction<UserProfile>
  permissions: string[]
  logout: () => void
  hasRequiredAuthorities: (requiredAuthorities?: RequiredAuthorities) => boolean
} | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const permissions = useMemo(() => {
    const values = user?.roles
      ?.map((rolesEle: any) => {
        return rolesEle?.permissions?.map((permissionsEle: any) => {
          return permissionsEle?.alias
        })
      })
      ?.flat()
    return values
  }, [user])
  const hasRequiredAuthorities = useCallback(
    (requiredAuthorities?: RequiredAuthorities) => {
      return checkRequiredAuthorities(permissions, requiredAuthorities)
    },
    [permissions]
  )
  const logout = () => {
    setUser(null)
  }
  return (
    <AuthContext.Provider
      value={{ user, setUser, logout, hasRequiredAuthorities, permissions }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)!
}

export const RequiresAuth = ({
  children,
}: PropsWithChildren<{}>) => {
  return children
}

export type RequiredAuthorities = (Permission[] | Permission)[]
export const checkRequiredAuthorities = (
  ownedAuthorities: string[],
  requiredAuthorities?: RequiredAuthorities
) => {
  if (!requiredAuthorities || requiredAuthorities.length === 0) return true
  if (!ownedAuthorities || ownedAuthorities.length === 0) return false
  return requiredAuthorities?.some((authority) => {
    const authorities = typeof authority === 'string' ? [authority] : authority
    return authorities.every((authority) =>
      ownedAuthorities?.includes(authority)
    )
  })
}

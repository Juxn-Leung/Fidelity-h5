import React, { createContext, useContext, ReactNode } from 'react'
import { useRequest } from 'ahooks'
import { Button, Result, Spin } from 'antd'
import { useParams } from 'react-router'
import { useAuth } from '@/contexts/AuthContext'

interface DetailContextProps<TData = any> {
  data: TData
  refresh: () => void
  refreshAsync: () => void
}
const DetailContext = createContext<DetailContextProps | undefined>(undefined)

export const useDetail = () => {
  const context = useContext(DetailContext)!
  return context
}

export const DetailProvider: React.FC<{
  children: ReactNode
  fetchDetail: () => Promise<any>
}> = ({ children, fetchDetail }) => {
  const { data, loading, error, refresh, refreshAsync } =
    useRequest(fetchDetail)
  const auth = useAuth()
  localStorage.setItem('auth', JSON.stringify(auth?.user))
  const handleLogOut = async () => {
    localStorage.clear()
  }
  if (loading && !data) {
    return <Spin fullscreen></Spin>
  }
  if (error) {
    return (
      <Result
        title="訪問異常"
        extra={
          <Button type="primary" onClick={handleLogOut}>
            登出系統
          </Button>
        }
      ></Result>
    )
  }
  return (
    <DetailContext.Provider value={{ data, refresh, refreshAsync }}>
      {loading && data && <Spin fullscreen></Spin>}
      {children}
    </DetailContext.Provider>
  )
}

export const withDetailProvider = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fetchDetail: (id?: string) => Promise<any>,
  idKey = 'id'
) => {
  return (props: P) => {
    const { [idKey]: id } = useParams()
    return (
      <DetailProvider fetchDetail={() => fetchDetail(id)}>
        <WrappedComponent {...props}></WrappedComponent>
      </DetailProvider>
    )
  }
}

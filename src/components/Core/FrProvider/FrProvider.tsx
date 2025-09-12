import React, { createContext } from 'react'
export const FrContext = createContext('vertical' as 'horizontal' | 'vertical')

interface FrProviderProps {
  formItemType?: 'horizontal' | 'vertical'
  children?: React.ReactNode
}

const FrProvider: React.FC<FrProviderProps> = (props) => {
  const { children, formItemType = 'vertical' } = props

  return (
    <FrContext.Provider value={formItemType}>{children}</FrContext.Provider>
  )
}
export default FrProvider

import React, { createContext, PropsWithChildren, useState } from 'react'
import { Spin } from 'antd'
export const SpinContext = createContext<{
  isSpinning: boolean
  toggleSpin: (spinning: boolean) => void
} | null>(null)

interface SpinProps {}
const SpinProvider: React.FC<PropsWithChildren<SpinProps>> = (props) => {
  const { children } = props

  const [isSpinning, setIsSpinning] = useState(false)

  const toggleSpin = (spinning: boolean) => {
    setIsSpinning(spinning)
  }

  return (
    <SpinContext.Provider value={{ isSpinning, toggleSpin }}>
      {children}
      <Spin fullscreen spinning={isSpinning} />
    </SpinContext.Provider>
  )
}
export default SpinProvider

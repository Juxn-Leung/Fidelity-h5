import { useContext } from 'react'
import { SpinContext } from './SpinContent'

const useSpin = () => {
  const { isSpinning, toggleSpin } = useContext(SpinContext)!
  return { isSpinning, toggleSpin }
}

export default useSpin

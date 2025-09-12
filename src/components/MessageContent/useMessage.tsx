import { useContext } from 'react'
import { MessageContext } from './MessageContent'

const useMessage = () => {
  const { msg } = useContext(MessageContext)!
  return { msg }
}

export default useMessage

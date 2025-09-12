import React, { createContext, PropsWithChildren } from 'react'
import { message } from 'antd'
import { AxiosError } from 'axios'
import locales from '@/locales/zh-Hant.json'
import type { MessageInstance as AntdMessageInstance } from 'antd/lib/message/interface'

interface MessageInstance extends AntdMessageInstance {
  $error: (error: unknown) => void
}
export const MessageContext = createContext<{ msg: MessageInstance } | null>(
  null
)

interface MessageProps {}
interface Locales {
  ERROR_CODE_MESSAGE: {
    [key: string]: string
  }
}

const MessageProvider: React.FC<PropsWithChildren<MessageProps>> = (props) => {
  const { children } = props
  const [messageApi, contextHolder] = message.useMessage()
  return (
    <MessageContext.Provider
      value={{
        msg: {
          ...messageApi,
          $error: (error: unknown) => {
            let msg = 'unknown error'
            if (error instanceof AxiosError) {
              const code = error?.response?.data?.code
              if (code) {
                msg =
                  (locales as Locales)['ERROR_CODE_MESSAGE']?.[code] ||
                  error?.response?.data?.message
              } else {
                msg = error?.message
              }
            } else if (error instanceof Error) {
              msg = error?.message
            } else if (typeof error === 'string') {
              msg = error
            }
            messageApi.error(msg)
          },
        },
      }}
    >
      {children}
      {contextHolder}
    </MessageContext.Provider>
  )
}
export default MessageProvider

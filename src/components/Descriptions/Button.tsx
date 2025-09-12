import { Button as AntdButton } from 'antd'
import { ButtonProps } from 'antd/lib'
import { PropsWithChildren } from 'react'

function Button(props: PropsWithChildren<Omit<ButtonProps, 'type'>>) {
  return <AntdButton className="p-0 h-auto" type="link" {...props}></AntdButton>
}
export default Button

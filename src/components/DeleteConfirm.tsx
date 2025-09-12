import { Modal } from 'antd'
import React, { forwardRef, PropsWithChildren } from 'react'

function DeleteConfirm(
  props: PropsWithChildren<{
    multipleRecord?: boolean
    title?: React.ReactNode
    onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void
    onCancel?: (e?: React.MouseEvent<HTMLElement>) => void
  }>
) {
  const { children, multipleRecord = true } = props
  const [modal, contextHolder] = Modal.useModal()
  return (
    <>
      <TriggerWrapper
        onClick={() => {
          modal.warning({
            title: '提示',
            content:
              props.title ||
              (multipleRecord === false
                ? '確認刪除該數據？'
                : '確認刪除已選中數據？'),
            closable: true,
            okText: '確定',
            onOk: props.onConfirm,
            onCancel: props.onCancel,
          })
        }}
      >
        {children}
      </TriggerWrapper>
      {contextHolder}
    </>
  )
}

const TriggerWrapper = forwardRef<HTMLElement, PropsWithChildren<any>>(
  ({ children, ...rest }, ref) => {
    return React.cloneElement(children, { ref, ...rest })
  }
)

export default DeleteConfirm

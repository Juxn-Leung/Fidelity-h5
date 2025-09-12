import React from 'react'
import './AppBar.scss'
import { Modal, Tooltip } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useAuth } from '@/contexts/AuthContext'
import useMessage from '@/components/MessageContent/useMessage'
import { logout } from '@/helpers/oauth'

const AppBar: React.FC = () => {
  const auth = useAuth()
  localStorage.setItem('auth', JSON.stringify(auth?.user))
  const { msg } = useMessage()

  const handleLogOut = () => {
    Modal.warning({
      title: '提示',
      content: '確定要登出嗎？',
      okText: '確定',
      closable: true,
      async onOk() {
        // 退出逻辑
        logout()
      },
      onCancel() {
        msg.info('操作已取消')
      },
    })
  }

  return (
    <div className="app-bar flex justify-between">
      <p className="title">
        后台管理系統
      </p>
      <div className="flex items-center">
        <Tooltip placement="bottom" title="退出">
          <LogoutOutlined className="cursor-pointer" onClick={handleLogOut} />
        </Tooltip>
      </div>
    </div>
  )
}

export default AppBar

import { Layout } from 'antd'

import { PropsWithChildren, ReactNode, useEffect, useState } from 'react'
const HEADER_HEIGHT = 60
const { Header, Sider, Content } = Layout
const AppLayout = ({
  siderContent,
  headerContent,
  children,
  collapsible = false,
}: PropsWithChildren<{
  siderContent: ReactNode
  headerContent: ReactNode
  collapsible?: boolean
}>) => {
  const [collapsed, setCollapsed] = useState(false)
  useEffect(() => {
    const collapsed = localStorage.getItem('collapsed')
    if (collapsed === '1') {
      setCollapsed(true)
    }
  }, [])
  return (
    <Layout style={{ overflow: 'auto' }}>
      <Header
        style={{
          padding: 0,
          height: HEADER_HEIGHT,
          position: 'fixed',
          top: 0,
          zIndex: 10,
          width: '100%',
        }}
      >
        {headerContent}
      </Header>
      <Header
        style={{ height: HEADER_HEIGHT, backgroundColor: 'transparent' }}
      ></Header>
      <Layout style={{ background: 'transparent' }}>
        <Sider collapsible={collapsible} collapsed={collapsed}></Sider>
        <Sider
          collapsible={collapsible}
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value)
            localStorage.setItem('collapsed', value ? '1' : '0')
          }}
          style={{
            position: 'fixed',
            left: 0,
            top: 60,
            bottom: collapsible ? 48 : 0,
            overflow: 'auto',
            zIndex: 10,
          }}
        >
          {siderContent}
        </Sider>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AppLayout

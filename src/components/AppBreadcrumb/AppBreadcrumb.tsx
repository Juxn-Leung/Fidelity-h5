import React from 'react'
import { Breadcrumb } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import './AppBreadcrumb.scss'

interface BreadcrumbItem {
  title: string
  path?: string
}
interface BreadcrumbProps {
  breadcrumbList: BreadcrumbItem[]
  children?: React.ReactNode
}

const AppBreadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const { breadcrumbList, children } = props
  return (
    <div className="app-breadcrumb p-4">
      <Breadcrumb
        separator={
          <RightOutlined
          //
          />
        }
        items={breadcrumbList.map(item => ({
          title: item.title,
          href: item.path,
        }))}
        //
      />
      <div className="button__content">{children}</div>
    </div>
  )
}

export default AppBreadcrumb

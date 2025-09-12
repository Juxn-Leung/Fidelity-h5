import React, { useMemo } from 'react'
import { HomeOutlined, TeamOutlined, PictureOutlined, CodeOutlined, FundOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useLocation, Link } from 'react-router-dom'
import './Navigation.scss'
import {
  MenuItemGroupType,
  ItemType,
  MenuItemType,
  SubMenuType,
} from 'antd/lib/menu/interface'
import { useAuth, RequiredAuthorities } from '@/contexts/AuthContext'
import omit from 'lodash/omit'
import { Permission } from '@/enums//permissionEnum'

type MenuItem = Required<MenuProps>['items'][number]
interface ExtendedMenuItemType extends MenuItemType {
  requiredAuthorities?: RequiredAuthorities
}
type ExtendedItemType<T extends ExtendedMenuItemType = ExtendedMenuItemType> =
  ItemType<T> & {
    requiredAuthorities?: RequiredAuthorities
  }


const items: ExtendedItemType[] = [
  {
    key: '/home',
    label: <Link to={'/home'}>首頁</Link>,
    icon: <HomeOutlined />,
  },
  {
    key: '/user',
    label: <Link to={'/user'}>用户管理</Link>,
    icon: <TeamOutlined />,
  },
  {
    key: '/background',
    label: <Link to={'/background'}>背景图管理</Link>,
    icon: <PictureOutlined />,
  },
  // {
  //   key: '/music',
  //   label: <Link to={'/music'}>音乐管理</Link>,
  //   icon: <PlayCircleOutlined />,
  // },
  {
    key: '/style',
    label: <Link to={'/style'}>款式管理</Link>,
    icon: <CodeOutlined />,
  },
  {
    key: '/log',
    label: <Link to={'/log'}>日志管理</Link>,
    icon: <FundOutlined />,
  },
]

const Navigation: React.FC = () => {
  const location = useLocation()
  const { user, hasRequiredAuthorities } = useAuth()

  const filteredItems = useMemo(() => {
    const filteredItems: MenuItem[] = []
    for (const item of items) {
      const { children, requiredAuthorities, ...other } =
        item as MenuItemGroupType & {
          requiredAuthorities?: Permission[]
        }
      if (!hasRequiredAuthorities(requiredAuthorities)) {
        continue
      }
      let filteredChildren: any[] | undefined
      if (!(!children || children.length === 0)) {
        filteredChildren = (
          children as (SubMenuType & { requiredAuthorities?: Permission[] })[]
        )
          .filter((ele) => hasRequiredAuthorities(ele.requiredAuthorities))
          .map((ele) => omit(ele, ['requiredAuthorities']))
        if (filteredChildren.length === 0) {
          continue
        }
      }
      filteredItems.push({
        ...other,
        children: filteredChildren ? filteredChildren : undefined,
      })
    }
    return filteredItems
  }, [user])

  const defaultSelectedKeys = useMemo(() => {
    const node = findMenuItem(filteredItems, (node) =>
      location.pathname.startsWith(node.key)
    )
    // console.log('node', node);
    if (node) return [node.key]
    return [location.pathname]
  }, [location.pathname])

  const defaultOpenKeys = useMemo(() => {
    // console.log('defaultSelectedKeys', defaultSelectedKeys);
    for (const item of items as MenuItemGroupType[]) {
      if (
        item.key &&
        item.children?.find(
          (ele) => !!ele && defaultSelectedKeys.includes(ele.key)
        )
      ) {
        return [item.key as string]
      }

      if (item.children?.length) {
        for (const childrenItem of item.children as MenuItemGroupType[]) {
          if (
            childrenItem.key &&
            childrenItem.children?.find(
              (ele) => !!ele && defaultSelectedKeys.includes(ele.key)
            )
          ) {
            return [item.key as string, childrenItem.key as string]
          }
        }
      }
    }
    return []
  }, [defaultSelectedKeys])
  return (
    <Menu
      items={filteredItems}
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      mode="inline"
      theme="dark"
    />
  )
}

function findMenuItem(
  children: any[],
  compare: (ele: any) => boolean
): any | null {
  if (children && children.length > 0) {
    for (const child of children) {
      const res = findMenuItem(child.children, compare)
      if (res) {
        return res
      }
      if (compare(child)) {
        return child
      }
    }
  }
  return null
}

export default Navigation

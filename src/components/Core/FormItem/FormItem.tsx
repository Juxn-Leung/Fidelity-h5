import React, { useContext, useMemo } from 'react'
import './FormItem.scss'
import { Col, Form } from 'antd'
import { FrContext } from '../FrProvider/FrProvider'
import { validateInfo } from '@/utils/form'
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import cn from 'classnames'
interface TableFilterProps {
  prop: any
  colProps: any
  content?: string | number
  icon?: any
  colStyle?: any
  children?: React.ReactNode
  handleClick?: () => void
}

const FormItem: React.FC<TableFilterProps> = (props) => {
  const {
    prop,
    colProps = { xs: 24, sm: 24, md: 12 },
    content = '',
    icon,
    colStyle,
    children,
    handleClick,
  } = props

  const contextValue = useContext(FrContext)

  const rules = useMemo(() => {
    const list = []
    if (prop?.formProps && prop.formProps?.rules) {
      list.push(...prop.formProps.rules)
    }
    if (prop?.required) {
      list.push(...validateInfo.required)
    }
    return list
  }, [prop])

  const onClick = () => {
    handleClick && handleClick()
  }

  return (
    <Col {...colProps} style={colStyle}>
      <Form.Item
        label={prop.label}
        name={prop.name}
        rules={rules}
        labelCol={{ span: contextValue === 'vertical' ? 24 : 8 }}
        wrapperCol={{ span: contextValue === 'vertical' ? 24 : 16 }}
      >
        {contextValue === 'vertical' ? (
          children
        ) : icon === 'edit' ? (
          <div className="text-right">
            {content || '-'}
            <EditOutlined className="ml-2" onClick={onClick} />
          </div>
        ) : icon === 'search' ? (
          <div className="text-right">
            {content || '-'}
            <FileSearchOutlined className="ml-2" onClick={onClick} />
          </div>
        ) : icon === 'show' ? (
          <a
            className={cn('text-right block', {
              'text-show': content,
              'text-right': !content,
            })}
            onClick={onClick}
          >
            {content || '-'}
          </a>
        ) : (
          <div className="text-right">{content || '-'}</div>
        )}
      </Form.Item>
    </Col>
  )
}

export default FormItem

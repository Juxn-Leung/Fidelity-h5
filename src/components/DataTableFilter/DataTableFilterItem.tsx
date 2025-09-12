import React, { PropsWithChildren } from 'react'
import { Col, ColProps, Form } from 'antd'
import type { NamePath } from 'antd/lib/form/interface'

interface DataTableFilterItemProps {
  label: React.ReactNode
  name: NamePath
  colProps?: ColProps
}

const DataTableFilterItem: React.FC<
  PropsWithChildren<DataTableFilterItemProps>
> = (props) => {
  const { children, label, name, colProps } = props
  return (
    <Col
      sm={12}
      md={12}
      lg={8}
      xl={6}
      {...colProps}
      className="table-filter-item"
    >
      <Form.Item className="mb-2" label={
        <span className="whitespace-pre-line">{label}</span>
      } name={name}>
        {children}
      </Form.Item>
    </Col>
  )
}

export default DataTableFilterItem

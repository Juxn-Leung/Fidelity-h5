import './DataTableFilter.scss'
import React, { PropsWithChildren, useState } from 'react'
import { Button, Col, Form, FormInstance, Row } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface DataTableFilterProps {
  form: FormInstance
  onReset?: () => void
  onSubmit?: () => void
  initialValues?: any
  isShowFold?: boolean
  handleShowFilterChange?: (showFilterDetail: boolean) => void
}

const DataTableFilter: React.FC<PropsWithChildren<DataTableFilterProps>> = (
  props
) => {
  const {
    children,
    onReset,
    onSubmit,
    form,
    initialValues,
    isShowFold,
    handleShowFilterChange,
  } = props
  const [showFilterDetail, setShowFilterDetail] = useState<boolean>(false)

  const onChange = () => {
    setShowFilterDetail(!showFilterDetail)
    if (handleShowFilterChange) {
      handleShowFilterChange(!showFilterDetail)
    }
  }

  return (
    <Form form={form} initialValues={initialValues} labelAlign="left" className="mb-2" onFinish={onSubmit}>
      <Row gutter={[16, 8]}>
        {children}
        <Col
          className="flex grow max-w-full justify-end"
          sm={12}
          md={12}
          lg={8}
          xl={6}
        >
          <Button className="mr-2" type="default" onClick={onReset}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            查詢
          </Button>

          {isShowFold && (
            <Button
              className="flex items-center"
              type="text"
              onClick={onChange}
              style={{ marginLeft: 7 }}
            >
              {showFilterDetail ? '收起' : '展開'}
              {showFilterDetail ? <UpOutlined /> : <DownOutlined />}
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  )
}

export default DataTableFilter

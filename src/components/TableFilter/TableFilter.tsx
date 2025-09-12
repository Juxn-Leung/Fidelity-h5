import React from 'react'
import './TableFilter.scss'
import { Button, Col, Row } from 'antd'
import { DownOutlined, UpOutlined } from '@ant-design/icons'

interface TableFilterProps {
  children?: React.ReactNode
  isShowFold?: boolean
  handleShowFilterChange?: (showFilterDetail: boolean) => void
  handleReset?: () => void
  handleInQuire?: () => void
}

const TableFilter: React.FC<TableFilterProps> = (props) => {
  const {
    children,
    isShowFold = true,
    handleShowFilterChange,
    handleReset,
    handleInQuire,
  } = props

  const [showFilterDetail, setShowFilterDetail] = React.useState<boolean>(false)

  const onFlageChange = () => {
    setShowFilterDetail(!showFilterDetail)
    handleShowFilterChange && handleShowFilterChange(!showFilterDetail)
  }

  const onReset = () => {
    handleReset && handleReset()
  }

  const inQuire = () => {
    handleInQuire && handleInQuire()
  }

  return (
    <div className="table-filter flex justify-between w-full mb-2">
      <Row className="w-full" gutter={16}>
        {children}
        <Col
          className="button-item grow max-w-full"
          sm={12}
          md={12}
          lg={8}
          xl={6}
        >
          <Button type="default" onClick={onReset}>
            重置
          </Button>
          <Button type="primary" onClick={inQuire}>
            查詢
          </Button>
          {isShowFold && (
            <Button
              className="flex items-center"
              type="text"
              onClick={onFlageChange}
            >
              {showFilterDetail ? '收起' : '展開'}
              {showFilterDetail ? <UpOutlined /> : <DownOutlined />}
            </Button>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default TableFilter

import React from 'react'
import './FormFilterItem.scss'
import { Col } from 'antd'

interface FormFilterItemProps {
  children?: React.ReactNode
  label: string
  labelRequired?: boolean
}

const FormFilterItem: React.FC<FormFilterItemProps> = (props) => {
  const { children, label, labelRequired } = props
  return (
    <Col sm={12} md={12} lg={8} xl={6} className="flex items-center mb-2">
      <div className="form-filter-label">
        {labelRequired && <span className="text-red">*</span>}
        <span>{label}</span>
        <span>:</span>
      </div>
      {children}
    </Col>
  )
}

export default FormFilterItem

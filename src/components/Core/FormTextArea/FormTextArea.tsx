import React, { useEffect, useState } from 'react'
import FormItem from '../FormItem/FormItem'
import TextArea from 'antd/es/input/TextArea'

interface FormInputProps {
  value: string
  prop: any
  colProps?: any
  handleInput?: (val: string) => void
}

const FormTextArea: React.FC<FormInputProps> = (props) => {
  const { value, prop, colProps } = props

  const [inputValue, setInputValue] = useState<string>('')

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <FormItem prop={prop} colProps={colProps} content={inputValue}>
      <TextArea
        value={inputValue}
        placeholder="請輸入"
        allowClear
        showCount
        maxLength={500}
        autoSize={{
          minRows: 2,
        }}
      />
    </FormItem>
  )
}

export default FormTextArea

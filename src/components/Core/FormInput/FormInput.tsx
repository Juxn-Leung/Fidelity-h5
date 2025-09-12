import React, { useEffect, useState } from 'react'
import FormItem from '../FormItem/FormItem'
import { Input } from 'antd'

interface FormInputProps {
  value: string | number
  prop: any
  colProps?: any
  colStyle?: any
  icon?: any
  handleInput?: (value: string) => void
  handleClick?: (e?: any) => void
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { value, prop, colProps, colStyle, icon, handleInput, handleClick } =
    props

  const [inputValue, setInputValue] = useState<string | number>('')

  const onClick = () => {
    handleClick && handleClick(inputValue)
  }

  const onChange = (e: any) => {
    setInputValue(e.target.value)
    handleInput && handleInput(e.target.value)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <FormItem
      prop={prop}
      colProps={colProps}
      colStyle={colStyle}
      content={inputValue}
      icon={icon}
      handleClick={onClick}
    >
      <Input placeholder="請輸入" {...prop.inputProps} onChange={onChange} />
    </FormItem>
  )
}

export default FormInput

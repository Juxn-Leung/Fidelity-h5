import React, { useEffect, useState } from 'react'
import FormItem from '../FormItem/FormItem'
import { Input } from 'antd'
// import type { SearchProps } from 'antd/es/input/Search';

const { Search } = Input

interface FormInputProps {
  value: string | number
  prop: any
  colProps?: any
  handleSearch?: (value: string) => void
}

const FormInput: React.FC<FormInputProps> = (props) => {
  const { value, prop, colProps, handleSearch } = props

  const [inputValue, setInputValue] = useState<string | number>('')

  const onSearch = (value: string) => {
    console.log('onSearch', value)
    handleSearch && handleSearch(value)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <FormItem prop={prop} colProps={colProps} content={inputValue}>
      <Search {...prop.inputProps} placeholder="請輸入" onSearch={onSearch} />
    </FormItem>
  )
}

export default FormInput

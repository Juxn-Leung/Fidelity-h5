import React, { useEffect, useState } from 'react'
import FormItem from '../FormItem/FormItem'
import { Select } from 'antd'

interface FormSelectProps {
  defaultValue?: any
  value?: any
  prop: any
  colProps?: any
  icon?: any
  dropdownRender?: (menu: any) => React.ReactNode
  handleSelect?: (val: string) => void
  handleSearch?: (val: string) => void
  handleClick?: () => void
}

const FormSelect: React.FC<FormSelectProps> = (props) => {
  const {
    defaultValue,
    value,
    prop,
    icon,
    colProps,
    dropdownRender,
    handleSelect,
    handleSearch,
    handleClick,
  } = props

  const [content, setContent] = useState<string>('')

  const onSelect = (e: any) => {
    handleSelect && handleSelect(e)
  }

  const onSearch = (e: any) => {
    handleSearch && handleSearch(e)
  }

  const onClick = () => {
    handleClick && handleClick()
  }

  useEffect(() => {
    if (defaultValue) {
      setContent(defaultValue)
    } else {
      if (prop?.list?.list && prop?.list?.list.length) {
        if (prop?.selectProps && prop?.selectProps?.mode === 'multiple') {
          const items = prop.list.list.filter((item: any) =>
            value?.includes(item[prop.list.value || 'value'])
          )
          setContent(
            items
              .map((item: any) => item[prop?.list?.label || 'label'])
              .join(', ')
          )
        } else {
          const item = prop.list.list.find(
            (item: any) => item[prop.list.value || 'value'] === value
          )
          if (item) setContent(item[prop?.list?.label || 'label'])
        }
      }
    }
  }, [value])

  return (
    <FormItem
      prop={prop}
      colProps={colProps}
      content={content}
      icon={icon}
      handleClick={onClick}
    >
      <Select
        className="w-full"
        options={prop.list.list}
        fieldNames={{
          label: prop.list.label || 'label',
          value: prop.list.value || 'value',
        }}
        placeholder="請選擇"
        allowClear
        dropdownRender={dropdownRender}
        onChange={onSelect}
        onSearch={prop?.selectProps?.showSearch && onSearch}
        {...prop?.selectProps}
      />
    </FormItem>
  )
}

export default FormSelect

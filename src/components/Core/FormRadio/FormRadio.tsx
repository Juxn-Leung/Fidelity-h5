import React, { useEffect, useState } from 'react'
import FormItem from '../FormItem/FormItem'
import { Radio } from 'antd'

interface FormRadioProps {
  value: string | number | boolean
  prop: any
  colProps?: any
  // handleSelect?: (val: string | boolean) => void
  handleSelect?: (val: any) => void
}

const FormRadio: React.FC<FormRadioProps> = (props) => {
  const { value, prop, colProps, handleSelect } = props

  const [selectValue, setSelectValue] = useState<string | number | boolean>('')
  const [content, setContent] = useState<string>('')

  const onSelect = (e: any) => {
    setSelectValue(e)
    handleSelect && handleSelect(e.target.value)
  }

  useEffect(() => {
    setSelectValue(value)
    if (prop?.list?.list && prop?.list?.list.length) {
      const item = prop.list.list.find(
        (item: any) => item[prop.list.value || 'value'] === value
      )
      if (item) setContent(item[prop.list.label || 'label'])
    }
    // console.log(selectValue)
  }, [value])

  return (
    <FormItem prop={prop} colProps={colProps} content={content}>
      <Radio.Group
        {...prop?.radioProps}
        value={selectValue}
        onChange={onSelect}
      >
        {prop.list.list.map((item: any) => (
          <Radio
            key={item[prop.list.value || 'value']}
            value={item[prop.list.value || 'value']}
          >
            {item[prop.list.label || 'label']}
          </Radio>
        ))}
      </Radio.Group>
    </FormItem>
  )
}

export default FormRadio

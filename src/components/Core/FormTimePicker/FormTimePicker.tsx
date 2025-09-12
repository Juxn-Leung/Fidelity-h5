import React, { useEffect, useState } from 'react'
import FormItem from '../FormItem/FormItem'
import { TimePicker } from 'antd'
import dayjs from 'dayjs'

interface FormDatePickerProps {
  value: dayjs.ConfigType
  prop: any
  colProps?: any
  format?: string
  handlePicker?: (val: any) => void
}

const FormDatePicker: React.FC<FormDatePickerProps> = (props) => {
  const { value, prop, colProps, format = 'HH:mm', handlePicker } = props

  const [pickerValue, setPickerValue] = useState<string>('')

  const onChange = (e: any) => {
    setPickerValue(dayjs(e).format(format))
    handlePicker && handlePicker(dayjs(e).format(format))
  }

  useEffect(() => {
    setPickerValue(dayjs(value).format(format))
  }, [value])

  return (
    <FormItem prop={prop} colProps={colProps} content={pickerValue}>
      <TimePicker
        className="w-full"
        {...prop.pickerProps}
        format={format}
        onChange={onChange}
      />
    </FormItem>
  )
}

export default FormDatePicker

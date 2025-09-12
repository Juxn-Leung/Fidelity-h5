import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd'
import { getDatePattern, getDelimiters, withCleaveInput } from './CleaveInput'
import { useMemo } from 'react'

function DatePicker(props: DatePickerProps) {
  const CleaveInput = useMemo(() => {
    if (props.showTime) return
    let format = props.format
    if (format && typeof format !== 'string') return
    switch (props.picker || 'date') {
      case 'date':
        format = format || 'YYYY-MM-DD'
        return withCleaveInput({
          date: true,
          delimiters: getDelimiters(format),
          datePattern: getDatePattern(format),
        })
      case 'month':
        format = format || 'YYYY-MM'
        return withCleaveInput({
          date: true,
          delimiters: getDelimiters(format),
          datePattern: getDatePattern(format),
        })
    }
  }, [props.format, props.picker, props.showTime])
  return (
    <AntdDatePicker
      {...props}
      components={{
        input: CleaveInput,
        ...props.components,
      }}
    ></AntdDatePicker>
  )
}
export default DatePicker

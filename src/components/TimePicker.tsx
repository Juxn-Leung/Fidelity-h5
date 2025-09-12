import { TimePicker as AntdTimePicker, TimePickerProps } from 'antd'
import { getTimePattern, withCleaveInput } from './CleaveInput'
import { useMemo } from 'react'

function TimePicker(props: TimePickerProps) {
  const CleaveInput = useMemo(() => {
    let format = props.format
    if (format && typeof format !== 'string') return
    format = format || 'HH:mm:ss'
    return withCleaveInput({
      time: true,
      timePattern: getTimePattern(format),
    })
  }, [props.format])
  return (
    <AntdTimePicker
      {...props}
      components={{
        input: CleaveInput,
        ...props.components,
      }}
    ></AntdTimePicker>
  )
}
export default TimePicker

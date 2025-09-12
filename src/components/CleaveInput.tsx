// @ts-ignore
const Cleave = require('cleave.js/react').default as React.ComponentType<any>;
import type { Props as CleaveProps } from 'cleave.js/react/props'
import { forwardRef, useImperativeHandle, useRef } from 'react'

type CleaveInputProps = Pick<CleaveProps, 'value' | 'onChange' | 'options'>

const CleaveInput = forwardRef<any, CleaveInputProps>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus()
    },
  }))
  const setRef = (element: HTMLInputElement) => {
    inputRef.current = element
  }
  return <Cleave htmlRef={setRef} {...props} />
})

export default CleaveInput

export function withCleaveInput(options: CleaveProps['options']) {
  return forwardRef((props, ref) => (
    <CleaveInput {...props} options={options} ref={ref}></CleaveInput>
  ))
}

export const getDatePattern = (format: string) => {
  const patterns: { [key: string]: string } = {
    YYYY: 'Y',
    MM: 'm',
    DD: 'd',
  }
  return format.split(/[^A-Za-z]/).map((part) => patterns[part] || part)
}

export const getTimePattern = (format: string) => {
  const patterns: { [key: string]: string } = {
    HH: 'h',
    mm: 'm',
    ss: 's',
  }
  return format.split(/[^A-Za-z]/).map((part) => patterns[part] || part)
}

export function getDelimiters(format: string) {
  const matches = format.match(/[^A-Za-z]+/g)
  return matches || []
}

export const codeRequired = {
  pattern: new RegExp(/^[0-9a-zA-Z/-]{1,}$/, 'g'),
  message: '僅允許包含數字、字母、/和-',
}

export const emailRequired = {
  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: '請輸入有效的電郵地址',
  trigger: 'change',
}

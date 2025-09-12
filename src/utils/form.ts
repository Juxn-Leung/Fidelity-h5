export const validateInfo = {
  required: [{ required: true, message: '此項為必填項' }],
  infoRequired: [
    {
      pattern: /^(?!(\s+$))/,
      message: '請輸入不為空的字符',
      trigger: 'change',
    },
  ],
  numberRequired: [
    // { pattern: /^[1-9]\d*$/, message: '請輸入正確的數字', trigger: 'change' },
    {
      pattern: new RegExp(/^[0-9a-zA-Z/-]{1,}$/, 'g'),
      message: '僅允許包含數字、字母、/和-',
      trigger: 'change',
    },
  ],
  emailRequired: [
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '請輸入有效的電郵地址',
      trigger: 'change',
    },
  ],
  phoneRequired: [
    {
      pattern: /^[0-9]{8}$/,
      message: '請輸入8位數字',
      trigger: 'change',
    },
  ],
  macauPhoneRequired: [
    {
      pattern: /^6[0-9]{7}$/,
      message: '請輸入有效的澳門電話號碼',
      trigger: 'change',
    },
  ],
  maxLength300: [
    {
      validator: (_: any, value: string) => {
        if (
          value &&
          [...value].reduce(
            (acc, char) => acc + (char.match(/[^\x00-\xff]/) ? 2 : 1),
            0
          ) > 300
        ) {
          return Promise.reject('不得超過300個字符（其中一個中文等於2個字符）')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  maxLength100: [
    {
      validator: (_: any, value: string) => {
        if (
          value &&
          [...value].reduce(
            (acc, char) => acc + (char.match(/[^\x00-\xff]/) ? 2 : 1),
            0
          ) > 100
        ) {
          return Promise.reject('不得超過100個字符（其中一個中文等於2個字符）')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
  maxLength10: [{ max: 10, message: '不得超過10個字符', trigger: 'change' }],
}

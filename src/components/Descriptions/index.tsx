import { Descriptions as AntdDescriptions } from 'antd'
import { DescriptionsProps } from 'antd'
import Value from './Value'
import Button from './Button'

function Descriptions(props: DescriptionsProps) {
  return (
    <AntdDescriptions
      bordered
      size="small"
      // className='whitespace-pre'
      className="whitespace-pre-line"
      column={props.column || 2}
      labelStyle={{
        paddingLeft: 8,
        paddingRight: 8,
        width: 140,
        color: '#232323',
        background: '#f0fffa',
      }}
      contentStyle={{ paddingLeft: 8, paddingRight: 8 }}
      {...props}
    />
  )
}

Descriptions.Item = AntdDescriptions.Item
Descriptions.Value = Value
Descriptions.Button = Button
export default Descriptions as typeof AntdDescriptions & {
  Value: typeof Value
  Button: typeof Button
}

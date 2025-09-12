import { Flex, Typography } from 'antd'
import { PropsWithChildren, ReactNode } from 'react'
function SectionTitle({
  children,
  extra,
}: PropsWithChildren<{ extra?: ReactNode }>) {
  return (
    <Flex align="center" justify="space-between" className="py-2">
      <Typography.Title level={5} style={{ marginBottom: 'auto' }}>
        {children}
      </Typography.Title>
      {extra && <div>{extra}</div>}
    </Flex>
  )
}
export default SectionTitle

import { Col, Row } from 'antd'
import { ReactNode } from 'react'

const PageLayout = ({
  left,
  right,
  style,
}: {
  left: ReactNode
  right?: ReactNode
  style?: React.CSSProperties
}) => {
  return (
    <div
      className="p-4 flex-1 overflow-hidden"
      style={{ height: 'calc(100vh - 60px - 72px)', ...style }}
    >
      <Row gutter={12} className="h-full overflow-hidden">
        <Col span={right ? 12 : 24} className="h-full overflow-y-auto">
          {left}
        </Col>
        <Col span={right ? 12 : 0} className="h-full overflow-y-auto">
          {right}
        </Col>
      </Row>
    </div>
  )
}
export default PageLayout

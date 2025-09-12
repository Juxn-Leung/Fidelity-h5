import { PropsWithChildren, ReactNode } from 'react'
import SectionTitle from './SectionTitle'
function SectionTitleIcon({
  children,
  extra,
  direction = 'right',
}: PropsWithChildren<{ extra?: ReactNode; direction?: 'left' | 'right' }>) {
  return (
    <SectionTitle extra={extra}>
      <div className="flex" style={{ alignItems: 'center' }}>
        {direction === 'left' && (
          <div
            style={{
              marginRight: 20,
              backgroundColor: '#c4e4ce',
              width: 5,
              height: 16,
            }}
          ></div>
        )}
        <div>{children}</div>
        {direction === 'right' && (
          <div
            style={{
              marginLeft: 20,
              backgroundColor: '#c4e4ce',
              width: 5,
              height: 16,
            }}
          ></div>
        )}
      </div>
    </SectionTitle>
  )
}
export default SectionTitleIcon

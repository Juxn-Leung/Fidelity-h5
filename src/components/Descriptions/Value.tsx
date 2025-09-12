import React, { PropsWithChildren } from 'react'

function Value({
  children,
  extra,
}: PropsWithChildren<{ extra?: React.ReactNode }>) {
  return (
    <div className="w-full flex items-center justify-between">
      <div>{children}</div>
      {extra && <div>{extra}</div>}
    </div>
  )
}
export default Value

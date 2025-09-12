import { Button, Result } from 'antd'
import { useMemo } from 'react'
import { useRouteError } from 'react-router'

function ErrorBoundary() {
  const error = useRouteError()
  const errorMessage = useMemo(() => {
    if (error instanceof Error) {
      return error?.message
    }
    if (typeof error === 'string') {
      return error
    }
    return 'Unknown error'
  }, [error])
  return (
    <Result
      status="error"
      title="Error"
      subTitle={errorMessage}
      extra={
        <Button
          type="primary"
          onClick={() => {
            location.reload()
          }}
        >
          刷新
        </Button>
      }
    />
  )
}

export default ErrorBoundary

import { InfoCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Select, SelectProps, Tooltip } from 'antd'
import { DependencyList, useEffect } from 'react'
function LazyLoadSelect(
  props: SelectProps & {
    fetchOptions: (params?: any) => Promise<any>
    refreshDeps?: DependencyList
  }
) {
  const { fetchOptions, refreshDeps, ...rest } = props
  const { loading, data, error, refresh, run } = useRequest(fetchOptions, {
    refreshDeps,
    manual: true,
  })
  useEffect(() => {
    run()
  }, [])

  const handleSearch = (value: string) => {
    run(value)
  }
  return (
    <Select
      showSearch
      loading={loading}
      options={data}
      placeholder={'請輸入關鍵字搜索'}
      {...rest}
      suffixIcon={
        !loading && error ? (
          <Tooltip title="點擊重試">
            <InfoCircleFilled
              style={{ color: 'red' }}
              onClick={refresh}
            ></InfoCircleFilled>
          </Tooltip>
        ) : undefined
      }
      onSearch={handleSearch}
      filterOption={false}
    ></Select>
  )
}
export default LazyLoadSelect

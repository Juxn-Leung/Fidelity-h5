import { InfoCircleFilled } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Select, SelectProps, Tooltip } from 'antd'
import { DependencyList, useMemo } from 'react'
function AsyncSelect(
  props: SelectProps & {
    fetchOptions: (params?: any) => Promise<any>
    refreshDeps?: DependencyList
    allowDisabledSelect?: boolean
  }
) {
  const { fetchOptions, refreshDeps, allowDisabledSelect, ...rest } = props
  const { loading, data, error, refresh } = useRequest(fetchOptions, {
    refreshDeps,
  })
  const options = useMemo(() => {
    if (!data) return []
    const items = (data as any[]).sort((a, b) => {
      if (a.disabled === b.disabled) return 0
      if (a.disabled) return 1
      return -1
    })
    return allowDisabledSelect
      ? items.map(({ disabled: _, ...rest }: any) => rest)
      : items
  }, [allowDisabledSelect, data])
  return (
    <Select
      loading={loading}
      options={options}
      showSearch
      optionFilterProp="nameTc"
      fieldNames={{
        label: 'nameTc',
        value: 'id',
      }}
      placeholder={'請選擇'}
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
    ></Select>
  )
}
export default AsyncSelect

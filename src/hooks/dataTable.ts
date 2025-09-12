import { useAntdTable, useSelections } from 'ahooks'
import {
  Service,
  Data,
  Params,
  AntdTableOptions,
} from 'ahooks/lib/useAntdTable/types'
import { TableProps } from 'antd'
import { merge } from 'lodash'
import { useMemo } from 'react'
export const useAntdDataTable = (
  service: Service<Data, Params>,
  options?: AntdTableOptions<Data, Params> | undefined
) => {
  return useAntdTable(
    service,
    merge({}, options, {
      // defaultPageSize: 20
    })
  )
}
export type GetTableDataFn = Service<Data, Params>

export const useAntdDataTableSelections = <T = any>(
  items: T[],
  options?: { itemKey: string }
) => {
  const itemKey = options?.itemKey || 'id'
  const {
    selected,
    setSelected,
    isSelected,
    noneSelected,
    allSelected,
    clearAll,
    unSelectAll,
    selectAll,
    select,
  } = useSelections<T>(items, {
    itemKey,
  })
  const selectedRowKeys = useMemo(
    () => selected.map((ele: any) => ele?.[itemKey]),
    [selected, itemKey]
  )
  const rowSelection: TableProps<T>['rowSelection'] = {
    selectedRowKeys: selectedRowKeys,
    onChange(_, selectedRows) {
      setSelected(selectedRows)
    },
  }
  return {
    rowSelection,
    selectedRowKeys,
    selected,
    setSelected,
    isSelected,
    noneSelected,
    allSelected,
    clearAll,
    unSelectAll,
    selectAll,
    select,
  }
}

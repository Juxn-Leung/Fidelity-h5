import { Params } from 'ahooks/lib/useAntdTable/types'
import { isDayjs } from 'dayjs'
import { cloneDeep } from 'lodash'
import { arrayToTree as performantArrayToTree } from 'performant-array-to-tree'
export function arrayToTree(items: any[], config: any) {
  return performantArrayToTree(items, {
    dataField: null,
    ...config,
  })
}

export function mapNodesWithDisabledIds(
  nodes: any[],
  ids: string[],
  parentDisabled = false
) {
  const clonedNodes = cloneDeep(nodes)
  for (const node of clonedNodes) {
    const disabled = ids.includes(node.id) || parentDisabled
    if (disabled) {
      node.disabled = true
    }
    if (node.children) {
      node.children = mapNodesWithDisabledIds(node.children, ids, disabled)
    }
  }
  return clonedNodes
}

export const getListQuery: (options?: Params[0]) => {
  pageNo: number
  pageSize: number
  sort?: string
} = (options) => {
  const { sorter, pageSize, current } = options || { pageSize: 10, current: 1 }
  const sorters = Array.isArray(sorter) ? sorter : [sorter]
  return {
    sort:
      sorters
        .map((sorter) =>
          sorter && sorter.field && sorter.order
            ? `${sorter.field}:${sorter.order === 'descend' ? 'desc' : 'asc'}`
            : undefined
        )
        .filter((ele) => !!ele)
        .join(',') || undefined,
    pageNo: current || 1,
    pageSize: pageSize || 10,
  }
}

export const getRangeQuery = <T>(
  items: T[],
  keys: string[],
  map: (ele: T, i: number) => unknown = (ele) => ele
) => {
  return Object.assign(
    {},
    ...keys.map((key, i) => ({ [key]: map ? map(items?.[i], i) : items?.[i] }))
  )
}

export const getDateTimeRangeQuery = <T>(items: T[], keys: string[]) => {
  return getRangeQuery(items, keys, (ele) => {
    if (ele instanceof Date || isDayjs(ele)) {
      return ele.toISOString()
    }
    return ele
  })
}

export const createGetOptionTextFn =
  (options: any[], valueKey: string = 'value') =>
  (value: string) => {
    const option = options.find((opt) => opt[valueKey] === value)
    return option?.label
  }

export const getUploadType = (type: string) => {
  if (type === 'scan') return 'QUICK_SCAN'
  if (type === 'sceye') return 'HIGH_CAMERA'
  if (type === 'local') return 'NATIVE'
  if (type === 'update') return 'UPDATE_GENERATED'
}

import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import type { TableColumnsType, TableProps } from 'antd'
import { RightOutlined, DownOutlined } from '@ant-design/icons'
import './DataTable.scss'

type TableRowSelection<T> = TableProps<T>['rowSelection']

interface PageProps {
  pageNum: number
  pageSize: number
  total: number
}

interface DataTableProps {
  columns: TableColumnsType<any>
  data: any[]
  children?: React.ReactNode
  pageProps: PageProps
  isShowSelect?: boolean
  radioSelect?: boolean
  expandable?: any
  expandIconfn?: (expanded: boolean) => void
  handleSelectChange?: (selectedRowKeys: React.Key[]) => void
  handlePageChange?: (current: number) => void
  handlePageSizeChange?: (current: number, size: number) => void
  handleSortChange?: (sort: string) => void
}

const DataTable: React.FC<DataTableProps> = (props) => {
  const {
    children,
    columns,
    data,
    pageProps,
    radioSelect,
    isShowSelect = false,
    expandable,
    handleSelectChange,
    handlePageChange,
    handlePageSizeChange,
    handleSortChange,
  } = props

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
    handleSelectChange && handleSelectChange(newSelectedRowKeys)
  }

  const onPageChange = (current: number, pageSize: number) => {
    if (pageSize !== pageProps.pageSize) return
    handlePageChange && handlePageChange(current)
    onSelectChange([])
  }

  const onPageSizeChange = (current: number, size: number) => {
    handlePageSizeChange && handlePageSizeChange(current && 1, size)
    onSelectChange([])
  }

  const [sort, setSort] = useState('')
  const change = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log(pagination, filters, extra)
    if (sorter && sorter?.columnKey) {
      if (sorter.order) {
        setSort(
          `${sorter.columnKey}:${sorter.order === 'ascend' ? 'asc' : 'desc'}`
        )
      } else {
        setSort('')
      }
      onSelectChange([])
    }
  }

  useEffect(() => {
    handleSortChange && handleSortChange(sort)
  }, [sort])

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    type: radioSelect ? 'radio' : 'checkbox',
    onChange: onSelectChange,
  }

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: false,
    pageSizeOptions: ['5', '10', '20', '30', '40', '50', '100'],
    showTotal: () => `共${pageProps.total}條`,
    pageSize: pageProps.pageSize,
    current: pageProps.pageNum,
    total: pageProps.total,
    onShowSizeChange: onPageSizeChange,
    onChange: onPageChange,
  }

  return (
    <Table
      rowSelection={isShowSelect ? rowSelection : undefined}
      pagination={paginationProps}
      columns={columns}
      dataSource={data}
      key="id"
      rowKey="id"
      rowClassName={(_record, i) => (i % 2 === 1 ? 'even' : 'odd')}
      sticky
      expandable={{
        ...expandable,
        expandIcon: ({ expanded, onExpand, record }) => {
          if (!record.children) {
            return ''
          }
          if (expanded) {
            return (
              <DownOutlined
                onClick={(e) => onExpand(record, e)}
                style={{ marginRight: '2px' }}
              />
            )
          } else {
            return (
              <RightOutlined
                onClick={(e) => onExpand(record, e)}
                style={{ marginRight: '2px' }}
              />
            )
          }
        },
      }}
      onChange={change}
    >
      {children}
    </Table>
  )
}

export default DataTable

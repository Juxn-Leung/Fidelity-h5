import React from 'react'
import { Table } from 'antd'
import type { TablePaginationConfig, TableProps } from 'antd'
import { RightOutlined, DownOutlined } from '@ant-design/icons'
import './DataTable.scss'

const DataTable: React.FC<TableProps> = (props) => {
  const customPagination: TablePaginationConfig = {
    ...props.pagination,
    showSizeChanger: true,
    showQuickJumper: false,
    pageSizeOptions: ['5', '10', '20', '30', '40', '50', '100'],
    showTotal: (total) => `共${total}條`,
  }
  return (
    <Table
      key="id"
      rowKey="id"
      rowClassName={(_record, i) => (i % 2 === 1 ? 'even' : 'odd')}
      sticky
      expandable={{
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
      {...props}
      pagination={customPagination}
    ></Table>
  )
}

export default DataTable

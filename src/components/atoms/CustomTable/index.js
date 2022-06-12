import * as React from 'react';
import Table from '@mui/material/Table';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTable, useExpanded, useRowSelect, useResizeColumns, useFlexLayout, useSortBy } from 'react-table'
import { Checkbox } from '@mui/material';
import './index.css'
import EditableCell from './EditableCell'


const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])
    return (
      <Checkbox
        inputProps={{
          'aria-label': 'select all desserts',
        }}
        color="primary"
        ref={resolvedRef}
        indeterminate={indeterminate}
        {...rest}
      />
    )
  }
)

function CustomTable({ columns, data, updateMyData, headerFixed = true, height = '70vh' }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
      Cell: EditableCell,
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      columns,
      data,
      updateMyData,
      defaultColumn,
      autoResetExpanded: false,
    },
    // useSortBy,
    useExpanded,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          // Header: ({ getToggleAllRowsSelectedProps }) => (
          //   <div>
          //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
          //   </div>
          // ),
          Cell: ({ row }) => {
            return (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )},
          width: 60
        },
        ...columns,
      ])
    },
    useFlexLayout,
    // useResizeColumns,
  )
  
  const fixedColumns = (i) => {
    const fix = [...columns].filter((d, j) => d.fixed && j < i).map(d => d.width)
    return fix.reduce((a, b) => (a + b), 0)
  }

  // const RenderRow = React.useCallback(
  //   ({ index: i, style }) => {
  //     const row = rows[i]
  //     prepareRow(row)
  //     return (
  //       <TableRow key={i} {...row.getRowProps({ style })} className={i % 2 === 0 ? "custom-table-row custom-table-row-even" : "custom-table-row custom-table-row-odd"} >
  //         {row.cells.map((cell, j) => {
  //           return (
  //             <TableCell key={`${i}-${j}`} size="small" className={`${cell?.column?.fixed ? 'custom-table-cell-fixed' : ''}`} {...cell.getCellProps({ style: {...(cell?.column?.fixed ? { left: fixedColumns(j - 1) } : {})} })}>
  //               <div className={`custom-table-cell ${cell?.column?.editable ? 'custom-table-editable-cell' : ''}`} >
  //                 {cell.render('Cell')}
  //               </div>
  //             </TableCell>
  //           )
  //         })}
  //       </TableRow>
  //     )
  //   },
  //   [prepareRow, rows, state]
  // )

  const renderRow = React.useMemo(() => rows.map((row, i) => {
    prepareRow(row)
    return (
      <TableRow key={i} {...row.getRowProps()} className={i % 2 === 0 ? "custom-table-row custom-table-row-even" : "custom-table-row custom-table-row-odd"} >
        {row.cells.map((cell, j) => {
          return (
            <TableCell key={`${i}-${j}`} size="small" className={`${cell?.column?.fixed ? 'custom-table-cell-fixed' : ''}`} {...cell.getCellProps({ style: {...(cell?.column?.fixed ? { left: fixedColumns(j - 1) } : {})} })}>
              <div className={`custom-table-cell ${cell?.column?.editable ? 'custom-table-editable-cell' : ''}`} >
                {cell.render('Cell')}
              </div>
            </TableCell>
          )
        })}
      </TableRow>
    )
  }), [prepareRow, rows, state])

  return (
    <TableContainer style={{ position: 'relative', overflow: 'auto', height }} >
      <Table {...getTableProps()}>
        <TableHead style={{ ...(headerFixed ? { position: 'sticky', top: 0, left: 0, background: '#fff', zIndex: 2 } : {}) }} >
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()} className="custom-table-row-head" >
              {headerGroup.headers.map((column, j) => (
                <TableCell size="small" {...column.getHeaderProps({ style: {...(column?.fixed ? { left: fixedColumns(j - 1) } : {})} })} className={`${column?.fixed ? 'custom-table-header-cell-fixed' : ''}`}>
                  <div className="custom-table-cell" >
                    {/* <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    > */}
                      {column.render('Header')}
                    {/* </TableSortLabel> */}
                    {/* <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    /> */}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {/* <AutoSizer>
            {({ height, width }) => (
              <List
                className="List"
                height={height || 600}
                itemCount={rows.length}
                itemSize={50}
                width={width || '100%'}
              >
                {RenderRow}
              </List>
            )}
          </AutoSizer> */}
          {renderRow}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CustomTable


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTable, useExpanded, useRowSelect, useFlexLayout } from 'react-table'
import { IconButton, Skeleton, TableFooter } from '@mui/material';
import './index.css'
import EditableCell from './EditableCell'
import ColumnFilter from './ColumnFilter';
import CustomSort from './CustomSort';
import { Loader } from '..';
import CellMenu from './CellMenu';

function AsyncTable({ columns, data, updateMyData, headerFixed = true, height = '70vh', onColumnFilter, columnFilter = {}, onColumnSort, columnSort = {}, customFunctions = {}, edit = [], onEdit = () => null, loading = false, error = false, onCellMenuItemClick = () => null, rowsExpaned, onRowExpaned }) {
  const tbodyRef = React.useRef(null);
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
      Cell: EditableCell,
    }),
    []
  )
  
  console.log(onColumnFilter);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    state,
  } = useTable(
    {
      useControlledState: state => {
        return React.useMemo(
          () => ({
            ...state,
            expanded: rowsExpaned,
          }),
          [state, rowsExpaned]
        )
      },
      columns: Array.isArray(columns) ? columns : [],
      data: Array.isArray(data) ? data : [],
      updateMyData,
      defaultColumn,
      // autoResetExpanded: false,
      autoResetSelectedRows: false,
      onColumnFilter,
      columnFilter,
      onRowExpaned,
      ...customFunctions
    },
    useExpanded,
    useRowSelect,
    useFlexLayout,
  )


  const fixedColumns = (i) => {
    const fix = [...columns].filter((d, j) => d.fixed && j < i).map(d => d.width)
    return fix.reduce((a, b) => (a + b), 0)
  }

  const renderRow = React.useMemo(() => rows.map((row, i) => {
    prepareRow(row)
    return (
      <React.Fragment key={i} >
        <TableRow {...row.getRowProps()} className={i % 2 === 0 ? "custom-table-row custom-table-row-even" : "custom-table-row custom-table-row-odd"} >
          {row.cells.map((cell, j) => {
            return (
              <TableCell id={`${i}-cell-${j}`} key={`${i}-${j}`} size="small" className={`${cell?.column?.fixed ? 'custom-table-cell-fixed custom-table-container-cell' : 'custom-table-container-cell'}`} {...cell.getCellProps({ style: {...(cell?.column?.fixed ? { left: fixedColumns(j) } : {}), ...(cell?.column?.width ? { width: cell?.column?.width } : {})} })}>
                <div className={`custom-table-cell ${cell?.column?.editable ? 'custom-table-editable-cell' : ''}`} >
                  {cell.render('Cell')}
                  {cell?.column?.showCellMenu?.includes(row.depth) &&<CellMenu id={`${i}-cell-${j}`} cellMenuOptions={cell?.column?.cellMenuOptions} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, cell?.column)} />}
                </div>
              </TableCell>
            )
          })}
          {edit.includes(row.depth) && <td className="table-edit-button" ><IconButton onClick={() => onEdit(row)} ><i className="la la-pen" /></IconButton></td>}
        </TableRow>
        {row.isExpanded && !row.subRows.length && (
          <TableRow {...row.getRowProps()} key={`${i}-loader`} >
            {row.cells.map((cell, j) => {
              return (
                <TableCell key={j} size="small" {...cell.getCellProps()}>
                  <Skeleton variant="rectangular" width="100%" height={38} />
                </TableCell>
              )
            })}
            
          </TableRow>
        )}
      </React.Fragment>
    )
  }), [prepareRow, rows, state])

  return (
    <TableContainer style={{ position: 'relative', overflow: 'auto', maxHeight: height, minHeight: 150 }} >
      <Table {...getTableProps()}>
        <TableHead style={{ ...(headerFixed ? { position: 'sticky', top: 0, left: 0, background: '#fff', zIndex: 2 } : {}) }} >
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()} className="custom-table-row-head" >
              {headerGroup.headers.map((column, j) => {
                return (
                <TableCell size="small" {...column.getHeaderProps({ style: {...(column?.fixed ? { left: fixedColumns(j) } : {}), ...(column?.width ? { width: column?.width } : {})} })} className={`${column?.fixed ? 'custom-table-header-cell-fixed' : ''}`}>
                  <div className="custom-table-cell custom-table-header-cell space-btwn vcenter" >
                    <div className="disp-flex full-width" >
                      <div title={typeof column.render('Header') === 'string' ? column.render('Header') : ''} >{column.render('Header')}</div>
                      {!column?.hideSort && onColumnSort && <CustomSort onSort={(val) => onColumnSort(val, column?.id)} active={Object.keys(columnSort).indexOf(column?.id) !== -1} direction={columnSort[column?.id]} />}
                    </div>
                    <div style={{ marginRight: -15 }} className="disp-flex vcenter" >
                      {!column?.hideFilter && onColumnFilter && <ColumnFilter searchText={columnFilter[column?.id] || ''} filterTitle={typeof column.render('Header') === 'string' ? column.render('Header') : ''} onFilter={(val) => onColumnFilter(val, column?.id)} />}
                    </div>
                  </div>
                </TableCell>
              )})}
            </TableRow>
          ))}
        </TableHead>
        {!!rows.length && (
          <TableBody {...getTableBodyProps()} ref={tbodyRef} >
            {renderRow}
          </TableBody>
        )}
        {!!rows.length && !!footerGroups.length &&<TableFooter>
          {footerGroups.map(group => (
            <TableRow {...group.getFooterGroupProps()}>
              {group.headers.map(column => (
                <TableCell {...column.getFooterProps()}>{column.render('Footer')}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>}
      </Table>
      {!rows.length && (
        <Loader loading={loading} error={error} noData={!rows.length} style={{ height: 200, position: 'sticky', left: 0 }} />
      )}
    </TableContainer>
  )
}

export default AsyncTable


import { IconButton, Tooltip } from "@mui/material"
import RowSelectEditor from "../../atoms/Editors/RowSelectEditor"
import DateFormatter from "../../atoms/Formatters/DateFormatter"

export const UDF_TABLE_COLUMNS = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell rdg-editor-cell_ckeckbox",
    sortable: false,
    frozen: false,
    headerRenderer: null,
    formatter: RowSelectEditor,
  },
  { resizable: true, key: 'UDF_NAME', name: 'Field Name', formatter: ({row}) => (row.UDF_DESCRIPTION ? <Tooltip placement='right' title={row.UDF_DESCRIPTION} arrow><span>{row.UDF_NAME}</span></Tooltip> : <span>{row.UDF_NAME}</span>) },
  { resizable: true, key: 'FIELD_TYPE_NAME', name: 'Field Type' },
  { resizable: true, key: 'ADDED_BY', name: 'Created By' },
  { resizable: true, key: 'ADDED_DATE_DISPLAY', name: 'Created Date', type: 'Date', formatter: DateFormatter, },
  { resizable: true, key: 'UPDATED_BY', name: 'Edited By' },
  { resizable: true, key: 'UPDATED_DATE_DISPLAY', name: 'Edited Date', type: 'Date', formatter: DateFormatter, },
  { width: 30, key: 'edit', name: '', formatter: ({ otherFunctions, row }) => {
    const onClick = (type) => {
      const { onEdit, onDelete } = otherFunctions
      if (onEdit && type === 'edit') {
        onEdit(row)
      } else if (onDelete && type === 'delete') {
        onDelete(row)
      }
    }
    return (
      <div className="rdg-table-edit-button" >
        <IconButton size="small" onClick={() => onClick('edit')} ><i className="la la-pen" /></IconButton>
        {/* <IconButton size="small" onClick={() => onClick('delete')} ><i className="la la-trash-alt" /></IconButton> */}
      </div>
    )}
  }
]

export const FORM_DATA = {
  columns: [
    { field: 'field_name', headerName: 'Field Name', type: 'text' },
    { field: 'modules', headerName: 'Used in Module(s)', type: 'multi-select', },
    { field: 'field_type', headerName: 'Field Type', type: 'dropdown', values: ['Free Text', 'Date', 'Currency', 'Numeric', 'Account No', 'Dropdown'] },
    { field: 'field_format', headerName: 'Numeric Format', type: 'drodown', values: ['X', 'XX', 'XXX', 'XXXX', 'XXXXX', 'XXXXXX'] },
    { field: 'field_format', headerName: 'Account No Format', type: 'dropdown', values: ['XXXX-XXXXXX-XXXXXX', 'XXXXXXXXX-XXXX', 'XX-XX-XXXXXXX-XX'] },
    { field: 'new_existing', headerName: 'New or Existing', type: 'radio', values: ['New', 'Existing'] },
    { field: 'Existing Field Name', headerName: 'Start date', type: 'date' },
    { field: 'end_date', headerName: 'End date', type: 'date' },
    { field: 'status', headerName: 'Contract Status ', type: 'dropdown', values: [{ name: 'Active', value: 'Active' }, { name: 'Inactive', value: 'Inactive' }] },
    { field: 'client_name', headerName: 'Client Name', type: 'text' },
    { field: 'client_number', headerName: 'Client Number', type: 'phone' },
    { field: 'contract_admin', headerName: 'Contract Administrator', type: 'text' },
  ]
}

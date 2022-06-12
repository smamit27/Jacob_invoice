import { IconButton, Stack } from "@mui/material"
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import CellMenu from '../../atoms/Editors/CellMenu'

export const MANAGE_SAVED_VIEWS = [
  
  { resizable: true, key: 'VIEW_NAME', name: 'View Name' ,

  "cellClass": "rdg-editor-cell",
  "formatter": ({ row, otherFunctions = {}, ...others }) => {
   const { onCellMenuItemClick = () => null } = otherFunctions
   return (
      <div>
        <CellMenu cellMenuOptions={[{ id: 'set_default', description: 'Set as Default View' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
        <span>{row.VIEW_NAME}</span>
      </div>
    )
  }},
  { resizable: true, key: 'VISIBILITY', name: 'Visibility' },
  {
    resizable: true,
    "width":150,
    "key":"ADDED_BY",
    "name":"Created By"
  },
  {
    resizable: true,
    "width":150,
    "key":"ADDED_DATE",
    "name":"Created On",
    "type":"Date",
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width":150,
    "key":"UPDATED_BY",
    "name":"updated on"
  },  
  {
    resizable: true,
    "width":150,
    "key":"UPDATED_DATE",
    "name":"Updated on",
    "type":"Date",
    formatter: DateFormatter
  },
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
      </div>
    )}
  }
]
   
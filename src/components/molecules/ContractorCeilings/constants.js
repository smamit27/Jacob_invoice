import { IconButton, Stack } from "@mui/material"
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';

  
export const CONTRACTOR_CEILING_TABLE_COLUMNS = [
  
  { resizable: true, key: 'PERIOD_NAME', name: 'Period' ,"cellClass": "rdg-editor-cell rdg-editor-cell_ckeckbox",
  summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) }
},
  { resizable: true, key: 'CEILING_DESCRIPTION', name: 'Description' },
  { resizable: true, key: 'CONTRACT_START_DATE_DISPLAY', name: 'Start Date', type: 'Date'  },
  { resizable: true, key: 'CONTRACT_END_DATE_DISPLAY', name: 'End Date', type: 'Date' },
  { resizable: true,width: 100, key: 'CONTRACT_HOURS', name: 'Hours' },
  { resizable: true,width: 100, key: 'AWARD_AMOUNT', name: 'Award Amount', "type": "Currency",
  formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,},
  { resizable: true,width: 80, key: 'CURRENCY', name: 'Currency' },
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
   
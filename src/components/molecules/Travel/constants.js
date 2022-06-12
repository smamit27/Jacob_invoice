import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector'
import EmployeeAutocomplete from './EmployeeAutocomplete';
import DateEditor from "../../atoms/Editors/DateEditor";
import DateFormatter from '../../atoms/Formatters/DateFormatter';

export const columns = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell rdg-editor-cell_ckeckbox",
    sortable: false,
    frozen: true,
    headerRenderer: null,
    formatter: CustomRowSelector,
  },
  {
    resizable: true,
    "width":150,
    "key":"TRIP_NUMBER",
    "name":"Trip Number",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
    frozen: true,
    "formatter": ({ row, otherFunctions,  ...others}) => {
      const { onCellMenuItemClick = () => null } = otherFunctions
      return (
        <span>
          <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span>{row.TRIP_NUMBER}</span>
        </span>
      )
    }
  },
  {
    resizable: true,
    "width":150,
    "key":"EMPLOYEE_NUMBER",
    "name":"Employee Number",
    "cellClass": "rdg-editor-cell",
    editor: EmployeeAutocomplete
  },
  {
    resizable: true,
    "width":150,
    "key":"FROM_DESTINATION",
    "name":"From Destination",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width":150,
    "key":"TO_DESTINATION",
    "name":"To Destination",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width":150,
    "key":"FROM_DATE",
    "name":"From Date",
    "editor": DateEditor,
    formatter: DateFormatter,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"TO_DATE",
    "name":"To Date",
    formatter: DateFormatter,
    "editor": ({ row, ...props }) => <DateEditor minDate={new Date(row.FROM_DATE) || ''} row={row}  {...props} />,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"TRAVEL_PURPOSE",
    "name":"Travel Purpose",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width":150,
    "key":"ADDED_DATE",
    "name":"Created Date",
    formatter: DateFormatter,
    "type":"Date"
  },
  {
    resizable: true,
    "width":150,
    "key":"ADDED_BY",
    "name":"Created By"
  },
  {
    resizable: true,
    "width":150,
    "key":"UPDATED_DATE",
    "name":"Last Updated Date",
    "type":"Date",
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width":150,
    "key":"UPDATED_BY",
    "name":"Last Updated By"
  }
]


export const formSaveData = (data) => {
  return data.map(d => ({
    "traveL_ID": d.TRAVEL_ID || 0,
    "triP_NUMBER": d.TRIP_NUMBER || "",
    "employeE_ID": d.EMPLOYEE_ID || 0,
    "froM_DESTINATION": d.FROM_DESTINATION || "",
    "tO_DESTINATION": d.TO_DESTINATION || "",
    "froM_DATE": d.FROM_DATE || "",
    "tO_DATE": d.TO_DATE || "",
    "traveL_PURPOSE": d.TRAVEL_PURPOSE || "",
    "savE_MODE": d?.SAVE_MODE,
  }))
}


export const validateData = (dat) => {
  let val = null
  dat.forEach(d => {
    if (!d.TRIP_NUMBER) {
      val = {
        value: d,
        message: 'TRIP_NUMBER'
      }
      return val
    } else if (!d.EMPLOYEE_NUMBER) {
      val = {
        value: d,
        message: 'EMPLOYEE_NUMBER'
      }
      return val
    } else if (!d.FROM_DESTINATION) {
      val = {
        value: d,
        message: 'FROM_DESTINATION'
      }
      return val
    } else if (!d.TO_DESTINATION) {
      val = {
        value: d,
        message: 'TO_DESTINATION'
      }
      return val
    } else if (!d.FROM_DATE) {
      val = {
        value: d,
        message: 'FROM_DATE'
      }
      return val
    } else if (!d.TO_DATE) {
      val = {
        value: d,
        message: 'TO_DATE'
      }
      return val
    } else if (!d.TRAVEL_PURPOSE) {
      val = {
        value: d,
        message: 'TRAVEL_PURPOSE'
      }
      return val
    }
  })
  return val
}
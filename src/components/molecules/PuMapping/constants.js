import CellMenu from '../../atoms/Editors/CellMenu'
import CustomRowSelector from "../../atoms/Editors/CustomRowSelector"
import SelectEditor from '../../atoms/Editors/SelectEditor'
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
    "width":200,
    "key":"PU_NAME",
    "name":"Performance Unit (PU) Name",
    frozen: true,   
  }, 
  {
    resizable: true,
    "width":150,
    "key":"PU_NUMBER",
    "name":"Performance Unit (PU) Number",
  },
  {
    resizable: true,
    "width":150,
    "key":"PU_DESC",
    "name":"Performance Unit (PU) Description",
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      const { onCellMenuItemClick = () => null } = otherFunctions
      if (row.FLAG_IS === 'Y' || row.FLAG_IS === 'N') {
 
      return (
         <span>
           <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
           <span>{row.PU_DESC}</span>
         </span>
       )
     }
     return (
      <span>
        <CellMenu cellMenuOptions={row.FLAG_IS === 'TEMP' ? [{ id: 'add-row', description: 'Insert row' }, { id: 'delete-row', description: 'Delete row' }] : [{ id: 'add-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
        <span>{row.PU_DESC}</span>
      </span>
    )
   }
  },
 
  {
    resizable: true, width: 140, key: 'RATE_GROUP_ID', name: 'RATE GROUP (PU Type)', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
    formatter: ({ row, column }) => {
        const { valueOptions = [] } = column
        const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
        return description
    }
},
  {
    resizable: true,
    "width":100,
    "key":"DATE_FROM",
    "name":"PU Start Date",
    "type":"Date",
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width":100,
    "key":"DATE_TO",
    "name":"PU End Date",
    "type":"Date",
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width":100,
    "key":"ADDED_DATE",
    "name":"Created Date",
    "type":"Date",
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width":100,
    "key":"ADDED_BY",
    "name":"Created By"
  },
  {
    resizable: true,
    "width":100,
    "key":"UPDATED_DATE",
    "name":"Last Updated Date",
    "type":"Date",
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width":100,
    "key":"UPDATED_BY",
    "name":"Last Updated By"
  },
  
]
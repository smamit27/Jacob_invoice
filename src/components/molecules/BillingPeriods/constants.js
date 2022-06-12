
import DateEditor from "../../atoms/Editors/DateEditor";
import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
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
    frozen: false,
    headerRenderer: null,
    formatter: RowSelectEditor,
  },
  
  {
    resizable: true,
    "width":150,
    "key":"BILLING_PERIOD_NAME",
    "name":"Billing Period Name",
    "editor": ({ row, ...others }) => row.level === 1 ? <TextEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
     const { onCellMenuItemClick = () => null } = otherFunctions
     return (
        <div>
          <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row' }, { id: 'delete-row', description: 'Delete row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span>{row.BILLING_PERIOD_NAME}</span>
        </div>
      )
    }
  }, 
  {
    resizable: true,
    "width":150,
    "key":"BILLING_START_DATE",
    "name":"Billing Start Date",
    "editor": DateEditor,
    formatter: DateFormatter,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"BILL_THROUGH_DATE",
    "name":"Bill Through Date",
    "editor": DateEditor,
    formatter: DateFormatter,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"BILLING_TYPE",
    "name":"Biling Frequency",
    "cellClass": "rdg-editor-cell",
    editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => <SelectEditor row={row} {...props} />,
    formatter: ({ row, column }) => {
        const { valueOptions = [] } = column
        const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
        return description
    }
  },
  {
    resizable: true,
    "width":150,
    "key":"ADDED_DATE",
    "name":"Created Date",
    "type":"Date",
    formatter: DateFormatter,
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

export const importColumns = [
  {
    resizable: true,
    "width":"50%",
    "key":"BILLING_START_DATE",
    "name":"Billing Start Date",
    "type":"Date"
  },
  {
    resizable: true,
    "width":"50%",
    "key":"BILL_THROUGH_DATE",
    "name":"Bill Through Date",
    "type":"Date"
  },

]

export const importSetupColumns = [
  {
    resizable: true,
    "width":"25%",
    "key":"BILLING_PERIOD_NAME",
    "name":"BILLING PERIOD NAME",
    "type":"Date"
  },
  {
    resizable: true,
    "width":"25%",
    "key":"BILLING_START_DATE",
    "name":"Billing Start Date",
    "type":"Date"
  },
  {
    resizable: true,
    "width":"25%",
    "key":"BILL_THROUGH_DATE",
    "name":"Bill Through Date",
    "type":"Date"
  },
  {
    resizable: true,
    "width":"25%",
    "key":"BILLING_TYPE",
    "name":"Biling Frequency",
    "type":"Date"
  },

]

export const formSaveData = (data, udfcolumns, moduleId, collectionId) => {
  const insertData = []
  data.forEach(d => {
    const udfData= udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      udF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      savE_MODE: 'I',
      modulE_ID: moduleId,
      udF_ID: UDF_ID,
    }))
    const temp = 
    {
      "biP_ID": d?.BIP_ID || 0,
      "collectioN_ID": collectionId,
      "billinG_PERIOD_NAME": d?.BILLING_PERIOD_NAME || '',
      "billinG_START_DATE": d?.BILLING_START_DATE || '',
      "bilL_THROUGH_DATE": d?.BILL_THROUGH_DATE || '',
      "billinG_TYPE": d?.BILLING_TYPE || '',
      "savE_MODE": d?.SAVE_MODE,
      "udF_DATA": udfData

    }
    if (d?.SAVE_MODE === 'I' || d?.SAVE_MODE === 'U' ) {
      insertData.push(temp)
    }
  })
  return {
       insertData
    }
  
}
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import IconButton from '@mui/material/IconButton';
import AutoCompleteEditor from "../../atoms/Editors/AutoCompleteEditor";
import DateEditor from "../../atoms/Editors/DateEditor";
import NumberEditor from "../../atoms/Editors/NumberEditor";
import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import SelectEditor from '../../atoms/Editors/SelectEditor'
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
// import AutoCompleteEditorCustom from './AutoCompleteEditorCustom';

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
    formatter: RowSelectEditor,
  },
  {
    resizable: true,
    "width":200,
    "key":"BURDEN_SCHEDULE_NAME",
    "name":"Burden Schedule Name (Oracle)",
    frozen: true,
  },
  {
    resizable: true,
    "width":150,
    "key":"BURDEN_SCHEDULE_VERSION_NAME",
    "name":"Burden Schedule Version Name (Oracle)",
    frozen: true    
  },
  {
    resizable: true,
    "width":150,
    "key":"RATE_GROUP",
    "name":"Rate Group",
    "editor": ({ row, ...others }) => row.level === 1 ? <TextEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
     const { onCellMenuItemClick = () => null } = otherFunctions
     return (
        <div>
          <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row' }, { id: 'delete-row', description: 'Delete row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span>{row.RATE_GROUP}</span>
        </div>
      )
    }
  }, 
  {
    resizable: true,
    "width":150,
    "key":"RATE_CATEGORY",
    "name":"RATE CATEGORY",
  },
  {
    resizable: true,
    "width":100,
    "key":"START_DATE",
    "name":"Start Date (Oracle)",
  },
  {
    resizable: true,
    "width":100,
    "key":"END_DATE",
    "name":"End Date (Oracle)",
  },
  {
    resizable: true,
    "width":100,
    "key":"ORACLE_RATE_pnct",
    "name":"Oracle Rate",
  },
  {
    resizable: true,
    "width":100,
    "key":"FRINGE_pnct",
    "name":"FRINGE",
    "format":"Decimal",
    "editor": NumberEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"GnA_pnct",
    "name":"G&A",
    "format":"Decimal",
    "editor": NumberEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"OVERHEAD_pnct",
    "name":"Overhead",
  },
  {
    resizable: true,
    "width":150,
    "key":"CLIENT_APPROVED_DATE",
    "name":"CLIENT APPROVED DATE",
    "editor": DateEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"EFFECTIVE_START_DATE",
    "name":"Effective Start Date",
    "editor": DateEditor,
    "cellClass": "rdg-editor-cell"
  },
  
  {
    resizable: true,
    "width":150,
    "key":"EFFECTIVE_END_DATE",
    "name":"Effective End Date",
    "editor": DateEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"EXPENSE_GnA_RATE",
    "name":"Expense G&A Rate",
    "format":"Decimal",
    "editor": NumberEditor,
    "cellClass": "rdg-editor-cell"
   },
   {
    resizable: true,
    "width":100,
    "key":"APPLY_EXPENSE_GnA_RATE_TO_EXPENSE",
    "name":"Apply Expense G&A Rate to Expense",
    "editor": AutoCompleteEditor,
    "valueOptions": [],
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"CONTRACT_ALERT_DATE",
    "name":"CONTRACT ALERT DATE",
    "editor": DateEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"ATTACHMENT",
    "name":"ATTACHMENT",
    "editor": TextEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"CONTRACT_ALERT_LINK",
    "name":"CONTRACT ALERT LINK",
    "editor": TextEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"RATE_TYPE",
    "name":"RATE TYPE",
    "editor": TextEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"DESCRIPTION",
    "name":"DESCRIPTION",
    "editor": TextEditor,
    "cellClass": "rdg-editor-cell"
  },
   {
    resizable: true,
    "width":150,
    "key":"ADDED_DATE",
    "name":"Created Date",
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
    "type":"Date"
  },
  {
    resizable: true,
    "width":150,
    "key":"UPDATED_BY",
    "name":"Last Updated By"
  }
]


export const SEARCH_COLUMNS = [
  {
    key: 'EMPLOYEE_NAME',
    'name': 'Employee Name'
  },
  {
    key: 'EMPLOYEE_NUMBER',
    'name': 'Employee Number'
  },
  {
    key: 'EMPLOYEE_PU',
    'name': 'Employee PU'
  },
  {
    key: 'EMPLOYEE_LEGAL_ENTITY',
    'name': 'Employee LEgal Entity'
  },
  {
    resizable: true,
    "width":150,
    "key":"START_DATE",
    "name":"Start date",
    "editor": DateEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"END_DATE",
    "name":" End Date",
    "editor": DateEditor,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"RATE_GROUP_OVERRIDE",
    "name":"Rate Group Override",
    "editor": SelectEditor,
    "valueOptions": [],
    "cellClass": "rdg-editor-cell"
  },
]
export const SEARCH_EMPLOYEE_COLUMN = [
  {
    key: 'fulL_NAME',
    'name': 'Employee Name'
  },
  {
    key: 'employeE_NUMBER',
    'name': 'Employee Number'
  },
  {
    key: 'performancE_UNIT',
    'name': 'Employee PU'
  },
  {
    key: 'legalentity',
    'name': 'Employee LEgal Entity'
  },

]
export const formSaveData = (data, udfcolumns, moduleId, collectionId) => {
  const insertData = []
  data.forEach(d => {
    const indirectratesudf = udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      udF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      savE_MODE: 'I',
      modulE_ID: moduleId,
      udF_ID: UDF_ID,
      collectioN_ID: collectionId,
      idR_ID: d.IDR_ID
    }))

    const temp = {
      "idR_ID": d?.IDR_ID || 0,
      "collectioN_ID":Number(collectionId),
      "burdeN_SCHEDULE_NAME": d?.BURDEN_SCHEDULE_NAME || 0,
      "burdeN_SCHEDULE_VERSION_NAME": d?.BURDEN_SCHEDULE_VERSION_NAME || 0,
      "ratE_GROUP": d.RATE_GROUP || '',
      "ratE_CATEGORY": d?.RATE_CATEGORY || '',
      "starT_DATE": d?.START_DATE || '',
      "enD_DATE": d?.END_DATE || '',
      "oraclE_RATE_PNCT":Number(d?.ORACLE_RATE_pnct || 0),
      "fringE_PNCT": Number(d?.FRINGE_pnct || 0),
      "gnA_PNCT": Number(d?.GnA_pnct || 0),
      "overheaD_PNCT": Number(d?.OVERHEAD_pnct || 0),
      "clienT_APPROVED_DATE": d?.CLIENT_APPROVED_DATE || '',
      "effectivE_START_DATE": d?.EFFECTIVE_START_DATE || '',
      "effectivE_END_DATE": d?.EFFECTIVE_END_DATE || '',
      "expensE_GNA_RATE": d?.EXPENSE_GnA_RATE || 0,
      "applY_EXPENSE_GNA_RATE_TO_EXPENSE": d?.APPLY_EXPENSE_GnA_RATE_TO_EXPENSE || '',
      "contracT_ALERT_DATE": d?.CONTRACT_ALERT_DATE || '',
      "attachment": d?.ATTACHMENT || '',
      "contracT_ALERT_LINK": d?.CONTRACT_ALERT_LINK || '',
      "ratE_TYPE": d?.RATE_TYPE || '',
      "description": d?.DESCRIPTION || '',
      "savE_MODE": "U",
      "indirectratesudf":indirectratesudf
    }
    if (d?.SAVE_MODE === 'I' || d?.SAVE_MODE === 'U') {
      insertData.push(temp)
    } 
  })
  return {
      insertData
   
  }
}

export const formEmployeeSaveData = (data, moduleId, collectionId) => {
  const insertData = []
  const updateData = []
  data.forEach(d => {
    const temp = {
      "erG_ID": d?.ERG_ID || 0,
      "employeE_NAME": d?.EMPLOYEE_NAME || '',
      "employeE_NUMBER": d?.EMPLOYEE_NUMBER || '',
      "employeE_PU": d?.EMPLOYEE_PU || '',
      "employeE_LEGAL_ENTITY": d?.EMPLOYEE_LEGAL_ENTITY || '',
      "starT_DATE": d?.START_DATE || '',
      "enD_DATE": d?.END_DATE || '',
      "ratE_GROUP_OVERRIDE": d?.RATE_GROUP_OVERRIDE || '',
      "savE_MODE": d?.SAVE_MODE
    }
    if (d?.SAVE_MODE === 'I') {
      insertData.push(temp)
    } else {
      updateData.push(temp)
    }
  })
  return {
    I: {
      "collectioN_ID": collectionId,
      "groupData": insertData
    },
    U: {
      "collectioN_ID": collectionId,
      "groupData": updateData
    }
  }
}


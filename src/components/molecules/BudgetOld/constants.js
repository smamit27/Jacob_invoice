import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import IconButton from '@mui/material/IconButton';
import DateEditor from '../../atoms/Editors/DateEditor';
import TextEditor from '../../atoms/Editors/TextEditor';
import NumberEditor from '../../atoms/Editors/NumberEditor';
import CellMenu from '../../atoms/Editors/CellMenu';
import SelectEditor from '../../atoms/Editors/SelectEditor'
import AutoCompleteAsyncEditor from "../../atoms/Editors/AutoCompleteAsyncEditor";
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import NumberFormatterEmpty from '../../atoms/Formatters/NumberFormatterEmpty';
import TextFilter from '../../atoms/Filters/TextFilter';
import SubcontractorAutocomplete from './SubcontractorAutocomplete';
import Expediture2Autocomplete from './Expediture2Autocomplete';
import Expenditure1Autocomplete from './Expediture1Autocomplete';

export const COLUMNS = [
  {
    "resizable": true,
    "width": 200,
    "key": "PROJECT_NAME",
    "name": "Project (Oracle PA)",
    "frozen": true,
    formatter: ({row, otherFunctions}) => {
      const onClick = () => {
        const { onExpand } = otherFunctions
        if (onExpand) {
          onExpand(row)
        }
      }
      if (row.DATA_LEVEL === 'A') {
        return (
          <span className="rdg-row-expander-container" onClick={onClick}>
            <span className='rdg-row-expander' >
              {!row.isExpanded ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/>}
            </span>
            <span>{row.PROJECT_NAME}</span>
          </span>
        )
      }
      return null
    },
    filterEditor: TextFilter
  },
  {
    "resizable": true,
    "width": 150,
    "key": "ORACLE_APPR_REV_BUDGET_AMT",
    "name": "Oracle Approved Revenue Budget",
    "frozen": true,
    "type": "Currency",
    formatter: ({ row, ...rest }) => {
      if (row.DATA_LEVEL === 'A') {
        return <NumberFormatterEmpty row={row} {...rest} /> 
      }
      return null
    },
  },
  {
    "resizable": true,
    "width": 150,
    "key": "TASK_NUMBER",
    "name": "Task Number (Oracle PA)",
    filterEditor: TextFilter,
    "frozen": true,
  },
  {
    "resizable": true,
    "width": 150,
    "key": "TASK_NAME",
    "name": "Task Name (Oracle PA)",
    filterEditor: TextFilter
  },
  {
    "resizable": true,
    "width": 150,
    "key": "CONTRACT_TYPE",
    "name": "Project Contract Type (Oracle PA)",
    filterEditor: TextFilter
  },
  {
    "resizable": true,
    "width": 150,
    "key": "TASK_NUMBER_OVERRIDE",
    "name": "Client Task Override (Power Invoice)",
    filterEditor: TextFilter
  },
  {
    "resizable": true,
    "width": 150,
    "key": "TASK_NAME_OVERRIDE",
    "name": "Client Task Name Override (Power Invoice)",
    filterEditor: TextFilter
  },
  {
    "resizable": true,
    "width": 150,
    "key": "TASK_BILL_GROUP_NAME",
    "name": "Task Billing Method (Power Invoice)"
  },
  {
    "resizable": true,
    "width": 150,
    "key": "TASK_GROUP_NAME",
    "name": "Client Task Group",
    filterEditor: TextFilter
  },
  {
    "resizable": true,
    "width": 150,
    "key": "CURRENCY",
    "name": "Currency",
    filterEditor: TextFilter
  },
  {
    "resizable": true,
    "width": 150,
    "key": "PROJECT_NUMBER_ED",
    "name": "Client Project Number",
    "cellClass": "rdg-editor-cell",
    "editable": true,
    "editor": ({row, ...others}) => {
      if (row.DATA_LEVEL !== 'A') {
        return <TextEditor row={row} {...others} />
      }
      return null
    },
    "type": "Free Text"
  },
  {
    "resizable": true,
    "width": 150,
    "key": "TASK_NUMBER_ED",
    "name": "Task Number",
    "editor": ({row, ...others}) => {
      if (row.DATA_LEVEL !== 'A') {
        return <TextEditor row={row} {...others} />
      }
      return null
    },
    "cellClass": "rdg-editor-cell",
    "editable": true,
    "type": "Free Text"
  },
  {
    "resizable": true,
    "width": 150,
    "key": "CLIENT_EXPENDITURE_LEVEL_1",
    "name": "Client Expenditure Level 1",
    "cellClass": "rdg-editor-cell",
    "editable": true,
    "editor": ({row, otherFunctions, ...others}) => {
      if (row.DATA_LEVEL === 'C') {
        return <Expenditure1Autocomplete row={row} otherFunctions={otherFunctions} {...others} />
      } else if (row.DATA_LEVEL === 'B') {
        const {onCellMenuItemClick = () => null} = otherFunctions
        return (
          <CellMenu onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
        )
      }
      return null
    },
    "type": "Dropdown",
    "valueOptions": [],
    formatter: ({ row, otherFunctions, ...others }) => {
      if (row.DATA_LEVEL === 'B') {
        const {onCellMenuItemClick = () => null} = otherFunctions
        return (
          <CellMenu onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
        )
      } else if (row.DATA_LEVEL === 'C') {
        return row.CLIENT_EXPENDITURE_LEVEL_1
      }
      return null
    }
  },
  {
    "resizable": true,
    "width": 150,
    "key": "CLIENT_EXPENDITURE_LEVEL_2",
    "name": "Client Expenditure Level 2",
    "cellClass": "rdg-editor-cell",
    "editable": true,
    "editor": ({row, ...others}) => {
      if (row.DATA_LEVEL === 'D') {
        return <Expediture2Autocomplete row={row} {...others} />
      }
      return null
    },
    "type": "Dropdown",
    "valueOptions": [],
    formatter: ({ row, otherFunctions, ...others }) => {
      if (row.DATA_LEVEL === 'C') {
        const {onCellMenuItemClick = () => null} = otherFunctions
        return (
          <CellMenu onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
        )
      } else if (row.DATA_LEVEL === 'D') {
        return row.CLIENT_EXPENDITURE_LEVEL_1
      }
      return null
    }
  },
  {
    "resizable": true,
    "width": 150,
    "key": "SUBCONTRACTOR_NAME",
    "name": "Teaming Subcontractor",
    "cellClass": "rdg-editor-cell",
    "editable": true,
    "type": "Autocomplete",
    "editor": ({row, ...others}) => {
      if (row.DATA_LEVEL !== 'A') {
        return <SubcontractorAutocomplete row={row} {...others} />
      }
      return null
    },
    "valueOptions": [],
  },
  {
    "resizable": true,
    "width": 150,
    "key": "BUDGET_QUANTITY",
    "name": "Budget Quantity",
    "editor": ({row, ...others}) => {
      if (row.DATA_LEVEL !== 'A') {
        return <NumberEditor row={row} {...others} />
      }
      return null
    },
    formatter: ({ row, ...rest }) => <NumberFormatterEmpty className={row.DATA_LEVEL === 'B' ? 'heavy' : row.DATA_LEVEL === 'C' ? 'bold' : 'light'} row={row} {...rest} />,
    "cellClass": "rdg-editor-cell",
    "editable": true
  },
  {
    "resizable": true,
    "width": 150,
    "key": "BUDGET_AMOUNT",
    "name": "Budget Amount",
    "cellClass": "rdg-editor-cell",
    "editable": true,
    "editor": ({row, ...others}) => {
      if (row.DATA_LEVEL !== 'A') {
        return <NumberEditor row={row} {...others} />
      }
      return null
    },
    formatter: ({ row, ...rest }) => <NumberFormatterEmpty className={row.DATA_LEVEL === 'B' ? 'heavy' : row.DATA_LEVEL === 'C' ? 'bold' : 'light'} row={row} {...rest} />,
    "type": "Currency"
  },
  {
    "resizable": true,
    "width": 150,
    "key": "BUDGET_DATE",
    "name": "Budget Date",
    "cellClass": "rdg-editor-cell",
    "editable": true,
    "editor": ({row, ...others}) => {
      if (row.DATA_LEVEL !== 'A') {
        return <DateEditor row={row} {...others} />
      }
      return null
    },
    formatter: DateFormatter,
    "type": "Date"
  },
  {
    "resizable": true,
    "width": 150,
    "key": "ADDED_DATE",
    "name": "Created Date",
    "type": "Date",
    formatter: DateFormatter,
  },
  {
    "resizable": true,
    "width": 150,
    "key": "ADDED_BY",
    "name": "Created By"
  },
  {
    "resizable": true,
    "width": 150,
    "key": "UPDATED_DATE",
    "name": "Last Updated Date",
    "type": "Date",
    formatter: DateFormatter,
  },
  {
    "resizable": true,
    "width": 150,
    "key": "UPDATED_BY",
    "name": "Last Updated By"
  },
  {
    "resizable": true,
    "width": 150,
    "key": "SYSTEM_UPDATED_DATE",
    "name": "System Updated Date",
    "type": "Date",
    formatter: DateFormatter,
  }
]

export const NEW_ROW = ({
  BUDGET_ID, PROJECT_ID, TASK_ID, BUDEGET_TASK_ID, ORACLE_APPR_REV_BUDGET_AMT, CURRENCY, 
}) => ({
  BUDGET_ID,
  PROJECT_ID,
  TASK_ID,
  BUDEGET_TASK_ID,
  ORACLE_APPR_REV_BUDGET_AMT,
  CURRENCY,
  PROJECT_NUMBER_ED: null,
  TASK_NUMBER_ED: null,
  CLIENT_EXPENDITURE_LEVEL_1: null,
  CLIENT_EXPENDITURE_LEVEL_2: null,
  SUBCONTRACTOR_ID: null,
  SUBCONTRACTOR_NAME: null,
  BUDGET_QUANTITY: null,
  BUDGET_AMOUNT: null,
  BUDGET_DATE: null
})

export const formSaveData = (data, udfcolumns, moduleId) => {
  const saveData = data.map(d => {
    const udfData= udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      udF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      savE_MODE: 'I',
      modulE_ID: moduleId,
      udF_ID: UDF_ID
    }))
    return ({
      "budgeT_ID": d.BUDGET_ID || null,
      "projecT_ID": d.PROJECT_ID || null,
      "tasK_ID": d.TASK_ID || null,
      "budegeT_TASK_ID": d.BUDEGET_TASK_ID || null,
      "budegeT_EXPENDITURE1_ID": d.BUDEGET_EXPENDITURE1_ID || null,
      "budegeT_EXPENDITURE2_ID": d.BUDEGET_EXPENDITURE2_ID || null,
      "oraclE_APPR_REV_BUDGET_AMT": d.ORACLE_APPR_REV_BUDGET_AMT || 0,
      "currency": d.CURRENCY || null,
      "projecT_NUMBER_ED": d.PROJECT_NUMBER_ED || null,
      "tasK_NUMBER_ED": d.TASK_NUMBER_ED || null,
      "clienT_EXPENDITURE_LEVEL_1": d.CLIENT_EXPENDITURE_LEVEL_1 || null,
      "clienT_EXPENDITURE_LEVEL_2": d.CLIENT_EXPENDITURE_LEVEL_2 || null,
      "subcontractoR_ID": d.SUBCONTRACTOR_ID || null,
      "subcontractoR_NAME": d.SUBCONTRACTOR_NAME || null,
      "budgeT_QUANTITY": d.BUDGET_QUANTITY || 0,
      "budgeT_AMOUNT": d.BUDGET_AMOUNT || 0,
      "budgeT_DATE": d.BUDGET_DATE || null,
      "savE_MODE": d.SAVE_MODE || null,
      "datA_LEVEL": d.DATA_LEVEL || null,
      "modulE_ID": 4,
      ...(d.DATA_LEVEL === 'A' ? { "budgetudf": udfData} : {}),
      ...(d.DATA_LEVEL === 'B' ? { "budgettaskudf": udfData} : {}),
      ...(d.DATA_LEVEL === 'C' ? { "budgetexpenditurE1UDF": udfData} : {}),
      ...(d.DATA_LEVEL === 'D' ? { "budgetexpenditurE2UDF": udfData} : {}),
    })
  })
  return saveData
}
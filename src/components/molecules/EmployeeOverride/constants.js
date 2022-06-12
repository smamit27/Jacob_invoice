import { array, object, string } from 'yup';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import AutoCompleteEditor from "../../atoms/Editors/AutoCompleteEditor";
import DateEditor from "../../atoms/Editors/DateEditor";
import NumberEditor from "../../atoms/Editors/NumberEditor";
import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import SelectEditor from '../../atoms/Editors/SelectEditor'
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector'
import AutoCompleteEditorCustom from './AutoCompleteEditorCustom';
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import NumberFormatterEmpty from '../../atoms/Formatters/NumberFormatterEmpty';

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
    "key":"EMPLOYEE_NAME",
    "name":"Employee Name",
    frozen: true,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      const { onExpand = () => null } = otherFunctions
      if (row.level === 2) {
        return null
      }
      if (row.FLAG_IS === 'Y') {
        return (
          <span className="rdg-row-expander-container" onClick={() => onExpand(row)}>
            <span className='rdg-row-expander' >
              {!row.isExpanded ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/> }
            </span>
            <span>{row.EMPLOYEE_NAME}</span>
          </span>
        )
      }
      return (
        <div>
          <span>{row.EMPLOYEE_NAME}</span>
        </div>
      )
    }
  },
  {
    resizable: true,
    "width":150,
    "key":"BILLING_TITLE_CODE",
    "name":"Billing Title Code (Power Invoice)",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <SelectEditor {...others} row={row} />,
    "cellClass": "rdg-editor-cell",
    "valueOptions": [],
    formatter: ({ row, column }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : (row[column?.key] || null)
  },
  {
    resizable: true,
    "width":150,
    "key":"BILLING_TITLE_DESC",
    "name":"Billing Title Description (Power Invoice)",
    formatter: ({ row, column }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : (row[column?.key] || null)
  },
  {
    resizable: true,
    "width":100,
    "key":"LEVEL",
    "name":"Level",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <SelectEditor {...others} row={row} />,
    "cellClass": "rdg-editor-cell",
    "valueOptions": [],
    "formatter": ({ row, otherFunctions,  ...others}) => {
      const { onCellMenuItemClick = () => null } = otherFunctions
      if (row.FLAG_IS !== 'Y') {
        return (
          <div>
            <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
            <span>{row.LEVEL}</span>
          </div>
        )
      }
      return null
    }
  },
  {
    resizable: true,
    "width":150,
    "key":"LEVEL_NAME",
    "name":"Level Name",
    "cellClass": "rdg-editor-cell",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <AutoCompleteEditorCustom {...others} row={row} />,
    formatter: ({ row, column }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : (row[column?.key] || null)
  },
  {
    resizable: true,
    "width":100,
    "key":"EMPLOYEE_RAW_RATE",
    "name":"EMployee Raw rate (oracle)",
    "format":"Decimal",
    formatter: ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <NumberFormatterEmpty row={row} {...others} />
  },
  {
    resizable: true,
    "width":100,
    "key":"CAPPED_RATE",
    "name":"Capped Rate (Power Invoice)",
    "format":"Decimal",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <NumberEditor {...others} row={row} />,
    "cellClass": "rdg-editor-cell",
    formatter: ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <NumberFormatterEmpty row={row} {...others} />
  },
  {
    resizable: true,
    "width":100,
    "key":"MINIMUM_RATE",
    "name":"Minimum Rate (Power Invoice)",
    "format":"Decimal",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <NumberEditor {...others} row={row} />,
    "cellClass": "rdg-editor-cell",
    formatter: ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <NumberFormatterEmpty row={row} {...others} />
  },
  {
    resizable: true,
    "width":100,
    "key":"CURRENCY",
    "name":"Currency",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <AutoCompleteEditor {...others} row={row} />,
    "valueOptions": [],
    "cellClass": "rdg-editor-cell",
    formatter: ({ row, column }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : (row[column?.key] || null)
  },
  {
    resizable: true,
    "width":150,
    "key":"EFFECTIVE_DATE",
    "name":"Effective Date",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <DateEditor {...others} row={row} />,
    formatter: ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <DateFormatter row={row} {...others} />,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"END_DATE",
    "name":"End Date",
    formatter: ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <DateFormatter row={row} {...others} />,
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <DateEditor minDate={new Date(row.EFFECTIVE_DATE) || ''} row={row}  {...others} />,
    "cellClass": "rdg-editor-cell"
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

export const SEARCH_COLUMNS = [
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
    formatter: CustomRowSelector,
  },
  {
    key: 'EMPLOYEE_NAME',
    'name': 'Name'
  },
  {
    key: 'EMPLOYEE_NUMBER',
    'name': 'Employee #'
  },
  {
    key: 'EMPLOYEE_EMAIL',
    'name': 'Email Address'
  },
  {
    key: 'EMPLOYEE_LOCATION',
    'name': 'HR Location'
  }
]

export const formSaveData = (data, udfcolumns, moduleId, collectionId) => {
  const insertData = []
  const updateData = []
  data.forEach(d => {
    const udfData= udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      UDF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      SAVE_MODE: 'I',
      MODULE_ID: moduleId,
      UDF_ID: UDF_ID,
      COLLECTION_ID: collectionId,
      EOR_ID: d.EOR_ID1
    }))
    const temp = {
      "EOR_ID": d?.EOR_ID1 || 0,
      // "EMPLOYEE_NUMBER": d?.EMPLOYEE_NUMBER || 0,
      "EMPLOYEE_ID": d?.EMPLOYEE_ID || 0,
      // "EMPLOYEE_NAME": d?.EMPLOYEE_NAME || '',
      "BILLING_TITLE_CODE_BTR_ID": d?.BILLING_TITLE_CODE_BTR_ID || 0,
      // "BILLING_TITLE_CODE": d?.BILLING_TITLE_CODE || '',
      "BILLING_TITLE_DESC": d?.BILLING_TITLE_DESC || '',
      "EMPLOYEE_RAW_RATE": Number(d?.EMPLOYEE_RAW_RATE || 0),
      // "LEVEL": d?.LEVEL || '',
      "LEVEL_ID": d?.LEVEL_ID || 0,
      "LEVEL_NAME_ID": d?.LEVEL_NAME_ID || 0,
      // "LEVEL_NAME": d?.LEVEL_NAME || '',
      "CAPPED_RATE": Number(d?.CAPPED_RATE || 0),
      "MINIMUM_RATE": Number(d?.MINIMUM_RATE || 0),
      "CURRENCY": d?.CURRENCY || '',
      "EFFECTIVE_DATE": d?.EFFECTIVE_DATE || '',
      "END_DATE": d?.END_DATE || '',
      "SAVE_MODE": d?.SAVE_MODE,
      "EmployeeUDFList": udfData
    }
    if (d?.SAVE_MODE === 'I') {
      insertData.push(temp)
    } else {
      updateData.push(temp)
    }
  })
  return {
    I: {
      "COLLECTION_ID": collectionId,
      "EmployeeList": insertData
    },
    U: {
      "COLLECTION_ID": collectionId,
      "EmployeeList": updateData
    }
  }
}

export const validateData = array().of(
  object().shape({
    EMPLOYEE_NAME: string().required('EMPLOYEE_NAME').typeError('EMPLOYEE_NAME'),
    EFFECTIVE_DATE: string().required('EFFECTIVE_DATE').typeError('EFFECTIVE_DATE'),
  })
)
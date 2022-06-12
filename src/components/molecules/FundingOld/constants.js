import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import IconButton from '@mui/material/IconButton';
import DateEditor from '../../atoms/Editors/DateEditor';
import TextEditor from '../../atoms/Editors/TextEditor';
import NumberEditor from '../../atoms/Editors/NumberEditor';
import SelectEditor from '../../atoms/Editors/SelectEditor'
import CellMenu from '../../atoms/Editors/CellMenu';
import AddRow from './AddRow';
import AllocateToTaskButton from './AllocateToTaskButton';
import { Button, Icon } from '@mui/material';
import { SelectColumn } from 'react-data-grid';
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import NumberFormatterEmpty from '../../atoms/Formatters/NumberFormatterEmpty';
import TextFilter from '../../atoms/Filters/TextFilter';
// import NumberFilter from '../../atoms/Filters/NumberFilter';
import { errorStatusNotificationAction } from '../StatusNotification/logic';
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector';


export const columns = [
  {
    resizable: true,  
    "width": 150,
      "key": "ORACLE_AGREEMENT_NUMBER",
      "name": "Oracle Agreement Number",
      formatter: ({row, otherFunctions}) => {
        const onClick = () => {
          const { onExpand } = otherFunctions
          if (onExpand && row.INNER_LEVEL_FLAG === 'Y') {
            onExpand(row)
          }
        }
        if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
          return (
            <span className="rdg-row-expander-container" onClick={onClick}>
              <span className='rdg-row-expander' >
                {row.INNER_LEVEL_FLAG ==='Y' ? !row.isExpanded ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/> : null}
              </span>
              <span >{row.ORACLE_AGREEMENT_NUMBER}</span>
            </span>
          )
        }
        return null
      },
      frozen: true,
      filterEditor: TextFilter
  },
  {
    resizable: true,  
    "width": 130,
      "key": "ORACLE_AGREEMENT_AMOUNT_TOTAL",
      "name": "Oracle Agreement Amount Total",
      "type": "Currency",
      formatter: ({ row, ...rest}) => {
        if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
          return <NumberFormatterEmpty row={row} {...rest} />
        }
        return null
      },
      frozen: true,
  },
  {
    resizable: true,  
    "width": 130,
      "key": "PROJECT_NUMBER",
      "name": "Project Number Allocated",
      formatter: ({ row }) => {
        if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
          return row.PROJECT_NUMBER
        }
        return null
      },
      filterEditor: TextFilter,
      frozen: true
  },
  {
    resizable: true,  
    "width": 130,
      "key": "ALLOCATED_AMOUNT",
      "name": "Allocated Amount",
      "type": "Currency",
      formatter: ({ row, ...rest}) => {
        if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
          return <NumberFormatterEmpty row={row} {...rest} />
        }
        return null
      },
  },
  {
    resizable: true,  
    "width": 130,
      "key": "ORACLE_REVENUE_BUDGET",
      "name": "Oracle Approved Revenue Budget",
      "type": "Currency",
      formatter: ({ row, ...rest}) => {
        if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
          return <NumberFormatterEmpty row={row} {...rest} />
        }
        return null
      },
  },
  {
    resizable: true,  
    "width": 130,
    "key": "DELIVERY_ORDER_NUMBER",
    "name": "Delivery Order Number (Oracle)",
    formatter: ({ row }) => {
      if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
        return row.DELIVERY_ORDER_NUMBER
      }
      return null
    },
    filterEditor: TextFilter
  },
  {
    key: 'CURRENCY',
    resizable: true,  
    "width": 100,
    "name": "Currency",
    formatter: ({ row }) => {
      if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
        return row.CURRENCY
      }
      return null
    },
    filterEditor: TextFilter
  },
  {
    resizable: true,  
    "width": 130,
    "key": "CLIENT_CONTRACT_1_SJ_NUMBER",
    "name": "Client Contract 1 (SJ Number)",
    formatter: ({ row }) => {
      if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
        return row.CLIENT_CONTRACT_1_SJ_NUMBER
      }
      return null
    },
    filterEditor: TextFilter
  },
  {
    resizable: true,  
    "width": 130,
    "key": "CLIENT_CONTRACT_2",
    "name": "Client Contract 2 (rename)",
    formatter: ({ row }) => {
      if (row.LEVEL_FLAG === 'B' || row.LEVEL_FLAG === 'A') {
        return row.CLIENT_CONTRACT_2
      }
      return null
    },
    filterEditor: TextFilter
  },
  {
    resizable: true,  
    "width": 130,
      "key": "CLIENT_CONTRACT_DATE_1_AWARD",
      "name": "Client Contract Date 1 (Award Date)",
      "cellClass": "rdg-editor-cell",
      editor: DateEditor,
      formatter: DateFormatter,
  },
  {
    resizable: true,  
    "width": 130,
      "key": "CLIENT_CONTRACT_TYPE_1",
      "name": "Client Contract Type1 (rename)",
      "cellClass": "rdg-editor-cell",
      editor: TextEditor
  },
  {
    resizable: true,  
    "width": 130,
      "key": "CLIENT_FUNDING_DETAILS_1_ACRN",
      "name": "Client Funding Detail (ACRN)",
      "cellClass": "rdg-editor-cell",
      editor: TextEditor
  },
  {
    resizable: true,  
    "width": 130,
      "key": "CLIENT_FUNDING_DETAILS_2_PHASE",
      "name": "Client Funding Detail1 (Phase)",
      "cellClass": "rdg-editor-cell",
      editor: TextEditor
  },
  {
    resizable: true,  
    "width": 130,
      "key": "FUNDING_START_DATE",
      "name": "Start Date",
      "cellClass": "rdg-editor-cell",
      editor: DateEditor,
      formatter: DateFormatter,
  },
  {
    resizable: true,  
    "width": 130,
      "key": "FUNDING_END_DATE",
      "name": "End Date",
      "cellClass": "rdg-editor-cell",
      editor: DateEditor,
      formatter: DateFormatter,
  },
  {
    resizable: true,  
    "width": 130,
      "key": "FUNDING_ALLOCATION_AMOUNT",
      "name": "Allocation Amount",
      "cellClass": "rdg-editor-cell",
      "type": "Currency",
      formatter: NumberFormatterEmpty,
      editor: (({ row, ...props }) => {
        if (row.LEVEL_FLAG === 'B') {
          if (row.INNER_LEVEL_FLAG ==='Y') {
            return <NumberFormatterEmpty row={row} {...props} style={{ padding: '0 8px' }} />
          }
          return <NumberEditor {...props} row={row} />
        }
        return null
      }),
      type: 'Currency',
      hideForDepth: [1, 2]
  },
  {
    resizable: true,  
    "width": 130,
      "key": "FUNDING_ALLOCATION_SUBTOTAL_1",
      "name": "Allocation Subtotal1",
      formatter: (({ row, otherFunctions, ...others }) => {
        const { onCellMenuItemClick = () => null, dispatch } = otherFunctions
        if (row.LEVEL_FLAG === 'B') {
          const onCellMenuItem = (type) => {
            if (row.CLIENT_TASK_GROUP) {
              dispatch(errorStatusNotificationAction({
                message: "Please remove the allocated Client Task Group's.",
                type: 'funding-add-validate'
              }))
              return
            }
            onCellMenuItemClick(type, row, others)
          }
          return (
            <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row', ...(!row?.FUNDING_ALLOCATION_AMOUNT || row?.CLIENT_TASK_GROUP ? { disabled: true } : {}) }]} onCellMenuItemClick={(type) => onCellMenuItem(type)} />
          )
        }
        return <NumberFormatterEmpty row={row} {...others} />
      }),
      "cellClass": "rdg-editor-cell",
      editor: (({ row, ...props }) => {
        if (row.LEVEL_FLAG === 'C') {
          return <NumberEditor {...props} row={row} />
        }
        return null
      }),
      type: 'Currency',
  },
  {
    resizable: true,  
    "width": 180,
      "key": "task_funding_1",
      "name": "Task Funding 1",
      "formatter": AllocateToTaskButton,
      "cellClass": "rdg-editor-cell",
  },
  {
    resizable: true,  
    "width": 130,
      "key": "CLIENT_TASK_GROUP",
      "name": "Client Task Group"
  },
  {
    resizable: true,  
    "width": 130,
      "key": "ALLOW_BILLING_EXCEED_FUNDING",
      "name": "Allow Billing to Exceed Funding",
      editor: SelectEditor,
      "cellClass": "rdg-editor-cell",
      "valueOptions": [{ id: 'Y', description: 'Yes' }, { id: 'N', description: 'No' }],
      formatter: ({ row }) => row.ALLOW_BILLING_EXCEED_FUNDING ? row.ALLOW_BILLING_EXCEED_FUNDING === 'Y' ? 'Yes' : 'No' : ''
  },
  {
    resizable: true,  
    "width": 130,
      "key": "CLIENT_FUNDING_PRIORITY",
      "name": "Client Funding Priority",
      "cellClass": "rdg-editor-cell",
      editor: ({ otherFunctions, column, row, ...rest }) => {
        const { childData } = otherFunctions
        const { parentRowId, tableRowId } = row
        let valueOptions = [1]
        if (childData[parentRowId]) {
          const len = childData[parentRowId]?.length || 0
          valueOptions = Array.from({length: len + 1}, (_, i) => i + 1)
        } else if (childData[tableRowId]) {
          const len = childData[tableRowId]?.length || 0
          valueOptions = Array.from({length: len + 1}, (_, i) => i + 1)
        }
        const col = {
          ...column,
          valueOptions
        }
        return <SelectEditor row={row} column={col} otherFunctions={otherFunctions} {...rest} />
      },
      valueOptions: []
  },
  {
    resizable: true,  
    "width": 130,
      "key": "BILLING_TO_DATE",
      "name": "Billing to Date",
      "cellClass": "rdg-editor-cell",
      editor: NumberEditor,
      type: 'Currency'
  },
  {
    resizable: true,  
    "width": 130,
      "key": "CURRENT_INVOICE",
      "name": "Current Invoice",
      "cellClass": "rdg-editor-cell",
      editor: NumberEditor,
      type: 'Numeric'
  },
  {
    resizable: true,  
    "width": 130,
      "key": "REMAINING_FUNDS",
      "name": "Remaining Funds",
      "cellClass": "rdg-editor-cell",
      editor: NumberEditor,
      type: 'Currency'
  },
  {
    resizable: true,  
    "width": 130,
      "key": "PERCENTAGE_BILLED",
      "name": "% Billed",
      "cellClass": "rdg-editor-cell",
      editor: NumberEditor,
      type: 'Numeric',
      format: 'Percent'
  },
  {
    resizable: true,  
    "width": 130,
      "key": "FUNDING_LIMIT_PERCENTAGE",
      "name": "Funding Limit %",
      "cellClass": "rdg-editor-cell",
      editor: NumberEditor,
      type: 'Numeric',
      format: 'Percent'
  }
]

export const NEW_ROW = {
  CLIENT_CONTRACT_1_SJ_NUMBER: null,
  CLIENT_CONTRACT_2: null,
  CLIENT_CONTRACT_DATE_1_AWARD: null,
  CLIENT_CONTRACT_TYPE_1: null,
  CLIENT_FUNDING_DETAILS_1_ACRN: null,
  CLIENT_FUNDING_DETAILS_2_PHASE: null,
  FUNDING_START_DATE: null,
  FUNDING_END_DATE: null,
  FUNDING_ALLOCATION_AMOUNT: null,
  FUNDING_ALLOCATION_SUBTOTAL_1: null,
  CLIENT_TASK_GROUP: null,
  ALLOW_BILLING_EXCEED_FUNDING: null,
  CLIENT_FUNDING_PRIORITY: null,
  BILLING_TO_DATE: null,
  CURRENT_INVOICE: null,
  REMAINING_FUNDS: null,
  PERCENTAGE_BILLED: null,
  FUNDING_LIMIT_PERCENTAGE: null,
  FUNDING_SOURCE_ID: 0
}

export const formSaveData = (data, udfcolumns, moduleId) => {
  const saveData = data.map(d => {
    const udfData= udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      udF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      savE_MODE: 'I',
      modulE_ID: moduleId,
      udF_ID: UDF_ID
    }))
    return ({
      "agreemenT_ID": d.AGREEMENT_ID || null,
      "projecT_ID": d.PROJECT_ID || null,
      // "collectioN_ID": d.COLLECTION_ID || null,
      "allocatioN_SUBTOT_1_ID": d.ALLOCATION_SUBTOT_1_ID || null,
      "allocatioN_SUBTOT_2_ID": d.ALLOCATION_SUBTOT_2_ID || null,
      "clienT_CONTRACT_1_SJ_NUMBER": d.CLIENT_CONTRACT_1_SJ_NUMBER || null,
      "clienT_CONTRACT_2": d.CLIENT_CONTRACT_2 || null,
      "clienT_CONTRACT_DATE_1_AWARD": d.CLIENT_CONTRACT_DATE_1_AWARD || null,
      "clienT_CONTRACT_TYPE_1": d.CLIENT_CONTRACT_TYPE_1 || null,
      "clienT_FUNDING_DETAILS_1_ACRN": d.CLIENT_FUNDING_DETAILS_1_ACRN || null,
      "clienT_FUNDING_DETAILS_2_PHASE": d.CLIENT_FUNDING_DETAILS_2_PHASE || null,
      "fundinG_START_DATE": d.FUNDING_START_DATE || null,
      "fundinG_END_DATE": d.FUNDING_END_DATE || null,
      "fundinG_ALLOCATION_AMOUNT": d.FUNDING_ALLOCATION_AMOUNT || null,
      "fundinG_ALLOCATION_SUBTOTAL_1": d.FUNDING_ALLOCATION_SUBTOTAL_1 || null,
      "alloW_BILLING_EXCEED_FUNDING": d.ALLOW_BILLING_EXCEED_FUNDING || null,
      "clienT_FUNDING_PRIORITY": d.CLIENT_FUNDING_PRIORITY || null,
      "billinG_TO_DATE": d.BILLING_TO_DATE ? `${d.BILLING_TO_DATE}` : null,
      "currenT_INVOICE": d.CURRENT_INVOICE || null,
      "remaininG_FUNDS": d.REMAINING_FUNDS || null,
      "percentagE_BILLED": d.PERCENTAGE_BILLED || null,
      "fundinG_LIMIT_PERCENTAGE": d.FUNDING_LIMIT_PERCENTAGE || null,
      FUNDING_SOURCE_ID: d.FUNDING_SOURCE_ID || null,
      "savE_MODE": d.SAVE_MODE || null,
      "leveL_FLAG": d.LEVEL_FLAG || null,
      ...(d.LEVEL_FLAG === 'B' ? { "funD_UDF_DATA": udfData} : {}),
      ...(d.LEVEL_FLAG === 'C' ? { "funD_SUB_1_UDF_DATA": udfData} : {}),
    })
  })
  return saveData
}

const mz = [
  {
    "ALLOCATION_SUBTOT_1_ID": 1,
    "ALLOCATION_SUBTOT_2_ID": 1,
    "FUNDING_ID": 1,
    "TASK_GROUP_ID": 1,
    "TASK_GROUP_NAME": "TEST",
    "FUNDING_SOURCE_NAME": "SUBTOTAL2",
    "PERCENTAGE": 30,
    "PRIORITY": 3
  }
]

export const ALLOCATE_COLUMNS = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell",
    sortable: false,
    frozen: false,
    headerRenderer: null,
    formatter: ({ row, ...rest }) => row.CAN_PRORATE ? <CustomRowSelector row={row} {...rest} /> : null,
  },
  {
    resizable: true, 
    "key": "TASK_GROUP_NAME",
    "name": "Client Task Group",
    frozen: false,
    formatter: ({row, otherFunctions}) => {
      const onClick = () => {
        const { onExpand } = otherFunctions
        if (onExpand && row.CAN_EXPAND) {
          onExpand(row)
        }
      }
      if (row.level === 1) {
        return (
          <span className="rdg-row-expander-container" onClick={onClick}>
            {row.CAN_EXPAND && (
              <span className='rdg-row-expander' >
                {!row.IS_EXPANDED ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/>}
              </span>
            )}
            <span >{row.TASK_GROUP_NAME}</span>
          </span>
        )
      }
      return null
    }
  },
  {
    resizable: true,  
    "key": "PERCENTAGE",
    "name": "Percentage",
    "formatter": ({ row }) => !(row.level === 3 && row.IS_GROUP) ? row.PERCENTAGE ? `${row.PERCENTAGE}%` : '' : ''
  },
  {
    resizable: true,  
    "key": "FUNDING_SOURCE_NAME",
    "name": "Funding Source",
    frozen: false
  },
  {
    resizable: true,  
    "key": "PRIORITY",
    "name": "Priority",
  },
  {
    resizable: true,
    "key": "",
    "name": "Task Funding",
    "formatter": ({ row, otherFunctions }) => {
      const { onProrate = () => null } = otherFunctions
      if (row.CAN_PRORATE) {
        return <Button size="small" onClick={() => onProrate(row)} ><a className='allocateToTask'>Prorate</a></Button>
      }
      return null
    }
  },
]

export const PRORATE_COLUMNS = [
  {
    resizable: true, 
    "key": "GROUP_PERCENTAGE_ID",
    "name": "Percentage",
    frozen: false,
    groupFormatter: ({ row }) => {
      const {childRows = []} = row
      const [first = {}] = childRows
      const { PERCENTAGE } = first
      return (
        <div className="full-width">
          {!row.isExpanded ? <IconButton><ArrowRightOutlinedIcon/></IconButton> : <IconButton><ArrowDropDownOutlinedIcon/></IconButton>}
          <span>{PERCENTAGE}%</span>
        </div>
      )
    },
    summaryFormatter({ row }) {
      return <span style={{ ...(row?.total !== 100 ? { color: '#D72850' } : {}) }} className='bold' >Total - {row.total}%</span>;
    }
  },
  {
    resizable: true,  
    "key": "FUNDING_SOURCE_NAME",
    "name": "Funding Source",
    frozen: false
  },
  {
    resizable: true,  
    "key": "PRIORITY",
    "name": "Priority",
    frozen: false
  },
  {
    resizable: false,
    width: 50,
    "key": "",
    "name": "",
    "formatter": ({ row, otherFunctions }) => {
      const { onRowDelete = () => null } = otherFunctions
      return <IconButton onClick={() => onRowDelete(row)} ><i className="lar la-times-circle" /></IconButton>
    }
  },
]


export const dummySource = [{ ID: 10, DESCRIPTION: 'abc, efg, $300' }, { ID: 11, DESCRIPTION: 'abc, efgh, $700' }, { ID: 12, DESCRIPTION: 'xyz, efg, $1000' }, { ID: 13, DESCRIPTION: 'xyz, abc, $8000' }, { ID: 14, DESCRIPTION: 'mno, abc, $12000' }]

export const allocateDummy = [
  {
      "PRIMARY_FUNDING_SOURCE_ID": 18,
      "TASK_GROUP_ID": 323,
      "TASK_GROUP_NAME": "G206",
      "SAVE_MODE": "I",
      "GROUP_PERCENTAGE_ID": 45,
      "IS_PRORATE_YN": "Y",
      "FUNDING_SOURCE_ID": 21,
      "tableRowId": "SSSJEDXOYE",
      "PERCENTAGE": "50",
      "FUNDING_SOURCE_NAME": "lmno, pqr, $500000",
      "PRIORITY": 1
  },
  {
      "PRIMARY_FUNDING_SOURCE_ID": 18,
      "TASK_GROUP_ID": 323,
      "TASK_GROUP_NAME": "G206",
      "SAVE_MODE": "I",
      "GROUP_PERCENTAGE_ID": 45,
      "IS_PRORATE_YN": "Y",
      "FUNDING_SOURCE_ID": 18,
      "tableRowId": "KBVQPYVKDD",
      "PERCENTAGE": "50",
      "FUNDING_SOURCE_NAME": "abcd,+xyz,+$40000",
      "PRIORITY": 2
  },
  {
      "PRIMARY_FUNDING_SOURCE_ID": 18,
      "TASK_GROUP_ID": 323,
      "TASK_GROUP_NAME": "G206",
      "SAVE_MODE": "I",
      "GROUP_PERCENTAGE_ID": 46,
      "IS_PRORATE_YN": "Y",
      "FUNDING_SOURCE_ID": 17,
      "tableRowId": "IIIYNUKMGU",
      "PERCENTAGE": "50",
      "FUNDING_SOURCE_NAME": "efg, hij, $300",
      "PRIORITY": 1
  },
  {
      "TASK_GROUP_NAME": "G207",
      "TASK_GROUP_ID": 324,
      "PRIMARY_FUNDING_SOURCE_ID": 18,
      "FUNDING_SOURCE_ID": 18,
      "IS_PRORATE_YN": "N",
      "FUNDING_SOURCE_NAME": "abcd, xyz, $40000",
      "PERCENTAGE": 100,
      "PRIORITY": 1,
      "GROUP_PERCENTAGE_ID": 1,
      "SAVE_MODE": "I",
      "tableRowId": "VAQTMRKHIR"
  }
]
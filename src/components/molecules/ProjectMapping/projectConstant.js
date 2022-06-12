import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import IconButton from '@mui/material/IconButton';
import DateEditor from '../../atoms/Editors/DateEditor';
import TextEditor from '../../atoms/Editors/TextEditor';
import NumberEditor from '../../atoms/Editors/NumberEditor';
import SelectEditor from '../../atoms/Editors/SelectEditor';
import CheckboxEditor from '../../atoms/Editors/CheckboxEditor';
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import TextFilter from '../../atoms/Filters/TextFilter';
import CheckboxFormatter from '../../atoms/Formatters/CheckboxFormatter';

const projectGroupOptions = []

export const columns = [
  { resizable: true, width: 200, key: 'ALLIANCE_GROUP', name: 'Assign By', frozen: true,
    formatter: ({row, otherFunctions}) => {
      const onClick = () => {
        const { onExpand } = otherFunctions
        if (onExpand && row.IS_GROUP === 'Y') {
          onExpand(row)
        }
      }
      if (row.IS_GROUP !== '') {
        return (
          <span className="rdg-row-expander-container" onClick={onClick}>
            <span className='rdg-row-expander' >
              {row.IS_GROUP ==='Y' ? !row.isExpanded ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/> : null}
            </span>
            <span>{row.ALLIANCE_GROUP}</span>
          </span>
        )
      }
      return null
    },
    filterEditor: TextFilter
  },
  { resizable: true, width: 120, key: 'PROJECT_NUMBER', name: 'Project Number', frozen: true, filterEditor: TextFilter },
  { resizable: true, width: 140, key: 'PROJECT_NAME', name: 'Project Name', frozen: true, filterEditor: TextFilter },
  { resizable: true, width: 70, key: 'AUTO_ADD_PROJECT_COLLECTION', name: 'Auto Add', type: 'Checkbox', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP ==='Y' ? <CheckboxEditor row={row} {...props} /> : null, formatter: ({ row, ...props }) => row.IS_GROUP ==='Y' ? <CheckboxFormatter row={row} {...props} /> : null },
  { resizable: true, width: 200, key: 'PROJECT_LONG_NAME', name: 'Long Name', filterEditor: TextFilter },
  { resizable: true, width: 140, key: 'OPERATING_UNIT', name: 'Operating Unit', filterEditor: TextFilter },
  { resizable: true, width: 140, key: 'ORGANIZATION', name: 'Organization', filterEditor: TextFilter },
  { resizable: true, width: 100, key: 'FEDERAL_FLAG', name: 'Federal Flag' },
  { resizable: true, width: 140, key: 'START_DATE', name: 'Trans Duration Start', type: 'Date' },
  { resizable: true, width: 140, key: 'COMPLETION_DATE', name: 'Trans Duration End', type: 'Date' },
  { resizable: true, width: 140, key: 'STATUS', name: 'Status' },
  { resizable: true, width: 200, key: 'DESCRIPTION', name: 'Description', filterEditor: TextFilter },
  { resizable: true, width: 110, key: 'PROJECT_CURRENCY', name: 'Project Currency', filterEditor: TextFilter },
  { resizable: true, width: 110, key: 'SEC_STATE_CODE', name: 'Sec State Code', filterEditor: TextFilter },
  { resizable: true, width: 140, key: 'CONTRACT_NUMBER', name: 'Contract Number', filterEditor: TextFilter },
  { resizable: true, width: 140, key: 'DELIVERY_ORDER_NUMBER', name: 'Delivery Order Number', filterEditor: TextFilter },
  { resizable: true, width: 140, key: 'CLIENT_PROJ_NO_OVERRIDE', name: 'Client Project Number Override ', type: 'Number', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <TextEditor row={row} {...props} /> : null },
  { resizable: true, width: 140, key: 'CLIENT_PROJ_NAME_OVERRIDE', name: 'Client Project Name Override', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <TextEditor row={row} {...props} /> : null },
  { resizable: true, width: 140, key: 'CLIENT_PROJECT_GROUP', name: 'Client Project Group', type: 'Dropdown', valueOptions: projectGroupOptions, editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <SelectEditor row={row} {...props} /> : null,
    formatter: ({row, column}) => {
      const { valueOptions = [] } = column
      const { description = row[column.key] || '' } = valueOptions.find(d => d.id === row[column.key]) || {}
      return description
    }
  },
  { resizable: true, width: 140, key: 'CLIENT_START_DATE', name: 'Client Start date', type: 'Date', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <DateEditor row={row} {...props} /> : null, formatter: DateFormatter, },
  { resizable: true, width: 140, key: 'CLIENT_END_DATE', name: 'Client End date', type: 'Date', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <DateEditor minDate={new Date(row.CLIENT_START_DATE) || ''} row={row} {...props} /> : null, formatter: DateFormatter, },
  { resizable: true, width: 140, key: 'INVOICE_NUMBER_FORMAT', name: 'Invoice Number Format', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <SelectEditor row={row} {...props} /> : null,
    formatter: ({row, column}) => {
      const { valueOptions = [] } = column
      const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
      return description
    }
  },
  // { resizable: true, width: 140, key: 'PERCENTAGE_FUNDS_USED', name: 'Percentage Funds Used', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <NumberEditor row={row} {...props} /> : null },
  { resizable: true, width: 140, key: 'SJ_NUMBER', name: 'SJ Number', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props }) => row.IS_GROUP !=='Y' ? <NumberEditor row={row} {...props} /> : null },
  { resizable: true, width: 140, key: 'UPDATED_DATE', name: 'Edited Date' },
  { resizable: true, width: 140, key: 'UPDATED_BY', name: 'Edited By' },
]

export const formSaveData = (data, udfcolumns, collectionId) => {
  const saveData = data.map(d => {
    const udfData= udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      collectioN_ID: collectionId,
      projecT_ID: d.PROJECT_ID || 0,
      udF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      savE_MODE: 'I',
      udF_ID: UDF_ID
    }))
    return ({
      projecT_ID: d.PROJECT_ID || 0,
      "alliancE_CODE_1": d.ALLIANCE_CODE_1 || '',
      "alliancE_CODE_2": d.ALLIANCE_CODE_2 || '',
      "alliancE_CODE_3": d.ALLIANCE_CODE_3 || '',
      "autO_ADD_PROJECT_COLLECTION": d.AUTO_ADD_PROJECT_COLLECTION || '',
      clienT_PROJ_NO_OVERRIDE: d.CLIENT_PROJ_NO_OVERRIDE || '',
      clienT_PROJ_NAME_OVERRIDE: d.CLIENT_PROJ_NAME_OVERRIDE || '',
      clienT_PROJECT_GROUP: d.CLIENT_PROJECT_GROUP || null,
      clienT_START_DATE: d.CLIENT_START_DATE || '',
      clienT_END_DATE: d.CLIENT_END_DATE || '',
      invoicE_NUMBER_FORMAT: d.INVOICE_NUMBER_FORMAT || null,
      percentagE_FUNDS_USED: d.PERCENTAGE_FUNDS_USED || null,
      sJ_NUMBER: d.SJ_NUMBER || '',
      savE_MODE: 'U',
      udfData
    })
  })
  return saveData
}

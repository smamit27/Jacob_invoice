import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import AutoCompleteEditor from "../../atoms/Editors/AutoCompleteEditor";
import DateEditor from "../../atoms/Editors/DateEditor";
import NumberEditor from "../../atoms/Editors/NumberEditor";
import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector'
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import TextFilter from '../../atoms/Filters/TextFilter';
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
    "width":150,
    "key":"BILLING_TITLE_CODE",
    "name":"Billing Title Code (Power Invoice)",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'N' && row.level === 1 ? <TextEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    frozen: true,
    filterEditor: TextFilter,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      const { onExpand = () => null, onCellMenuItemClick = () => null } = otherFunctions
      if (row.level === 2) {
        return null
      }
      if (row.FLAG_IS === 'Y') {
        return (
          <span>
            <CellMenu onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
            <span className="rdg-row-expander-container" onClick={() => onExpand(row)}>
              <span className='rdg-row-expander' >
                {!row.isExpanded ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/>}
              </span>
              <span>{row.BILLING_TITLE_CODE}</span>
            </span>
          </span>
        )
      }
      return (
        <span>
          <CellMenu cellMenuOptions={row.FLAG_IS === 'N' ? [{ id: 'add-row', description: 'Insert row' }] : [{ id: 'add-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span className="rdg-row-expander-container">
            <span>{row.BILLING_TITLE_CODE}</span>
          </span>
        </span>
      )
    }
  },
  {
    resizable: true,
    "width":150,
    "key":"BILLING_TITLE_DESC",
    "name":"Billing Title Description (Power Invoice)",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <TextEditor {...others} row={row} />,
    "cellClass": "rdg-editor-cell",
    formatter: ({ row, column }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : (row[column?.key] || null)
  },
  {
    resizable: true,
    "width":100,
    "key":"CLIENT_BILLING_RATE",
    "name":"Client Billing Rate",
    "format":"Decimal",
    "editor": ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <NumberEditor {...others} row={row} />,
    "cellClass": "rdg-editor-cell",
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
    formatter: ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <DateFormatter row={row} {...others} />,
  },
  {
    resizable: true,
    "width":150,
    "key":"ADDED_BY",
    "name":"Created By",
    formatter: ({ row, column }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : (row[column?.key] || null)
  },
  {
    resizable: true,
    "width":150,
    "key":"UPDATED_DATE",
    "name":"Last Updated Date",
    "type":"Date",
    formatter: ({ row, ...others }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : <DateFormatter row={row} {...others} />,
  },
  {
    resizable: true,
    "width":150,
    "key":"UPDATED_BY",
    "name":"Last Updated By",
    formatter: ({ row, column }) => row.FLAG_IS === 'Y' && row.level === 1 ? null : (row[column?.key] || null)
  }
]

export const formSaveData = (data, udfcolumns, moduleId, collectionId) => {
  const insertData = []
  const updateData = []
  data.forEach(d => {
    const udfData= udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      udF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      savE_MODE: 'I',
      modulE_ID: moduleId,
      udF_ID: UDF_ID,
      collectioN_ID: collectionId,
      btR_ID: d.BTR_ID1
    }))
    const temp = {
      "btR_ID": d?.BTR_ID1 || 0,
      "billinG_TITLE_CODE": d?.BILLING_TITLE_CODE || '',
      "billinG_TITLE_DESC": d?.BILLING_TITLE_DESC || '',
      "clienT_BILLING_RATE": `${(d?.CLIENT_BILLING_RATE || '')}`,
      "cappeD_RATE": `${(d?.CAPPED_RATE || '')}`,
      "minimuM_RATE": `${(d?.MINIMUM_RATE || '')}`,
      "currency": d?.CURRENCY || '',
      "effectivE_DATE": d?.EFFECTIVE_DATE || '',
      "enD_DATE": d?.END_DATE || '',
      "savE_MODE": d?.SAVE_MODE,
      "billingUDFData": udfData
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
      "billingData": insertData
    },
    U: {
      "collectioN_ID": collectionId,
      "billingData": updateData
    }
  }
}

export const validateData = (dat) => {
  let val = null
  dat.forEach(d => {
    if (!d.BILLING_TITLE_CODE) {
      val = {
        value: d,
        message: 'BILLING_TITLE_CODE'
      }
      return val
    } else if (!d.BILLING_TITLE_DESC) {
      val = {
        value: d,
        message: 'BILLING_TITLE_DESC'
      }
      return val
    } else if (!d.EFFECTIVE_DATE) {
      val = {
        value: d,
        message: 'EFFECTIVE_DATE'
      }
      return val
    }
  })
  return val
}

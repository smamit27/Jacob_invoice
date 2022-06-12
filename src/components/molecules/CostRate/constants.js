import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { groupBy } from 'lodash';
import IconButton from '@mui/material/IconButton';
import NumberEditor from "../../atoms/Editors/NumberEditor";
import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import SubcontractorAutocomplete from './SubcontractorAutocomplete';
import SubcontractorBTAutocomplete from './SubcontractorBTAutocomplete';
import DateEditor from "../../atoms/Editors/DateEditor";
import AutoCompleteEditor from "../../atoms/Editors/AutoCompleteEditor";
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector';
import NumberFormatterEmpty from '../../atoms/Formatters/NumberFormatterEmpty'

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
    "key":"SUBCONTRACTOR_NAME",
    "name":"Teaming Subcontractor Name",
    frozen: true,
    "cellClass": "rdg-editor-cell",
    "editor": ({ row, ...others }) => row.FLAG_IS !== 'Y' && row.level === 1 ? <SubcontractorAutocomplete {...others} row={row} /> : null,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      const { onExpand = () => null, onCellMenuItemClick = () => null } = otherFunctions
      if (row.level === 2) {
        return null
      }
      if (row.FLAG_IS === 'Y') {
        return (
          <span>
            <CellMenu cellMenuOptions={[{ id: 'add-new-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
            <span className="rdg-row-expander-container" onClick={() => onExpand(row)}>
              <span className='rdg-row-expander' >
                {!row.isExpanded ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/> }
              </span>
              <span>{row.SUBCONTRACTOR_NAME}</span>
            </span>
          </span>
        )
      }
      return (
        <span>
          <CellMenu cellMenuOptions={[{ id: 'add-new-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span className="rdg-row-expander-container">
            <span>{row.SUBCONTRACTOR_NAME}</span>
          </span>
        </span>
      )
    }
  },
  {
    resizable: true,
    "width":130,
    "key":"SUBCONTRACTOR_NUMBER",
    "name":"Subcontractor  Number",
    formatter: ({ otherFunctions, row }) => {
      const onClick = () => {
        const { onPoClick } = otherFunctions
        if (onPoClick) {
          onPoClick(row)
        }
      }
      if (row.level === 1) {
        return (
          <span style={{ textDecoration: "underline",color: "#231EDC" }} className="hand" onClick={onClick} >{row.SUBCONTRACTOR_NUMBER}</span>
        )
      }
      return null
    }
  },
  {
    resizable: true,
    "width":150,
    "key":"SUBCONTRACTOR_BILLING_TITLE_NAME",
    "name":"Subcontractor  billing Title ",
    "editor": SubcontractorBTAutocomplete,
    "editor": ({ row, ...others }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <SubcontractorBTAutocomplete {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "valueOptions": [],
    "formatter": ({ row, otherFunctions,  ...others}) => {
      const { onCellMenuItemClick = () => null } = otherFunctions
      if ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) {
        return (
          <div>
            <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row', disabled: (!row?.SUBCONTRACTOR_NAME?.trim()) }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
            <span>{row.SUBCONTRACTOR_BILLING_TITLE_NAME}</span>
          </div>
        )
      }
      return null
    }
  },
  {
    resizable: true,
    "width":150,
    "key":"EFFECTIVE_START_DATE",
    "name":"Effective Date",
    "editor": ({ row, ...others }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <DateEditor {...others} row={row} /> : null,
    formatter: DateFormatter,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":150,
    "key":"EFFECTIVE_END_DATE",
    "name":"End Date",
    "editor": ({ row, ...props }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <DateEditor minDate={new Date(row.EFFECTIVE_START_DATE) || ''} row={row}  {...props} /> : null,
    formatter: DateFormatter,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"CURRENCY",
    "name":"Currency",
    "editor": ({ row, ...others }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <AutoCompleteEditor {...others} row={row} /> : null,
    "valueOptions": [],
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"COST_RATE",
    "name":"Cost Rate",
    "format":"Decimal",
    formatter: NumberFormatterEmpty,
    "editor": ({ row, ...others }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <NumberEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"OT_COST_RATE",
    "name":"OT Cost Rate",
    "format":"Decimal",
    formatter: NumberFormatterEmpty,
    "editor": ({ row, ...others }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <NumberEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"DT_COST_RATE",
    "name":"DT cost rate",
    "format":"Decimal",
    formatter: NumberFormatterEmpty,
    "editor": ({ row, ...others }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <NumberEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width":100,
    "key":"SDA_COST_RATE",
    "name":"SDA Cost Rate",
    "format":"Decimal",
    formatter: NumberFormatterEmpty,
    "editor": ({ row, ...others }) => ((row.FLAG_IS !== 'Y' && row.level === 1) || row.level === 2) ? <NumberEditor {...others} row={row} /> : null,
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
  },
]

export const formSaveData = (data) => {
  const insertData = []
  const grouping = groupBy(data, 'SUBCONTRACTOR_ID')
  Object.keys(grouping).forEach(z => {
    grouping[z].forEach(d => {
      const temp = {
        "subcontractoR_ID": d.SUBCONTRACTOR_ID || 0,
        "subContractorBillingTitleDetailsList": [
          {
            "infO_SR_NO": d.INFO_SR_NO || 0,
            "subcontractoR_BILLING_TITLE": d.SUBCONTRACTOR_BILLING_TITLE || 0,
            "effectivE_START_DATE": d.EFFECTIVE_START_DATE || '',
            "effectivE_END_DATE": d.EFFECTIVE_END_DATE || "",
            "cosT_RATE": d.COST_RATE || null,
            "oT_COST_RATE": d.OT_COST_RATE || null,
            "dT_COST_RATE": d.DT_COST_RATE || null,
            "sdA_COST_RATE": d.SDA_COST_RATE || null,
            "currency": d.CURRENCY || "",
            "savE_MODE": d?.SAVE_MODE,
          }
        ]
      }
      insertData.push(temp)
    })
  })
  return insertData
}
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import IconButton from '@mui/material/IconButton';
import NumberEditor from "../../atoms/Editors/NumberEditor";
import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import SelectEditor from '../../atoms/Editors/SelectEditor'
import SubcontractorAutocomplete from './SubcontractorAutocomplete';
import SubcontractorBTAutocomplete from './SubcontractorBTAutocomplete';
import BTAutocomplete from './BTAutocomplete';
import ExemptSelectEditor from './ExemptSelectEditor';
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector';

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
    "editor": ({ row, ...others }) => (row.INNER_COUNT <= 1 && row.level === 1) ? <SubcontractorAutocomplete {...others} row={row} /> : null,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      const { onExpand = () => null, onCellMenuItemClick = () => null } = otherFunctions
      if (row.level === 2 || row.level === 3) {
        return null
      }
      if (row.INNER_COUNT > 1) {
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
          <CellMenu cellMenuOptions={row.INNER_COUNT <= 1 ? [{ id: 'add-new-row', description: 'Insert row' }] : [{ id: 'add-new-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span className="rdg-row-expander-container">
            <span>{row.SUBCONTRACTOR_NAME}</span>
          </span>
        </span>
      )
    }
  },
  {
    resizable: true,
    "width":150,
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
    "key":"SUBCONTRACTOR_EMPLOYEE_NAME",
    "name":"Subcontractor Employee name",
    "editor": ({ row, ...others }) => ((row.INNER_COUNT <= 1 && row.level === 1) || row.level === 2) ? <TextEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "formatter": ({ row, otherFunctions,  ...others}) => {
      const { onCellMenuItemClick = () => null } = otherFunctions
      if ((row.INNER_COUNT <= 1 && row.level === 1) || row.level === 2) {
        return (
          <div>
            <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row', disabled: (!row?.SUBCONTRACTOR_NAME?.trim()) }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
            <span>{row.SUBCONTRACTOR_EMPLOYEE_NAME}</span>
          </div>
        )
      }
      return null
    }
  },
  {
    resizable: true,
    "width":100,
    "key":"SUBCONTRACTOR_EMPLOYEE_ID",
    "name":"Subcontractor Employee ID",
    "editor": ({ row, ...others }) => ((row.INNER_COUNT <= 1 && row.level === 1) || row.level === 2) ? <TextEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "formatter": ({ row}) => {
      if ((row.INNER_COUNT <= 1 && row.level === 1) || row.level === 2) {
        return <span>{row.SUBCONTRACTOR_EMPLOYEE_ID}</span>
      }
      return null
    }
  },
  // {
  //   resizable: true,
  //   "width":100,
  //   "key":"level",
  //   "name":"Level",
  // },
  // {
  //   resizable: true,
  //   "width":100,
  //   "key":"EMP_LEVEL_INFO_SR_NO",
  //   "name":"EMP_LEVEL_INFO_SR_NO",
  // },
  {
    resizable: true,
    "width":100,
    "key":"SUBCONTRACTOR_BILLING_TITLE_NAME",
    "name":"Subcontractor  billing Title ",
    "editor": ({ row, ...others }) => ((row.INNER_COUNT <= 1 && row.level === 1) || (row.level === 2 && !row.levelId) || row.level === 3) ? <SubcontractorBTAutocomplete {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "valueOptions": [],
    "formatter": ({ row, otherFunctions,  ...others}) => {
      const { onCellMenuItemClick = () => null } = otherFunctions
      if ((row.INNER_COUNT <= 1 && row.level === 1) || (row.level === 2 && !row.levelId) || row.level === 3) {
        return (
          <div>
            <CellMenu cellMenuOptions={[{ id: 'add-sub-row', description: 'Insert row', disabled: (!row?.SUBCONTRACTOR_EMPLOYEE_ID?.trim() || !row?.SUBCONTRACTOR_EMPLOYEE_NAME?.trim() || !row?.SUBCONTRACTOR_NAME?.trim()) }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
            <span>{row.SUBCONTRACTOR_BILLING_TITLE_NAME}</span>
          </div>
        )
      }
      return null
    }
  },
  {
    resizable: true,
    "width":100,
    "key":"CLIENT_BILLING_TITLE_DESC",
    "name":"Client Billing Title Code",
    "editor": ({ row, ...others }) => ((row.INNER_COUNT <= 1 && row.level === 1) || (row.level === 2 && !row.levelId) || row.level === 3) ? <BTAutocomplete {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "valueOptions": []
  },
  {
    resizable: true,
    "width":100,
    "key":"EXEMPT_DISPLAY",
    "name":"Exempt",
    "editor": ({ row, ...others }) => ((row.INNER_COUNT <= 1 && row.level === 1) || (row.level === 2 && !row.levelId) || row.level === 3) ? <ExemptSelectEditor {...others} row={row} /> : null,
    "cellClass": "rdg-editor-cell",
    "valueOptions": [{ id: 'Y', description: 'Yes' }, { id: 'N', description: 'No' }]
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
  // {
  //   resizable: true,
  //   "width":150,
  //   "key":"UPDATED_BY",
  //   "name":"system updated  date"
  // }
]


export const formSaveData = (data, udfcolumns, moduleId, collectionId) => {
  const insertData = []
  const updateData = []
  data.forEach(d => {
    const temp = {
      "infO_SR_NO": d.INFO_SR_NO || 0,
      "subcontractoR_ID": d.SUBCONTRACTOR_ID || 0,
      "subcontractoR_EMPLOYEE_NAME": d.SUBCONTRACTOR_EMPLOYEE_NAME || '',
      "subcontractoR_EMPLOYEE_ID": d.SUBCONTRACTOR_EMPLOYEE_ID || '',
      "subcontractoR_BILLING_TITLE": d.SUBCONTRACTOR_BILLING_TITLE || null,
      "subcontractoR_BILLING_TITLE_NAME": d.SUBCONTRACTOR_BILLING_TITLE_NAME || '',
      "clienT_BILLING_TITLE": d.CLIENT_BILLING_TITLE || 0,
      "exempT": d.EXEMPT || '',
      "savE_MODE": d?.SAVE_MODE,
      "emP_LEVEL_INFO_SR_NO": d.EMP_LEVEL_INFO_SR_NO || null
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
      "infoData": insertData
    },
    U: {
      "collectioN_ID": collectionId,
      "infoData": updateData
    }
  }
}
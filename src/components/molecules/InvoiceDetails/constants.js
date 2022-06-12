import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import IconButton from '@mui/material/IconButton';
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';
import CheckboxEditor from '../../atoms/Editors/CheckboxEditor';
import CheckboxFormatter from '../../atoms/Formatters/CheckboxFormatter';
import TextEditor from '../../atoms/Editors/TextEditor';
import SelectEditor from '../../atoms/Editors/SelectEditor';
import DateFormatter from '../../atoms/Formatters/DateFormatter';
export const MAIN_GRID_COLUMNS = [
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
    resizable: true, frozen: true,
    "width": 100,
    "key": "CLIENT_INVOICE_NUMBER",
    "name": "Client Invoice number",
    formatter: ({row, otherFunctions}) => {
      const onClick = () => {
        const { onExpand } = otherFunctions
        if (onExpand && row.IS_GROUP === 'Y') {
          onExpand(row)
        }
      }
      if (row.IS_GROUP !== '') {
        return (
          <div className="full-width" onClick={onClick}>
            {row.IS_GROUP ==='Y' ? !row.isExpanded ? <IconButton><ArrowRightOutlinedIcon/></IconButton> : <IconButton><ArrowDropDownOutlinedIcon/></IconButton> : null}
            <span>{row.CLIENT_INVOICE_NUMBER}</span>
          </div>
        )
      }
      return null
    },
    summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) }

  },
  {
    "width": 50, frozen: true,
    "key": "INVOICE_STATUS",
    "name": "invoice status",
  },

  {
    "width": 100, frozen: true,
    "key": "CLIENT_PROJECT_NUMBER",
    "name": "Client Project Number",
  },
  {
    "width": 100, frozen: true,
    "key": "CLIENT_PROJECT_GROUP",
    "name": "Client Project Group",
  },
  {
    "width": 100, frozen: true,
    "key": "FLAGS",
    "name": "Flags",
  },
  {
    "width": 100, frozen: true,
    "key": "CLIENT_TASK_GROUP",
    "name": "Client Task Group",
  }, {
    "width": 100, frozen: true,
    "key": "TASK_NUMBER_OVERRIDE",
    "name": "Client Task Override ",
  }, {
    "width": 100, frozen: true,
    "key": "EXPENDITURE_TYPE",
    "name": "Expenditure Type",
  }, {
    "width": 200,
    "key": "CLIENT_EXPENDITURE_LEVEL_1",
    "name": "Client Expenditure Level 1 ",
    editable: true, "cellClass": "rdg-editor-cell",
  }, {
    "width": 200,
    "key": "ORACLE_PA_DRAFT_INVOICE_NUMBER",
    "name": "Oracle PA Draft Invoice No",
  }, {
    "width": 200,
    "key": "PROJECT_NUMBER",
    "name": "Project Number",
  }, {
    "width": 200,
    "key": "CLIENT_PROJECT_NAME",
    "name": "Client Project Name ",
  }, {
    "width": 200,
    "key": "TASK_NUMBER",
    "name": "Task Number",
  }, {
    "width": 200,
    "key": "TASK_NAME_OVERRIDE",
    "name": "Client Task Name Override ",
  },
  {
    "width": 200,
    "key": "CLIENT_EXPENDITURE_LEVEL_2",
    "name": "Client Expenditure Level 2 ",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    "width": 200,
    "key": "CLIENT_EXPENDITURE_LEVEL_3",
    "name": "Client Expenditure Level 3 ",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    "width": 200,
    "key": "CLIENT_EXPENDITURE_LEVEL_4",
    "name": "Client Expenditure Level 4 ",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    "width": 200,
    "key": "EXPENDITURE_ATTRIBUTE_1",
    "name": "Client Attribute 1 ",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    "width": 200,
    "key": "EXPENDITURE_ATTRIBUTE_2",
    "name": "Client Attribute 2",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    "width": 200,
    "key": "EXPENDITURE_ATTRIBUTE_3",
    "name": "Client Attribute 3 ",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    "width": 200,
    "key": "EXPENDITURE_ATTRIBUTE_4",
    "name": "Client Attribute 4 ",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    "width": 200,
    "key": "EXPENDITURE_ITEM_DATE",
    "name": "expenditure item date",
  }, {
    "width": 200,
    "key": "PA_DATE",
    "name": "pa date ",
  }, {
    "width": 200,
    "key": "EMPLOYEE_NAME",
    "name": "employee name",
  }, {
    "width": 200,
    "key": "EMPLOYEE_NUMBER",
    "name": "employee number    ",
  },
  {
    "width": 200,
    "key": "BILLING_TITLE_CODE",
    "name": "Employee Title Code    ",
    editable: true, "cellClass": "rdg-editor-cell",
  }, {
    "width": 200,
    "key": "BILLING_TITLE_OVERRIDE",
    "name": "Billing Title Override    ",
  }, {
    "width": 200,
    "key": "VENDOR_NAME",
    "name": "vendor name  ",
  }, {
    "width": 200,
    "key": "VENDOR_INVOICE_NUMBER",
    "name": "vendor invoice number",
  }, {
    "width": 200,
    "key": "QUANTITY",
    "name": "quantity",
  }, {
    "width": 200,
    "key": "RAW_AMOUNT",
    "name": "raw amount",
  }, {
    "width": 200,
    "key": "RAW_COST_RATE",
    "name": "raw cost rate ",
  },
  {
    "width": 200,
    "key": "BILL_RATE",
    "name": "bill rate ",
  }, {
    "width": 200,
    "key": "FRINGE_AMOUNT",
    "name": "fringe amount ",
  }, {
    "width": 200,
    "key": "GA_AMOUNT",
    "name": "ga amount",
  }, {
    "width": 200,
    "key": "OVERHEAD_AMOUNT",
    "name": "overhead amount",
  }, {
    "width": 200,
    "key": "PA_BILL_AMOUNT",
    "name": "pa bill amount",
  }, {
    "width": 200,
    "key": "POWER_INVOICE_BILL_AMOUNT",
    "name": "Power Invoice Bill Amount",
  },
  {
    "width": 200,
    "key": "CBR_COMMENTS",
    "name": "cbr comments    ",
    editable: true, "cellClass": "rdg-editor-cell",
  }, {
    "width": 200,
    "key": "PA_DESCRIPTION",
    "name": "pa description",
  }, {
    "width": 200,
    "key": "EMPLOYEE_ORGANIZATION",
    "name": "employee organization",
  }, {
    "width": 200,
    "key": "EMPLOYEE_LOCATION",
    "name": "employee location",
  }, {
    "width": 200,
    "key": "HOME_SITE_FLAG",
    "name": "home site flag",
  }, {
    "width": 200,
    "key": "PROJECT_NAME",
    "name": "project name    ",
  }, {
    "width": 200,
    "key": "TASK_NAME",
    "name": "task name    ",
  }, {
    "width": 200,
    "key": "JOB",
    "name": "Job",
  }, {
    "width": 200,
    "key": "JOB_OVERRIDE",
    "name": "Job Override    ",
  }, {
    "width": 200,
    "key": "VENDOR_ID",
    "name": "vendor id",
  }, {
    "width": 200,
    "key": "VENDOR_NUMBER",
    "name": "vendor number",
  }, {
    "width": 200,
    "key": "EXPENDITURE_CATEGORY",
    "name": "expenditure category",
  }, {
    "width": 200,
    "key": "SOURCE_SYSTEM_CODE",
    "name": "source system code    ",
  }, {
    "width": 200,
    "key": "BILL_THROUGHT_DATE",
    "name": "bill through date    ",
  }, {
    "width": 200,
    "key": "UNIT",
    "name": "unit ",
  }, {
    "width": 200,
    "key": "BURDENDED_COST",
    "name": "burdened cost",
  }, {
    "width": 200,
    "key": "TRIP_ID",
    "name": "Trip ID",
    editable: true, "cellClass": "rdg-editor-cell",

  }, {
    "width": 200,
    "key": "TRIP_PURPOSE",
    "name": "Trip Purpose    ",
  }, {
    "width": 200,
    "key": "TRAVEL_PER_DIEM",
    "name": "travel per diem ",
  },
  {
    "width": 200,
    "key": "CAPPED_RATE",
    "name": "capped rate    ",
    editable: true, "cellClass": "rdg-editor-cell",

  },
  {
    "width": 200,
    "key": "MINIMUM_RATE",
    "name": "minimum rate    ",
    editable: true, "cellClass": "rdg-editor-cell",

  }, {
    "width": 200,
    "key": "RAW_PLUS_FRINGE_AMOUNT",
    "name": "raw plus fringe amount",
  }, {
    "width": 200,
    "key": "ADDITIONAL_BILLING_MARKUP",
    "name": "Additional Billing Markup    ",
  }, {
    "width": 200,
    "key": "HOLD",
    "name": "Hold Type",
  }, {
    "width": 200,
    "key": "BILLABLE",
    "name": "Billable",
  }, {
    "width": 200,
    "key": "CHARGED_PU",
    "name": "charged pu",
  }, {
    "width": 200,
    "key": "COST_MARKET",
    "name": "cost market    ",
  }, {
    "width": 200,
    "key": "STATUS",
    "name": "status",
  }, {
    "width": 200,
    "key": "PO_NUMBER",
    "name": "po number ",
  }, {
    "width": 200,
    "key": "SUBCONTRACTOR_BILLING_CODE",
    "name": "Subcontractor Billing Code",
  }, {
    "width": 200,
    "key": "SUBCONTRACTOR_BILLING_TITLE",
    "name": "Subcontractor Billing Title ",
  }, {
    "width": 200,
    "key": "SUBCONTRACTOR_NAME",
    "name": "Tearm Firm Name (Subcontractor Name)",
  }, {
    "width": 200,
    "key": "SUBCONTRACTOR_NUMBER",
    "name": "Team Firm Number (Subcontractor Number)",
  }, {
    "width": 200,
    "key": "TEAM_SUBCONTRACTOR",
    "name": "Team Sub",
  }, {
    "width": 200,
    "key": "TEAM_EXPENDITURE",
    "name": "Team Expenditure ",
  }, {
    "width": 200,
    "key": "ADDITIONAL_MARKUP",
    "name": "Additional Markup     ",
  }, {
    "width": 200,
    "key": "FUNDING_SOURCE",
    "name": "Funding source",
    editable: true, "cellClass": "rdg-editor-cell",
  },
  {
    resizable: true,
    "width":150,
    "key":"ADDED_DATE",
    "name":"Added Date",
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


export const CHANGE_HISTORY_COLUMNS = [
  { key: 'FIELD_NAME', name: 'Field Name' },
  {
    resizable: true,
    "key": "ORIGINAL_VALUE",
    "name": "ORIGINAL VALUE",
  },
  {
    resizable: true,
    "key": "NEW_VALUE",
    "name": "NEW VALUE"
  },
  {
    resizable: true,
    "key": "OPERATION",
    "name": "OPERATION"
  },
  {
    resizable: true,
    "key": "LAST_UPDATED_BY",
    "name": "LAST UPDATED BY"
  },
  {
    resizable: true,
    "width": 200,
    "key": "LAST_UPDATED_ON",
    "name": "LAST UPDATED ON"
  }
]
export const formSaveData = (data, udfcolumns, moduleId, collectionId) => {
  const insertData = []
  const updateData = []
  data.forEach(d => {
    const temp = {
      "pU_SR_NO": d?.PU_SR_NO || 0,
      "organizatioN_ID": d?.ORGANIZATION_ID,
      "ratE_GROUP_ID": d?.RATE_GROUP_NAME,
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
      "date": insertData
    },
    U: {
      "collectioN_ID": collectionId,
      "data": updateData
    }
  }

}
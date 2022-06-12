
import { IconButton } from "@mui/material"
import * as Yup from 'yup';
import TextEditor from "../../atoms/Editors/TextEditor";
import NumberEditor from "../../atoms/Editors/NumberEditor"
import CellMenu from '../../atoms/Editors/CellMenu'
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
import SelectEditor from '../../atoms/Editors/SelectEditor'
import DateEditor from "../../atoms/Editors/DateEditor";
import DateFormatter from '../../atoms/Formatters/DateFormatter';
import SubcontractorAutocomplete from './SubcontractorAutocomplete';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector';
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';


const summaryRows = [{
  id: 'total_0',
  totalCount: 100,
  name:'Total'
},{
  id: 'total_0',
  totalCount: 100,
  name:'gross'
}];

export const EVENTS_COLUMNS = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell",
    sortable: false,
    frozen: true,
    headerRenderer: null,
    formatter: RowSelectEditor,
  },

  { width: 150, key: 'ORACLE_PA_DRAFT_INVOICE_NUMBER', name: 'EVENT BATCH NUMBER' },
  { width: 150, key: 'BILL_THROUGH_DATE', name: 'EVENT DESCRIPTION' },
  { width: 150, key: 'ORACLE_PA_DRAFT_STATUS', name: 'BILL THROUGH DATE' },
  { width: 150, key: 'PROJECT_MANAGER', name: 'EVENT DATE' },
  { width: 150, key: 'ORACLE_PA_INVOICE_AMOUNT', name: 'CURRENCY' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER', name: 'EVENT BATCH TOTAL' },
  { width: 150, key: 'LAST_CLIENT_INVOICE_NUMBER', name: 'CURRENT CLIENT INVOICE NUMBER' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER0', name: 'FLAGS' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER1', name: 'CREATED DATE' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER2', name: 'CREATED BY' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER3', name: 'LAST UPDATED DATE' },


  {
    width: 30, key: 'edit', name: '', formatter: ({ otherFunctions, row }) => {
      const onClick = (type) => {
        const { onEdit } = otherFunctions;
        if (onEdit) {
          onEdit(row);
        }

      }
      return (
        <IconButton size="small" onClick={() => onClick('edit')} ><i className="la la-pen" /></IconButton>
      )
    }
  }
]

export const eventBasicInputFields = [
  {
    name: 'Select Template',
    id: 'SELECT_TEMPLATE',
    type: 'select',
    options: [{ value: 'invoice1', label: 'invoice1' }],
    disabled: false,
    required: true
  },
  {
    name: 'Billing Period',
    id: 'BILLING_PERIOD',
    type: 'select',
    url:'/GetInvoiceBillingPeriods',
    params: {
      CollectionID:1685,
    },
    disabled: false,
    required: true

  },
  {
    name: 'Billing Through Date',
    id: 'BILLING_THROUGH_DATE',
    type: 'date',
    disabled: false,
    required: true

  },
  {
    name: 'Event Date',
    id: 'EVENT_DATE',
    type: 'date',
    disabled: false,
    required: true


  },
  {
    name: 'Event Description',
    id: 'EVENT_DESCRIPTION',
    type: 'text',
    disabled: false,
    required: true
  },
  {
    name: 'Event Batch Number',
    id: 'MANUAL_EVENT_BATCH_NO',
    type: 'text',
    disabled: true,

  },
]
/* event model section 1 state */
export const inputFieldValues = {
  SELECT_TEMPLATE: [],
  BILLING_PERIOD: [],
  BILLING_THROUGH_DATE: null,
  EVENT_DATE: null,
  EVENT_DESCRIPTION: '',
  MANUAL_EVENT_BATCH_NO: '',
}
/* event model section 1 state */


export const columns = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell",
    sortable: false,
    frozen: true,
    headerRenderer: null,
    formatter: RowSelectEditor,
  },
 
  {
    resizable: true,
    "width":200,
    "key":"PROJECT_NUMBER",
    "name":"Project Number",
    url:'/GetProjectNumbersDetails',
    params: {
      CollectionId:1685,
      SearchString:'',
    },
    frozen: true,
    "cellClass": "rdg-editor-cell",
    "editor": ({ row, ...others }) => <SubcontractorAutocomplete {...others} rowsData={row} />,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      const {onCellMenuItemClick = () => null } = otherFunctions
      return (
        <span>
          <CellMenu cellMenuOptions={ [{ id: 'add-new-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span>  {row?.PROJECT_NUMBER}</span>
          
        </span>
      )
    },
    summaryFormatter: (props) => {
      
    return (
      <div>
         <div className="summaryOne">
        <strong>{props?.row?.name}</strong>
       </div>
       
      </div>  )}
  },
  {
    resizable: true,
    "width": 100,
    "key": "TASK_NUMBER",
    url:'/GetProjectTaskNumberDetails',
    params: {
      CollectionID:1685,
      ProjectID:32918,
      TaskNumber:'',
    },
    "name": "Task Number",
    "cellClass": "rdg-editor-cell",
    "editor": ({ row, ...others }) => <SubcontractorAutocomplete {...others} rowsData={row} />,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      return (
        <span>
          <span>{row?.TASK_NUMBER}</span>
        </span>
      )
    }
  },
  {
    resizable: true,
    "width": 100,
    "key": "ORACLE_EXPENDITURE_TYPE",
    "name": "oracle Expenditure Type",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width": 100,
    "key": "VENDOR_NAME",
    url:'/GetVendorName',
    params: {
      VendorNameSearch:'',
    },
    "name": "Vendor Name",
    "cellClass": "rdg-editor-cell",
    "editor": ({ row, ...others }) => <SubcontractorAutocomplete {...others} rowsData={row} />,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      return (
        <span>
          <span>{row?.VENDOR_NAME}</span>
        </span>
      )
    }
  },
  {
    resizable: true,
    "width": 100,
    "key": "VENDOR_NUMBER",
    url:'/GetVendorNumberDetails',
    params: {
      VendorNumber:'',
    },
    "name": "Vendor Number",
    "cellClass": "rdg-editor-cell",
    // "editor": ({ row, ...others }) => <SubcontractorAutocomplete {...others} rowsData={row} />,
    // "formatter": ({ row, otherFunctions = {}, ...others }) => {
    //   return (
    //     <span>
    //       <span>{row?.VENDOR_NUMBER}</span>
    //     </span>
    //   )
    // }
  },
  {
    resizable: true,
    "width": 100,
    "key": "PO_NUMBER",
    url:'/GetPoNumberDetails',
    params: {
      CollectionID:1685,
      PoNumber:'',
    },
    "name": "PO Number",
    "cellClass": "rdg-editor-cell",
    "editor": ({ row, ...others }) => <SubcontractorAutocomplete {...others} rowsData={row} />,
    "formatter": ({ row, otherFunctions = {}, ...others }) => {
      return (
        <span>
          <span>{row?.PO_NUMBER}</span>
        </span>
      )
    }
  },
  {
    resizable: true,
    "width": 100,
    "key": "VENDOR_INVOICE_NUMBER",
    "name": "Vendor Invoice Number",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width": 100,
    "key": "ITEM_DATE",
    "name": "Item Date",
    "cellClass": "rdg-editor-cell",
    "editor": DateEditor,
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width": 100,
    "key": "QTY",
    "name": "QTY",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width": 100,
    "key": "CURRENCY",
    "name": "Currency",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width": 100,
    "key": "INVOICE_AMOUNT",
    "name": "Invoice Amount",
    "cellClass": "rdg-editor-cell",
    type:'Currency',
    editor: NumberEditor,
    formatter: NumberFormatter,
    summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
  },
  {
    resizable: true,
    "width": 100,
    "key": "LINE_ITEM_DESCRIPTION",
    "name": "Line Item Description",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },

]


export const columns1 = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell",
    sortable: false,
    frozen: true,
    headerRenderer: null,
    formatter: RowSelectEditor,
  },
  
  {
    resizable: true,
    "width": 150,
    "key": "TRIP_NUMBER",
    "name": "Trip Number",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
    frozen: true,
    "formatter": ({ row, otherFunctions, ...others }) => {
      const { onCellMenuItemClick = () => null } = otherFunctions
      return (
        <span>
          <CellMenu cellMenuOptions={[{ id: 'add-row', description: 'Insert row' }]} onCellMenuItemClick={(type) => onCellMenuItemClick(type, row, others)} />
          <span>{row.TRIP_NUMBER}</span>
        </span>
      )
    }
  },

  {
    resizable: true,
    "width": 150,
    "key": "FROM_DESTINATION",
    "name": "From Destination",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width": 150,
    "key": "TO_DESTINATION",
    "name": "To Destination",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width": 150,
    "key": "FROM_DATE",
    "name": "From Date",
    "editor": DateEditor,
    formatter: DateFormatter,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width": 150,
    "key": "TO_DATE",
    "name": "To Date",
    formatter: DateFormatter,
    "editor": ({ row, ...props }) => <DateEditor minDate={new Date(row.FROM_DATE) || ''} row={row}  {...props} />,
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "width": 150,
    "key": "TRAVEL_PURPOSE",
    "name": "Travel Purpose",
    "cellClass": "rdg-editor-cell",
    editor: TextEditor,
  },
  {
    resizable: true,
    "width": 150,
    "key": "ADDED_DATE",
    "name": "Created Date",
    formatter: DateFormatter,
    "type": "Date"
  },
  {
    resizable: true,
    "width": 150,
    "key": "ADDED_BY",
    "name": "Created By"
  },
  {
    resizable: true,
    "width": 150,
    "key": "UPDATED_DATE",
    "name": "Last Updated Date",
    "type": "Date",
    formatter: DateFormatter,
  },
  {
    resizable: true,
    "width": 150,
    "key": "UPDATED_BY",
    "name": "Last Updated By"
  }
]
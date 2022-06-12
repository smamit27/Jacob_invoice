
import { IconButton } from "@mui/material"
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'

export const INVOICE_HOME_COLUMNS = [
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
    width: 150, key: 'CLIENT_DELIVERY_ORDER_NO', name: 'CLIENT DELIVERY ORDER NO', frozen: true
  },
  { width: 150, key: 'PROJECT_NUMBER', name: 'PROJECT NUMBER', frozen: true },
  { width: 150, key: 'FLAGS', name: 'FLAGS', },
  { width: 150, key: 'ORACLE_PA_DRAFT_INVOICE_NUMBER', name: 'ORACLE PA DRAFT INVOICE NUMBER' },
  { width: 150, key: 'BILL_THROUGH_DATE', name: 'ORACLE PA BILL THROUGH DATE' },
  { width: 150, key: 'ORACLE_PA_DRAFT_STATUS', name: 'ORACLE PA DRAFT STATUS' },
  { width: 150, key: 'PROJECT_MANAGER', name: 'PROJECT MANAGER (ORACLE)' },
  { width: 150, key: 'ORACLE_PA_INVOICE_AMOUNT', name: 'ORACLE PA INVOICE AMOUNT' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER', name: 'LAST ORACLE AR INVOICE NUMBER' },
  { width: 150, key: 'LAST_CLIENT_INVOICE_NUMBER', name: 'LAST CLIENT INVOICE NUMBER' },
  {
    width: 150, key: 'CURRENT_AR_DRAFT_INVOICE_NO', name: 'CURRENT AR/DRAFT INVOICE NUMBER (ORACLE)', cellClass: "rdg-editor-cell", formatter: ({ otherFunctions, row, column }) => {
      const handleClick = () => {
        const { onInvoiceHomeDetailsClick } = otherFunctions;
        if (onInvoiceHomeDetailsClick) {
          onInvoiceHomeDetailsClick(row);
        }
      }
      return (
        <div onClick={handleClick}>{row[column.key]}</div>
      )
    }
  },
  {
    width: 150, key: 'CURRENT_CLIENT_INVOICE_NUMBER', name: 'CURRENT CLIENT INVOICE NUMBER (POWER INVOICE)', cellClass: "rdg-editor-cell", formatter: ({ otherFunctions, row, column }) => {
      const handleClick = () => {
        const { onInvoiceHomeDetailsClick } = otherFunctions;
        if (onInvoiceHomeDetailsClick) {
          onInvoiceHomeDetailsClick(row);
        }
      }
      return (
        <div onClick={handleClick}>{row[column.key]}</div>
      )
    }
  },
  { width: 150, key: 'LAST_BATCH_NUMBER', name: 'LAST BATCH NUMBER' },
  {
    width: 150, key: 'CURRENT_INVOICE_BATCH_NUMBER', name: 'INVOICE BATCH NUMBER', cellClass: "rdg-editor-cell", formatter: ({ otherFunctions, row, column }) => {
      const handleClick = () => {
        const { onInvoiceHomeDetailsClick } = otherFunctions;
        if (onInvoiceHomeDetailsClick) {
          onInvoiceHomeDetailsClick(row);
        }
      }
      return (
        <div onClick={handleClick}>{row[column.key]}</div>
      )
    }
  },
  {
    width: 150, key: 'CLIENT_INVOICE_DATE', name: 'CLIENT INVOICE DATE (POWER INVOICE)', cellClass: "rdg-editor-cell", formatter: ({ otherFunctions, row, column }) => {
      const handleClick = () => {
        const { onInvoiceHomeDetailsClick } = otherFunctions;
        if (onInvoiceHomeDetailsClick) {
          onInvoiceHomeDetailsClick(row);
        }
      }
      return (
        <div onClick={handleClick}>{row[column.key]}</div>
      )
    }
  },
  {
    width: 150, key: 'BILLING_PERIODS', name: 'POWER INVOICE BILLING PERIOD', cellClass: "rdg-editor-cell", formatter: ({ otherFunctions, row, column }) => {
      const handleClick = () => {
        const { onInvoiceHomeDetailsClick } = otherFunctions;
        if (onInvoiceHomeDetailsClick) {
          onInvoiceHomeDetailsClick(row);
        }
      }
      return (
        <div onClick={handleClick}>{row[column.key]}</div>
      )
    }
  },
  { width: 150, key: 'PROJECT_CURRENCY', name: 'CURRENCY' },
  { width: 150, key: 'ADDED_DATE', name: 'CREATED DATE' },
  { width: 150, key: 'ADDED_BY', name: 'CREATED BY' },
  { width: 150, key: 'UPDATED_DATE', name: 'LAST UPDATED DATE)' },
  { width: 150, key: 'UPDATED_BY', name: 'LAST UPDATED BY' },
  { width: 150, key: 'SYSTEM_UPDATED_DATE', name: 'SYSTEM UPDATED DATE' },
]


export const INVOICE_BATCH_COLUMNS = [
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
    formatter: RowSelectEditor,
  },
  { width: 150, key: 'CURRENT_INVOICE_BATCH_NUMBER', name: 'INVOICE BATCH NUMBER' },
  { width: 150, key: 'BILLING_PERIOD_NAME', name: 'POWER INVOICE BILLING PERIOD' },
  { width: 150, key: 'INVOICE_DATE_CURRENT', name: 'INVOICE DATE', type: "Checkbox" },
  { width: 150, key: 'ORACLE_INVOICE_STATUS_DISPLAY', name: 'ORACLE PA DRAFT STATUS' },
  { width: 150, key: 'IS_POSTED_DISPLAY', name: 'POSTED' },
  { width: 150, key: 'INVOICE_POST_DATE', name: 'POSTED DATE', },
  { width: 150, key: 'ADDED_BY', name: 'CREATED_BY' },
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



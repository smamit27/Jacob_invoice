import { IconButton } from "@mui/material"
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
export const INVOICE_CREATEEVENTS_COLUMNS = [
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
    
      { width: 150, key: 'PROJECT_NUMBER', name: 'PROJECT NUMBER', frozen: true },
      { width: 150, key: 'TASK_NUMBER', name: 'TASK NUMBER', },
      { width: 150, key: 'EVENT_TYPE', name: 'EVENT TYPE' },
      { width: 250, key: 'EVENT_DESCRIPTION', name: 'EVENT DESCRIPTION' },
      { width: 150, key: 'EVENT_DATE', name: 'EVENT DATE' },
      { width: 150, key: 'CURRENCY', name: 'CURRENCY' },
      { width: 150, key: 'EVENT_BILL_AMOUNT', name: 'EVENT BILL AMOUNT' },
      { width: 150, key: 'EVENT_REVENUE_AMOUNT', name: 'EVENT_REVENUE_AMOUNT' },
      { width: 150, key: 'FLAGS', name: 'FLAGS' },        
     
]  
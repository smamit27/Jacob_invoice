
import { IconButton } from "@mui/material"
import * as Yup from 'yup';
import TextEditor from "../../atoms/Editors/TextEditor";
import CellMenu from '../../atoms/Editors/CellMenu'
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
import DateEditor from "../../atoms/Editors/DateEditor";
import DateFormatter from '../../atoms/Formatters/DateFormatter';

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

  { width: 150, key: 'ORACLE_PA_DRAFT_INVOICE_NUMBER', name: 'CALCULATION TYPE' },
  { width: 150, key: 'BILL_THROUGH_DATE', name: 'TEMPLATE NAME' },
  { width: 150, key: 'ORACLE_PA_DRAFT_STATUS', name: 'EVENT CATEGORY' },
  { width: 150, key: 'PROJECT_MANAGER', name: 'ORACLE EVENT TYPE' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER1', name: 'CREATED DATE' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER2', name: 'CREATED BY' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER3', name: 'LAST UPDATED DATE' },
  { width: 150, key: 'LAST_ORACLE_AR_INVOICE_NUMBER4', name: 'LAST UPDATED BY' },


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

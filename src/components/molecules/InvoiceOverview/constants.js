
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';
export const MAIN_GRID_COLUMNS = [
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
  
  {
    resizable: true,
    "width":200,
    "key":"CILENT_DELIVERY_ORDER_NUMBER",
    "name":"Client Delivery Order Number",
    summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) }
    
  },   
  {
    "width":200,
    "key":"PROJECT_GROUP",
    "name":"PROJECT GROUP",
  },
  {
    "width":200,
    "key":"PROJECT_NUMBER",
    "name":"Oracle PA Project Number",
    formatter: ({ otherFunctions, row }) => {
        const onClick = () => {
            const { onProjectInvoiceNumberClick } = otherFunctions
            if (onProjectInvoiceNumberClick) {
              onProjectInvoiceNumberClick(row)
            }
        }
        return (
            <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" onClick={onClick} >{row.PROJECT_NUMBER}</span>
        )
    },
  },
  {
    "width":200,
    "key":"PROJECT_NAME",
    "name":"Project Name",
  },
  {
    resizable: true,
    "width":200,
    "key":"BILLING_PERIOD",
    "name":"Power Invoice Billing Period"
  },  
  {
    resizable: true,
    "width":200,
    "key":"POWER_INVOICE_BILL_AMOUNT",
    "name":"Power Invoice Bill Amount",
    type: 'Currency', 
    formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
    formatter: ({ row }) => {
        
        return (
            <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" >{row.POWER_INVOICE_BILL_AMOUNT}</span>
        )
    },
   
  },
  
  {
    resizable: true,
    "width":200,
    "key":"ORACLE_PA_INVOICE_AMOUNT",
    "name":"Oracle PA Invoice Amount",
    type: 'Currency', 
    formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
    formatter: ({ row }) => {
        
        return (
            <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" >{row.ORACLE_PA_INVOICE_AMOUNT}</span>
        )
    },
   
  },
  {
    resizable: true,
    "width":200,
    "key":"ORACLE_PA_BILLED_PROJECT_TO_DATE",
    "name":"Oracle PA Billed Project to Date",
    type: 'Currency', 
    formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,
    formatter: ({ row }) => {
        
        return (
            <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" >{row.ORACLE_PA_BILLED_PROJECT_TO_DATE}</span>
        )
    },
  },
  {
    resizable: true,
    "width":200,
    "key":"ORACLE_PA_RECEIPT_AMOUNT",
    "name":"ORACLE PA RECIEPT AMOUNT",
  },
  
  {
    resizable: true,
    "width":200,
    "key":"PROJECT_MANAGER_NAME",
    "name":"Project Manager Name",
  },
  {
    resizable: true,
    "width":200,
    "key":"PROJECT_ACCOUNTANT",
    "name":"Project Accountant"
  },
  
  {
    resizable: true,
    "width":200,
    "key":"ORACLE_PA_LAST_RECIEPT_DATE",
    "name":"Oracle PA Last Receipt Date"
  },
  {
    resizable: true,
    "width":200,
    "key":"PROJECT_STATUS",
    "name":"Project Status", 
    formatter: ({ row }) => {
      if(row.PROJECT_STATUS !== '') {
        return (          
          <span style={{ backgroundColor: "#B6B6B6", color: "#222222",borderRadius: "10px",padding:"0px 18px" }} className="hand"  >{row.PROJECT_STATUS}
          </span>
      ) 
      } else {
        return (          
          <span className="hand"  >{row.PROJECT_STATUS}
          </span>
      )
      }
       
    }
  }
]


export const PROJECT_INVOICE_COLUMNS = [
  { width: 150, key: 'CLIENT_DELIVERY_ORDER_NUMBER', name: 'CLIENT DELIVERY ORDER NUMER', frozen: true, 
    summaryFormatter({ row }) { return (<span className="bold">{row?.title || null}</span>) }
  },
  { width: 220, key: 'ORACLE_PA_INVOICE_STATUS', name: 'ORACLE PA INVOICE STATUS',  formatter: ({ row }) => {
        
    return (
        <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" >{row.ORACLE_PA_INVOICE_STATUS}</span>
    )
}, },
  { width: 150, key: 'CLIENT_INVOICE_NUMBER', name: 'CLIENT INVOICE NUMBER' ,  formatter: ({ row }) => {
    return (
        <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" >{row.CLIENT_INVOICE_NUMBER}</span>
    )
}},
  { width: 150, key: 'ORACLE_PA_DRAFT_INVOICE_NUMBER', name: 'ORACLE PA DRAFT INVOICE NUMBER' },
  { width: 230, key: 'ORACLE_AR_INVOICE_NUMBER', name: 'ORACLE AR INVOICE NUMBER' },
  { width: 120, key: 'ORACLE_PA_INVOICE_AMOUNT', name: 'ORACLE PA INVOICE AMOUNT', type: 'Currency', 
  formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />, },
  { width: 150, key: 'ORACLE_PA_RECEIPT_AMOUNT', name: 'ORACLE PA RECIEPT AMOUNT', type: 'Currency', formatter: NumberFormatter, summaryFormatter: (props) => <NumberFormatter {...props} className="bold" />,  },
  { width: 150, key: 'ORACLE_PA_LAST_RECEIPT_DATE', name: 'ORACLE PA LAST RECIEPT DATE', },
  { width: 150, key: 'CLIENT_INVOICE_AND_REPORTS', name: 'CLIENT INVOICE & REPORTS',  formatter: ({ row }) => {
    return (
        <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" >{row.CLIENT_INVOICE_AND_REPORTS}</span>
    )
}},
  { width: 150, key: 'ATTACHMENTS', name: 'ATTACHMENTS' ,  formatter: ({ row }) => {
    return (
        <span style={{ textDecoration: "underline", color: "#22222" }} className="hand" >{row.ATTACHMENTS}</span>
    )
}},
]
export const formSaveData = (data, udfcolumns, moduleId, collectionId) => {
const insertData = []
const updateData =[]
  data.forEach(d => {
    const temp =  {
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
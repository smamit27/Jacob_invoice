import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import IconButton from '@mui/material/IconButton';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import TextEditor from '../../atoms/Editors/TextEditor';
import SelectEditor from '../../atoms/Editors/SelectEditor';
import DateEditor from '../../atoms/Editors/DateEditor';
import RowSelectEditor from '../../atoms/Editors/RowSelectEditor'
import ClientGroupNameAutoComplete from './ClientGroupNameAutoComplete';
import NumberEditor from '../../atoms/Editors/NumberEditor';
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector';
import DateFormatter from '../../atoms/Formatters/DateFormatter';



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
    formatter: ({row,otherFunctions,...rest}) => {
      const {disabled} = otherFunctions
       return  <CustomRowSelector disabled={disabled} {...rest} otherFunctions={otherFunctions} row={row} />
    },
  },
    
   { width: 170, key: 'PROJECT_NAME', name: 'Project Name', frozen: true,
   resizable: true, 
      formatter: ({ row, otherFunctions}) => {
        const onClick = () => {
          const { onExpand } = otherFunctions
          if (onExpand) {
            onExpand(row)
          }
        }
        if (row.IS_GROUP === 'Y') {
          return (
            <span className="rdg-row-expander-container" onClick={onClick}>
              <span className='rdg-row-expander' >
                {row.IS_GROUP ==='Y' ? !row.isExpanded ? <ArrowRightOutlinedIcon/> : <ArrowDropDownOutlinedIcon/> : null}
              </span>
              <span>{row.PROJECT_NAME}</span>
            </span>
          )
        }
        return null
     }
   },
   { width: 150, resizable: true, key: 'OVERRIDE_STATUS_DISPLAY', name: 'Override Status' },
   { width: 150, key: 'TASK_NUMBER', name: 'Task Number (Oracle PA)'},
   { width: 150, key: 'TASK_NAME', name: 'Task Name (Oracle PA)',  },
   { width: 180, key: 'LONG_TASK_NAME', name: 'Long Task Name (Oracle PA)' },
   { width: 150, key: 'BILLABLE_FLAG', name: 'Billable (Oracle PA)',
   formatter: ({ row,}) => {

    if (row.IS_GROUP !== 'Y') {
      return (
        <span className="full-width">
          <span>{row.IS_ORACLE_TASK !== 'Y' ? '' : row.BILLABLE_FLAG === 'Y'? 'YES': 'NO'}</span>
        </span>
      )
    }
    return null
 }},
   { width: 150,resizable: true,  key: 'CHARGEABLE_FLAG', name: 'Chargeable (Oracle PA)',
   formatter: ({ row,}) => {

    if (row.IS_GROUP !== 'Y') {
      return (
        <span className="full-width">
          <span>{row.IS_ORACLE_TASK !== 'Y' ? '' : row.CHARGEABLE_FLAG === 'Y'? 'YES': 'NO'}</span>
        </span>
      )
    }
    return null
 }},
   { width: 150,resizable: true,  key: 'TASK_MANAGER_PERSON_NAME', name: 'Task Manager (Oracle PA)'},
   { width: 150, key: 'TASK_BILL_GROUP_ID', name: 'Task Billing Method', editable: true, "cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => row.IS_GROUP !=='Y' ? <SelectEditor row={row} {...props} />: null,
   formatter: ({ row, column }) => {
       const { valueOptions = [] } = column
       const { description = '' } = valueOptions.find(d => d.id === row[column.key]) || {}
       return description
   }},
   
   { width: 150,resizable: true,  key: 'TASK_GROUP_BUDGET_QUANTITY', name: 'Task Group Budget Quantity',editable:true,"cellClass": "rdg-editor-cell", 
   editor: ({ row, ...props })  => (row.IS_GROUP !=='Y' && row.IS_ORACLE_TASK === 'N') ? <NumberEditor row={row} {...props} />: null,
   formatter: NumberFormatter,
   type: 'Currency',
   "formatter": ({ row }) => {
     if(row.IS_GROUP !=='Y' && (row.IS_ORACLE_TASK === 'Y')) {
      return (
        <div className="task_group_mapping">
          <span >{row.TASK_GROUP_BUDGET_QUANTITY}.</span>
        </div>
      )
     }
     else {
      return (
        <div style={{textAlign:"right"}}>
          <span>{row.TASK_GROUP_BUDGET_QUANTITY}</span>
        </div>
      )
     }
   
   }
   
}, 
   { width: 150,resizable: true,  key: 'TASK_GROUP_BUDGET_AMOUNT', 
   name: 'Task Group Budget Amount',editable:true,"cellClass": "rdg-editor-cell",
   editor: ({ row, ...props })  => (row.IS_GROUP !=='Y' &&  row.IS_ORACLE_TASK === 'N') ? <NumberEditor row={row} {...props} />: null,
   formatter: NumberFormatter,
   type: 'Currency',
   "formatter": ({ row }) => {
    if(row.IS_GROUP !=='Y' && (row.IS_ORACLE_TASK === 'Y' )) {
     return (
       <div className="task_group_mapping">
         <span >{row.TASK_GROUP_BUDGET_AMOUNT}.</span>
       </div>
     )
    } else {
      return (
        <div style={{textAlign:"right"}}>
          <span>{row.TASK_GROUP_BUDGET_AMOUNT}</span>
        </div>
      )
    }

  }
},
{ width: 120,resizable: true,key: 'TASK_BUDGET_QUANTITY', name: 'Task Budget Quantity',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => (row.IS_GROUP !=='Y' && row.IS_ORACLE_TASK === 'Y') ? <NumberEditor row={row} {...props} />: null,
formatter: NumberFormatter,
type: 'Currency',
"formatter": ({ row }) => {
  if(row.IS_GROUP !=='Y' && (row.IS_ORACLE_TASK === 'N')) {
   return (
     <div className="task_group_mapping">
       <span >{row.TASK_BUDGET_QUANTITY}.</span>
     </div>
   )
  }else {
    return (
    <div style={{textAlign:"right"}}>
      <span>{row.TASK_BUDGET_QUANTITY}</span>
    </div>
  )
  }
}
}, 
   { width: 120,resizable: true, key: 'TASK_BUDGET_AMOUNT', name: 'Task Budget Amount',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => (row.IS_GROUP !=='Y' && row.IS_ORACLE_TASK === 'Y') ? <NumberEditor row={row} {...props} />: null,
   formatter: NumberFormatter,
   type: 'Currency',
   "formatter": ({ row }) => {
    if(row.IS_GROUP !=='Y' && (row.IS_ORACLE_TASK === 'N')) {
     return (
       <div className="task_group_mapping">
         <span >{row.TASK_BUDGET_AMOUNT}.</span>
       </div>
     )
    } else {
      return (
        <div style={{textAlign:"right"}}>
          <span >{row.TASK_BUDGET_AMOUNT}</span>
        </div>
      )
    }

  }
  }, 
   { width: 150,resizable: true,  key: 'TASK_NUMBER_OVERRIDE', name: 'Client Task Number Overrides',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => (row.IS_GROUP !=='Y' && row.IS_ORACLE_TASK === 'Y') ? <TextEditor row={row} {...props} />: null}, 
   { width: 150,resizable: true,  key: 'TASK_NAME_OVERRIDE', name: 'Client Task Name Override',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => row.IS_GROUP !=='Y' ? <TextEditor row={row} {...props} />: null},
   { width:150,resizable: true,   key:"CLIENT_TASK_GROUP_NAME","name":"Client Task Group", editable:true,"cellClass": "rdg-editor-cell",
   editor: ({ row, ...others })  => (row.IS_GROUP !=='Y' && row.IS_ORACLE_TASK === 'Y') ? <ClientGroupNameAutoComplete row={row} {...others}  />: null},
  //  { width: 150,resizable: true,  key: 'CLIENT_FIELD_1', name: 'Client Field 1 (Rename Field)',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => row.IS_GROUP !=='Y' ? <TextEditor row={row} {...props} />: null},
   { width: 150,resizable: true,  key: 'ORACLE_PROJECT_CONTRACT_TYPE', name: 'Oracle Project Contract Type', formatter: ({ row }) => row.IS_ORACLE_TASK !== 'Y' ? '' : row.ORACLE_PROJECT_CONTRACT_TYPE},
  //  { width: 150,resizable: true,  key: 'CLIENT_FIELD1_SITE_NAME', name: 'Client Field 1(Site Name)',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => row.IS_GROUP !=='Y' ? <TextEditor row={row} {...props} />: null},
  //  { width: 150,resizable: true,  key: 'CLIENT_FIELD1_SSID_DESC', name: 'Client Field 1(SSID Description) ',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => row.IS_GROUP !=='Y' ? <TextEditor row={row} {...props} />: null},
   { width: 100,resizable: true,  key: 'START_DATE', name: 'Start Date (Oracle PA)' },
   { width: 100,resizable: true,  key: 'END_DATE', name: 'End Date (Oracle PA)' },
   { width: 120,resizable: true,  key: 'CLIENT_START_DATE', name: 'Client Start Date',type: 'Date',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => row.IS_GROUP !=='Y' ? <DateEditor row={row} {...props} />: null,formatter: DateFormatter},
   { width: 120,resizable: true,  key: 'CLIENT_END_DATE', name: 'Client End Date',type: 'Date',editable:true,"cellClass": "rdg-editor-cell", editor: ({ row, ...props })  => row.IS_GROUP !=='Y' ? <DateEditor minDate={new Date(row.CLIENT_START_DATE) || ''} row={row} {...props} />: null,formatter: DateFormatter },
   { width: 100,resizable: true,  key: 'ADDED_BY', name: 'Created By'},
   { width: 100,resizable: true,  key: 'ADDED_DATE', name: 'Created Date'},
   { width: 100,resizable: true,  key: 'UPDATED_BY', name: 'Edited By' },
   { width: 100,resizable: true,  key: 'UPDATED_DATE', name: 'Edited Date'},

]

export const formSaveData = (data, udfcolumns, collectionId) => {
  const saveData = data.map(d => {
    const TaskUdfData = udfcolumns.map(({ UDF_ID, IS_NUM_TEXTBOX_YN }) => ({
      COLLECTION_ID: collectionId,
      PT_UDF_ID: 0,
      TASK_ID: d.TASK_ID,
      PROJECT_ID: d.PROJECT_ID || 0,
      UDF_VALUE: d[UDF_ID] || (IS_NUM_TEXTBOX_YN === 'Y' ? null : ''),
      SAVE_MODE: 'I',
      MODULE_ID: d.MODULE_ID,
      UDF_ID: UDF_ID
    }))
    return ({
      TASK_ID: d.TASK_ID,
      PROJECT_ID: d.PROJECT_ID,
      TASK_NUMBER_OVERRIDE: d.TASK_NUMBER_OVERRIDE,
      TASK_NAME_OVERRIDE: d.TASK_NAME_OVERRIDE,
      TASK_BILL_GROUP_ID: d.TASK_BILL_GROUP_ID,
      CLIENT_TASK_GROUP_ID: d.CLIENT_TASK_GROUP_ID,
      CLIENT_FIELD1_SSID_DESC: d.CLIENT_FIELD1_SSID_DESC,
      CLIENT_FIELD1_SITE_NAME: d.CLIENT_FIELD1_SITE_NAME,
      CLIENT_START_DATE: d.CLIENT_START_DATE,
      CLIENT_END_DATE: d.CLIENT_END_DATE,
      TASK_BILLING_METHOD: d?.TASK_BILLING_METHOD || '',
      TASK_GROUP_BUDGET_QUANTITY: Number(d.TASK_GROUP_BUDGET_QUANTITY) || 0,
      TASK_GROUP_BUDGET_AMOUNT: Number(d.TASK_GROUP_BUDGET_AMOUNT) || 0,
      TASK_BUDGET_QUANTITY: Number(d.TASK_BUDGET_QUANTITY) || 0,
      TASK_BUDGET_AMOUNT: Number(d.TASK_BUDGET_AMOUNT) || 0,
      CLIENT_FIELD_1: d.CLIENT_FIELD_1,
      OVERRIDE_STATUS: d.OVERRIDE_STATUS,
      IS_ORACLE_TASK: d.IS_ORACLE_TASK,
      GROUP_ID_AS_TASK: d.GROUP_ID_AS_TASK,
      SAVE_MODE: d.SAVE_MODE,
      TaskUdfData
    })
  })
  return saveData
}


export const formSaveDataTaskMapping = (data,taskLevel) => {
  const saveDataMapping = data.map(d => {
    return ({  
        TASK_ID: d.TASK_ID || 0,
        PROJECT_ID: d.PROJECT_ID || 0,
        TASK_OVERRIDE: taskLevel === 'Y' ? d.TASK_NUMBER_OVERRIDE_MAPPED || "": d.CLIENT_TASK_GROUP_MAPPED || ""   
    })
  })
  return saveDataMapping
}
export const formSaveDataNameTaskMapping = (data,taskLevel) => {
  const saveDataMapping = data.map(d => {
    return ({  
        TASK_ID: d.TASK_ID || 0,
        PROJECT_ID: d.PROJECT_ID || 0,
        TASK_OVERRIDE: d.TASK_NUMBER_OVERRIDE   
    })
  })
  return saveDataMapping
}
export const formSaveDataNumberTaskMapping = (data) => {
  const saveDataMapping = data.map(d => {
    return ({  
        TASK_ID: d.TASK_ID || 0,
        PROJECT_ID: d.PROJECT_ID || 0,
        TASK_OVERRIDE: d.TASK_NUMBER_OVERRIDE   
    })
  })
  return saveDataMapping
}
export const formSaveDataTaskGrouping = (data) => {
  const saveDataMapping = data.map(d => {
    return ({  
        TASK_ID: d.TASK_ID || 0,
        PROJECT_ID: d.PROJECT_ID || 0,
        TASK_OVERRIDE: d.CLIENT_TASK_GROUP_NAME || ""      
    })
  })
  return saveDataMapping
}

import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { budgetTableAction, saveBudgetTableAction, saveBudgetTableResetAction, budgetTableFlagResetAction, allocateToTaskModalOpenAction, budgetExpenditure2DropdownAction, budgetExpenditure1DropdownAction, budgetExpenditure1DropdownFlagResetAction, budgetExpenditure2DropdownFlagResetAction, budgetSubcontractorDropdownFlagResetAction, budgetSubcontractorDropdownAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader } from '../../atoms'
import AsyncTable from '../../atoms/CustomTable/AsyncTable'
// import TableFilter from '../../atoms/TableFilter'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import {columns} from './constants'
import { apiCall } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { fundingBudgetSummaryModalOpenAction } from '../FundingBudgetSummary/logic'

// export const columns = [
//   {
//     "width": 200,
//     "accessor": "PROJECT_NAME",
//     "Header": "Project (Oracle PA)",
//     "fixed": true,
//     Cell: ({ row, value, onRowExpaned, toggleRowExpanded, ...rest }) => {
//       if (row?.depth === 0) {
//         return (
//           <div className="full-width" onClick={() => onRowExpaned(row)}>
//              <div className="disp-flex vcenter" {...row.getToggleRowExpandedProps()} title={value} >
//                <div className="custom-table-cell-overflow">{value}</div> 
//                {!row.isExpanded ? <IconButton><ArrowDropDownOutlinedIcon/></IconButton> : <IconButton><ArrowDropUpOutlinedIcon/></IconButton> }
//              </div>
//           </div>
//         )
//       }
//       return null
//     },
//   },
//   {
//     "width": 150,
//     "accessor": "ORACLE_APPR_REV_BUDGET_AMT",
//     "Header": "Oracle Approved Revenue Budget",
//     "fixed": true,
//     "type": "Currency"
//   },
//   {
//     "width": 150,
//     "accessor": "TASK_NUMBER",
//     "Header": "Task Number (Oracle PA)"
//   },
//   {
//     "width": 150,
//     "accessor": "TASK_NAME",
//     "Header": "Task Name (Oracle PA)",
//   },
//   {
//     "width": 150,
//     "accessor": "CONTRACT_TYPE",
//     "Header": "Project Contract Type (Oracle PA)"
//   },
//   {
//     "width": 150,
//     "accessor": "TASK_NUMBER_OVERRIDE",
//     "Header": "Client Task Override (Power Invoice)"
//   },
//   {
//     "width": 150,
//     "accessor": "TASK_NAME_OVERRIDE",
//     "Header": "Client Task Name Override (Power Invoice)"
//   },
//   {
//     "width": 150,
//     "accessor": "TASK_BILLING_METHOD",
//     "Header": "Task Billing Method (Power Invoice)"
//   },
//   {
//     "width": 150,
//     "accessor": "CLIENT_TASK_GROUP_ID",
//     "Header": "Client Task Group"
//   },
//   {
//     "width": 150,
//     "accessor": "CURRENCY",
//     "Header": "Currency"
//   },
//   {
//     "width": 150,
//     "accessor": "PROJECT_NUMBER_ED",
//     "Header": "Client Project Number",
//     "editable": true,
//     "type": "Free Text"
//   },
//   {
//     "width": 150,
//     "accessor": "TASK_NUMBER_ED",
//     "Header": "Task Number",
//     "editable": true,
//     "type": "Free Text"
//   },
//   {
//     "width": 150,
//     "accessor": "CLIENT_EXPENDITURE_LEVEL_1",
//     "Header": "Client Expenditure Level 1",
//     "editable": true,
//     "type": "Dropdown",
//     "valueOptions": [],
//     showCellMenu: [1],
//     hideForDepth: [0, 3]
//   },
//   {
//     "width": 150,
//     "accessor": "CLIENT_EXPENDITURE_LEVEL_2",
//     "Header": "Client Expenditure Level 2",
//     "editable": true,
//     "type": "Dropdown",
//     "valueOptions": [],
//     showCellMenu: [2],
//     hideForDepth: [0, 1, 2]
//   },
//   {
//     "width": 150,
//     "accessor": "SUBCONTRACTOR_ID",
//     "Header": "Teaming Subcontractor",
//     "editable": true,
//     "type": "Autocomplete",
//     "valueOptions": [],
//     "apiUrl": "/GetSubContractorsList",
//     "apiParams": {},
//     "apiMethod": "get",
//     "apiSearchKey": "SubContractorName",
//     "responseIdKey": "subcontactoR_ID",
//     "responseDescriptionKey": "subcontractoR_NAME"
//   },
//   {
//     "width": 150,
//     "accessor": "BUDGET_QUANTITY",
//     "Header": "Budget Quantity",
//     "editable": true
//   },
//   {
//     "width": 150,
//     "accessor": "BUDGET_AMOUNT",
//     "Header": "Budget Amount",
//     "editable": true,
//     "type": "Currency"
//   },
//   {
//     "width": 150,
//     "accessor": "BUDGET_DATE",
//     "Header": "Budget Date",
//     "editable": true,
//     "type": "Date"
//   },
//   {
//     "width": 150,
//     "accessor": "ADDED_DATE",
//     "Header": "Created Date",
//     "type": "Date"
//   },
//   {
//     "width": 150,
//     "accessor": "ADDED_BY",
//     "Header": "Created By"
//   },
//   {
//     "width": 150,
//     "accessor": "UPDATED_DATE",
//     "Header": "Last Updated Date",
//     "type": "Date"
//   },
//   {
//     "width": 150,
//     "accessor": "UPDATED_BY",
//     "Header": "Last Updated By"
//   },
//   {
//     "width": 150,
//     "accessor": "SYSTEM_UPDATED_DATE",
//     "Header": "System Updated Date",
//     "type": "Date"
//   }
// ]


const getSubLevelUniqueId = async (url, key) => {
  try {
    const response = await apiCall({
      url
    })
    const [a = {}] = response
    return a[key] || ''
  } catch (error) {
    return ''
  }
}

function Budget(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('budgetTable')
  const { flag: saveBudgetTableFlag, error: saveBudgetTableError } = useSelector(state => state.saveBudgetTable)
  const { flag: expenditure1Flag, data: expenditure1Data } = useSelector(state => state.budgetExpenditure1Dropdown)
  const { flag: expenditure2Flag, data: expenditure2Data } = useSelector(state => state.budgetExpenditure2Dropdown)
  const { flag: subContractorFlag, data: subContractorData } = useSelector(state => state.budgetSubcontractorDropdown)
  const collectionId = useSelector(state => state.getCollectionId)
  const [rowsData, setRowsData] = useState(data || [])
  const [columnsData, setColumnsData] = useState([...columns, ...(props?.udfData || [])])
  // const [searchText, setSearchText] = useState('')
  // const [columnFilter, setColumnFilter] = useState({})
  // const [columnSort, setColumnSort] = useState({})
  // const selectedRows = useRef([])
  const saveData = useRef([])
  useEffect(() => {
    dispatch(budgetTableAction({
      CollectionId: collectionId,
      ModuleId: props.moduleId || 4,
      PageIndex: 0,
      PageSize: 20
    }))
    dispatch(budgetExpenditure2DropdownAction())
    dispatch(budgetExpenditure1DropdownAction())
    // dispatch(budgetSubcontractorDropdownAction({ SubContractorName: '' }))
  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(budgetTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (expenditure1Flag) {
      setColumnsData(columnsData.map(d => d.accessor === 'CLIENT_EXPENDITURE_LEVEL_1' ? {...d, valueOptions: expenditure1Data } : d))
      dispatch(budgetExpenditure1DropdownFlagResetAction())
    }
  }, [expenditure1Flag])

  useEffect(() => {
    if (expenditure2Flag) {
      setColumnsData(columnsData.map(d => d.accessor === 'CLIENT_EXPENDITURE_LEVEL_2' ? {...d, valueOptions: expenditure2Data } : d))
      dispatch(budgetExpenditure2DropdownFlagResetAction())
    }
  }, [expenditure2Flag])

  useEffect(() => {
    if (subContractorFlag) {
      setColumnsData(columnsData.map(d => d.accessor === 'SUBCONTRACTOR_ID' ? {...d, valueOptions: subContractorData.map(y => ({ id: y.subcontactoR_ID, description: y.subcontractoR_NAME })) } : d))
      dispatch(budgetSubcontractorDropdownFlagResetAction())
    }
  }, [subContractorFlag])
  

  useEffect(() => {
    if (saveBudgetTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveBudgetTableResetAction())
    }
  }, [saveBudgetTableError])

  useEffect(() => {
    if (saveBudgetTableFlag) {
      saveData.current = []
      dispatch(saveBudgetTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveBudgetTableFlag])

  // const requestSearch = (searchValue) => {
  //   setSearchText(searchValue);
  // };

  const formChildData = (res) => {
    return res.filter(d => d.DATA_LEVEL === 'B').map(d => {
      const levelC = res.filter(z => z.BUDEGET_TASK_ID === d.BUDEGET_TASK_ID && z.DATA_LEVEL === 'C').map(y => {
        const levelD = res.filter(z => z.BUDEGET_TASK_ID === y.BUDEGET_TASK_ID && z.BUDEGET_EXPENDITURE1_ID === y.BUDEGET_EXPENDITURE1_ID && z.DATA_LEVEL === 'D')
        return ({ ...y, ...(levelD.length ? { expanded: true, subRows: levelD } : {}) })
      })
      return ({ ...d, ...(levelC.length ? { expanded: true, subRows: levelC } : {}) })
    })
  }

  const onRowExpaned = async (val) => {
    if (!val?.subRows?.length) {
      const { original = {} } = val
      const { BUDGET_ID } = original
      try {
        const response = await apiCall({
          method: 'get',
          url: '/GetBudgetLevelList',
          params: {
            CollectionId: collectionId,
            ModuleId: props.moduleId || 4,
            BudgetId: BUDGET_ID,
          }
        })
        const res = formChildData(response)
        const newData = [...rowsData] 
        const [level0 = null] = val?.id.split('.').map(d => parseInt(d))
        if (typeof level0 === 'number') {
          newData[level0] = {
            ...newData[level0],
            subRows: res || []
          }
        }
        setRowsData(newData)
      } catch (error) {
      }
    }
  }

  const onEditData = (rowData, columnData, value, newData, level0, level1) => {
    if (typeof level1 === 'number') {
      const original = newData[level0].subRows[level1]
      const { CP_MAP_SR_NO, COLLECTION_ID, PROJECT_ID, CLIENT_PROJ_NO_OVERRIDE, CLIENT_PROJ_NAME_OVERRIDE, CLIENT_START_DATE_DISPLAY, CLIENT_END_DATE_DISPLAY, GROUP_NAME, CLIENT_PROJECT_GROUP, INVOICE_NUMBER_FORMAT = null, SJ_NUMBER = null, ...others } = original
      const saveTemp = saveData?.current?.filter(d => d.projecT_ID !== PROJECT_ID)
      saveTemp.push({
        cP_MAP_SR_NO: CP_MAP_SR_NO,
        alliancE_CODE: "",
        projecT_ID: PROJECT_ID,
        clienT_PROJ_NO_OVERRIDE: CLIENT_PROJ_NO_OVERRIDE,
        clienT_PROJ_NAME_OVERRIDE: CLIENT_PROJ_NAME_OVERRIDE,
        clienT_PROJECT_GROUP: CLIENT_PROJECT_GROUP,
        clienT_START_DATE: CLIENT_START_DATE_DISPLAY,
        clienT_END_DATE: CLIENT_END_DATE_DISPLAY,
        invoicE_NUMBER_FORMAT: INVOICE_NUMBER_FORMAT,
        sJ_NUMBER: SJ_NUMBER,
        savE_MODE: 'U',
        udfData: props?.udfRawData.map(({ UDF_ID, MODULE_ID }) => ({
          udF_VALUE: original[UDF_ID],
          collectioN_ID: collectionId,
          projecT_ID: PROJECT_ID,
          savE_MODE: 'I',
          modulE_ID: MODULE_ID,
          udF_ID: UDF_ID
        }))
      })
      saveData.current = saveTemp
    }
  }

  const formOtherData = (original = {}) => {
    const otherColumns = {}
    columnsData.forEach(d => {
      if (d.editable) {
        otherColumns[d.accessor]= null
      }
      // else {
      //   otherColumns[d.accessor] = original[d.accessor] || null
      // }
    })
    return otherColumns
  }

  const onCellMenuItemClick = async (type, rowData, columnData) => {
    const { id: rowId = '', original = {} } = rowData
    const { DATA_LEVEL = '', BUDGET_ID, BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID } = original
    // const { id: columnId } = columnData
    const newData = [...rowsData]
    const [level0 = null, level1 = null, level2 = null] = rowId.split('.').map(d => parseInt(d))
    if (DATA_LEVEL === 'C' && typeof level2 === 'number' && typeof level1 === 'number' && typeof level0 === 'number') {
      if (type === 'add-row') {
        const oldRows = newData[level0]?.subRows[level1]?.subRows[level2]?.subRows || []
        const addSubRows = []
        const otherColumns = formOtherData(original)
        if (oldRows?.length) {
          const uniqueId = await getSubLevelUniqueId('/GetBudgetExpd1Seq', 'budegeT_EXPENDITURE2_ID')
          addSubRows.push({ ...otherColumns, BUDGET_ID, BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID, BUDEGET_EXPENDITURE2_ID: uniqueId, DATA_LEVEL: 'D', SAVE_MODE: 'U' })
        } else {
          const uniqueId = await getSubLevelUniqueId('/GetBudgetExpd1Seq', 'budegeT_EXPENDITURE2_ID')
          const unique2Id = await getSubLevelUniqueId('/GetBudgetExpd1Seq', 'budegeT_EXPENDITURE2_ID')
          addSubRows.push({ ...otherColumns, BUDGET_ID, BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID, BUDEGET_EXPENDITURE2_ID: uniqueId, DATA_LEVEL: 'D', SAVE_MODE: 'U' })
          addSubRows.push({ ...otherColumns, BUDGET_ID, BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID, BUDEGET_EXPENDITURE2_ID: unique2Id, DATA_LEVEL: 'D', SAVE_MODE: 'U' })
        }
        newData[level0].subRows[level1].subRows[level2] = {
          ...newData[level0].subRows[level1].subRows[level2],
          expanded: true,
          subRows: [...oldRows, ...addSubRows]
        }
      }
    } else if (DATA_LEVEL === 'B' && typeof level1 === 'number' && typeof level0 === 'number') {
      if (type === 'add-row') {
        const oldRows = newData[level0]?.subRows[level1]?.subRows || []
        const addSubRows = []
        const otherColumns = formOtherData(original)
        // if (oldRows?.length) {
          const uniqueId = await getSubLevelUniqueId('/GetBudgetExpd1Seq', 'budegeT_EXPENDITURE1_ID')
          addSubRows.push({ ...otherColumns, BUDGET_ID, BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID: uniqueId, DATA_LEVEL: 'C', SAVE_MODE: 'U' })
        // }
        // else {
        //   const uniqueId = await getSubLevelUniqueId('/GetBudgetExpd1Seq', 'budegeT_EXPENDITURE1_ID')
        //   const unique2Id = await getSubLevelUniqueId('/GetBudgetExpd1Seq', 'budegeT_EXPENDITURE1_ID')
        //   addSubRows.push({ ...otherColumns, BUDGET_ID, BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID: uniqueId, DATA_LEVEL: 'C', SAVE_MODE: 'U' })
        //   addSubRows.push({ ...otherColumns, BUDGET_ID, BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID: unique2Id, DATA_LEVEL: 'C', SAVE_MODE: 'U' })
        // }
        newData[level0].subRows[level1] = {
          ...newData[level0].subRows[level1],
          expanded: true,
          subRows: [...oldRows, ...addSubRows]
        }
      }
    }
    setRowsData(newData)
    // onEditData(rowData, columnData, value, newData, level0, level1)
  }

  const updateMyData = (rowData, columnData, value, type) => {
    const { id: rowId = '' } = rowData
    const { id: columnId } = columnData
    const newData = [...rowsData]
    const [level0 = null, level1 = null, level2 = null] = rowId.split('.').map(d => parseInt(d))
    if (typeof level2 === 'number' && typeof level1 === 'number' && typeof level0 === 'number') {
      newData[level0].subRows[level1].subRows[level2] = {
        ...newData[level0].subRows[level1].subRows[level2],
        [columnId]: value
      }
    } else if (typeof level1 === 'number' && typeof level0 === 'number') {
      newData[level0].subRows[level1] = {
        ...newData[level0].subRows[level1],
        [columnId]: value
      }
    } else if (typeof level0 === 'number') {
      newData[level0] = {
        ...newData[level0],
        [columnId]: value
      }
    }
    setRowsData(newData)
    onEditData(rowData, columnData, value, newData, level0, level1)
  }

  // const onColumnFilter = (val, type) => {
  //   setColumnFilter({
  //     ...columnFilter,
  //     [type]: val
  //   })
  // }

  // const onColumnSort = (val, type) => {
  //   setColumnSort(val ? {
  //     [type]: val
  //   } : {})
  // }

  // const onRowSelected = (other) => {
  //   selectedRows.current = other
  // }

  const onSave = async () => {
    // dispatch(backDropLoaderOpenAction())
    // dispatch(saveBudgetTableAction())
  }

  const onSummaryView = () => {
    dispatch(fundingBudgetSummaryModalOpenAction())
  }

  const onRefresh = () => {
    dispatch(budgetTableAction({
      CollectionId: collectionId,
      ModuleId: props.moduleId || 4,
      PageIndex: 0,
      PageSize: 20
    }))
    saveData.current = []
  }

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            {/* <TableFilter searchText={searchText} onFilter={(searchValue) => requestSearch(searchValue)} /> */}
            <Button variant="outlined" className={"userDefinedBtn"} onClick={() => dispatch(userDefineFieldsModalOpenAction({ moduleId: props?.moduleId || 5 }))} >User Defined Fields</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <Button variant="contained" color="secondary" onClick={onRefresh} >Refresh</Button>
            <Button variant="contained" color="secondary" onClick={onSummaryView} >Summary View</Button>
            <Button variant="contained" onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        {/* <Loader style={{ height: '70vh', width: '100%' }} loading={loading} error={error} > */}
          <AsyncTable onCellMenuItemClick={onCellMenuItemClick} loading={loading} error={error} columns={columnsData} data={rowsData || []} height='calc(80vh*(9/13))' onRowExpaned={onRowExpaned} updateMyData={updateMyData} />
        {/* </Loader> */}
      </Stack>
    </div>
  )
}

export default memo(Budget)

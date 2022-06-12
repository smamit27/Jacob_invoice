import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  indirectRatesTableAction, saveIndirectRatesTableAction, saveIndirectRatesTableResetAction,
  indirectRatesTableFlagResetAction, 
} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import {columns, formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import {showSearchModal} from "../../../redux/common/action";
import useLazyLoad from '../../../hooks/useLazyLoad'
import EmployeeOverride from './EmployeeOverride'


function BillingIndirectorRates(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('indirectRatesTableReducer')
  const { flag: saveIndirectRatesTableFlag, error: saveIndirectRatesTableError } = useSelector(state => state.saveIndirectRatesTableReducer)
  const { data: currencyOptions } = useSelector(state => state.getCurrency)
  const { data: titleOptions, flag: titleOptionsFlag } = useSelector(state => state.employeeOverrideBillingTitleDropdown)
  const { data: levelOptions, flag: levelOptionsFlag } = useSelector(state => state.employeeOverrideLevelDropdown)
  const { data: employeeOverRideData, flag: employeeOverRideFlag } = useSelector(state => state.saveEmployeeOverrideReducer)

  const collectionId = useSelector(state => state.getCollectionId)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const [columnsData, setColumnsData] = useState(formColumns.map(d => ({ ...d, ...(d.key === 'CURRENCY' ? { valueOptions: currencyOptions } : {}) })))
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [openCopy, setOpenCopy] = useState([])
  const [childData, setChildData] = useState({})
  const [openAddEmployee, setOpenAddEmployee] = useState(false)
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      collectionID: collectionId,
      moduleId: props.moduleId || 13,
      orderBy: 1,
    },
    url: '/GetIndirectRateMainGrid',
    rows: data,
    rowAdditionalData: {
      level: 1
    }
  })

  useEffect(() => { 
    dispatch(indirectRatesTableAction({
      collectionID: collectionId,
      moduleId: props.moduleId || 13,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 1000,
    }))
  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(indirectRatesTableFlagResetAction())
    }
  }, [flag])
useEffect(() => {
  if(employeeOverRideFlag){
    backDropLoaderCloseAction()
  }
}, [employeeOverRideFlag])

  useEffect(() => {
    if (titleOptionsFlag) {
      setColumnsData(columnsData.map((d) => {
        if (d.key === 'BILLING_TITLE_CODE') {
          return ({
            ...d,
            valueOptions: titleOptions
          })
        }
        return d
      }))
    //   dispatch(employeeOverrideBillingTitleDropdownFlagResetAction())
    }
  }, [titleOptionsFlag])

  useEffect(() => {
    if (levelOptionsFlag) {
      setColumnsData(columnsData.map((d) => {
        if (d.key === 'LEVEL') {
          return ({
            ...d,
            valueOptions: levelOptions.map(d => d.description)
          })
        }
        return d
      }))
    //   dispatch(employeeOverrideLevelDropdownFlagResetAction())
    }
  }, [levelOptionsFlag])

  useEffect(() => {
    if (saveIndirectRatesTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveIndirectRatesTableResetAction())
    }
  }, [saveIndirectRatesTableError])

  useEffect(() => {
    if (saveIndirectRatesTableFlag) {
      prevSaveData.current = []
      setSaveData([])
      dispatch(saveIndirectRatesTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveIndirectRatesTableFlag])

  function createSaveData (row, type = '') {
    const oldSaveData = [...prevSaveData.current]
    const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
    const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
    const newSaveData = [
      ...filterData,
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.type || 'U' }] : [])
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }

  async function onCellMenuItemClick(type, row) {
    const { tableRowId, parentRowId, EOR_ID, COLLECTION_ID, EMPLOYEE_NAME, EMPLOYEE_RAW_RATE, PERSON_ID, EMPLOYEE_NUMBER, FLAG_IS, ...rest } = row
    if (type === 'add-row') {
      const newData = [...rowsData]
      let child = {...childData}
      const id = await getUniqueIdFromApi('/GetIndirectRatesSeq', 'IDR_ID')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const tempRow = {
        tableRowId: generateRandomString(), parentRowId: (parentRowId || tableRowId), PERSON_ID, EMPLOYEE_NUMBER, EOR_ID: id, EMPLOYEE_NAME, COLLECTION_ID, BILLING_TITLE_CODE: '', BILLING_TITLE_DESC: '', CURRENCY: '', CLIENT_BILLING_RATE: '', CAPPED_RATE: '', MINIMUM_RATE: '', EFFECTIVE_DATE: null, END_DATE: null, level: 2, EMPLOYEE_RAW_RATE, LEVEL: '', LEVEL_NAME: ''
      }      
      setChildData(child)
      setRowsData(newData)
      createSaveData(tempRow, 'I')
    } else if (type === 'delete-row') {
      try {
        const checkNewlyInsertedRow = saveData.find(d => d.tableRowId === tableRowId)
        if (!checkNewlyInsertedRow || checkNewlyInsertedRow.SAVE_MODE === 'U') {
          await apiCall({
            method: 'DELETE',
            url: '/DeleteEmployeeOverride',
            params: {
              EOR_ID: EOR_ID
            }
          })
        }
    
      } catch (error) {
        
      }
    }
  }



  function rowKeyGetter(row) {
    return row.tableRowId;
  }
 

  function onSelectedRowsChange (val) {
    setSelectedRows(val)
  }

  
  const getChange = async (editedRow, key) => {
    try {
     
        createSaveData(editedRow,"I")
      
    } catch (error) {}
  }

  const onSave = async () => {
    const payload = formSaveData(saveData,props.udfRawData,13, collectionId)
    dispatch(backDropLoaderOpenAction())
    dispatch(saveIndirectRatesTableAction(payload.insertData,collectionId))
  }


  const onRefresh = () => {
    resetFrom()
    setSaveData([])
    prevSaveData.current = []
    dispatch(indirectRatesTableAction({
      collectionID: collectionId,
      moduleId: props.moduleId || 13,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 1000,
    }))
  }

  const onRowsChange = (newRows, ...args) => {
    setRowsData(newRows)
  }

  const onAddEmployee = () => {
    setOpenAddEmployee(true)
  }




  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <Button variant="contained" color="secondary" onClick={onRefresh} >Data Refresh</Button>
            <Button onClick={onAddEmployee} size="small" variant="contained" color="secondary" >Employee Rate Group Override</Button>
            <Button variant="contained" disabled={!saveData?.length} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid
          onScroll={handleScroll}
          otherFunctions={{ onCellMenuItemClick, getChange }}
          rowHeight={40}
          headerRowHeight={60}
          noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: '70vh', position: 'sticky', left: 0 }} />}
          onRowsChange={onRowsChange}
          // onPaste={handlePaste}
          // onFill={handleFill}
          style={{ height: '80vh' }}
          rowKeyGetter={rowKeyGetter}
          selectedRows={selectedRows}
          onSelectedRowsChange={onSelectedRowsChange}
          columns={columnsData}
          rows={rowsData}
        />
      </Stack>     
      {!!openCopy?.length}
      {openAddEmployee && <EmployeeOverride open={openAddEmployee}  onClose={() => setOpenAddEmployee(false)} />}
    </div>
  )
}

export default memo(BillingIndirectorRates)

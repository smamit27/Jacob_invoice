import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { billingFrequencyTableResetAction,billingGridDeleteJacobsAction,billingPeriodsTableAction, saveBillingPeriodsTableAction,billingFrequencyTableAction, saveBillingPeriodsTableResetAction, billingPeriodsTableFlagResetAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import {columns,formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import AlertModal from '../Modal/AlertModal'
// import CopyEntries from './CopyEntries'
import { generateRandomString } from '../../../helpers';
import SetupBilling from './SetupBilling';
import ImportCopyViewOptions from './ImportCopyViewOptions'
import NoDataFound from '../../atoms/NoDataFound'
import useLazyLoad from '../../../hooks/useLazyLoad'


function BillingPeriods(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } =  useIntialSelector("billingPeriodsTable")
  const { flag: saveBillingPeriodsTableFlag, error: saveBillingPeriodsTableError } = useSelector(state => state.saveBillingPeriodsTable)
  const {data: allBillingFrequency,flag: allBillingFrequencyFlag } =  useSelector(state => state.billingFrequencyTableReducer)  
  const collectionId = useSelector(state => state.getCollectionId)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const [columnsData, setColumnsData] = useState(formColumns)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [copyAlert, setCopyAlert] = useState(false)
  const [childData, setChildData] = useState({})
  const [saveData, setSaveData] = useState([]) 
  const [openModal, setOpenModal] = useState('')
  const [open, setOpen] = useState(false);
  const [periods,setPeriods] = useState('')
  const prevSaveData = useRef([])
  const {rowsData, setRowsData, handleScroll} = useLazyLoad({
    params: {
      collectionID: collectionId,
      moduleId: props.moduleId || 14,
      orderBy: 1,
    },
    url: '/GetBillingMainGrid',
    rows: data,
    rowAdditionalData: {
      level: 1
    }
  })
  

  useEffect(() => {
    dispatch(billingFrequencyTableAction())
    dispatch(billingPeriodsTableAction({
      collectionID: collectionId,
      moduleId: props.moduleId || 14,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
    }))

  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(billingPeriodsTableFlagResetAction())
    }
  }, [flag])
  useEffect(() => {
    if (allBillingFrequencyFlag) {
      const allBillingFrequencyOptions = allBillingFrequency.map(d => ({ id: d.SEQ_NUM, description: d.FREQUENCY_NAME }))

     setColumnsData(columnsData.map(d => d.key === 'BILLING_TYPE' ? {...d, valueOptions: allBillingFrequencyOptions } : d))
    ///  dispatch(billingFrequencyTableResetAction())
    }
  }, [allBillingFrequencyFlag])

  useEffect(() => {
    if (saveBillingPeriodsTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveBillingPeriodsTableResetAction())
    }
  }, [saveBillingPeriodsTableError])

  useEffect(() => {
    if (saveBillingPeriodsTableFlag) {
      setSaveData([])
      prevSaveData.current = []
      dispatch(saveBillingPeriodsTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveBillingPeriodsTableFlag]) 
  

  function createSaveData (row, type = '') { 
   if(type === 'billing_import' || type === 'billing_dates' ){
    const oldSaveData = [...prevSaveData.current]
    const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
    const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
    const newSaveData = [
      ...filterData,
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || 'U' }] : [])
    ]
  prevSaveData.current = [...newSaveData]
  setSaveData(newSaveData)

    }
    else {
      const oldSaveData = [...prevSaveData.current]
      const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
      const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
      const newSaveData = [
        ...filterData,
        ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || 'U' }] : [])
      ]
      prevSaveData.current = [...newSaveData]
      setSaveData(newSaveData)

    }
  }

  async function onCellMenuItemClick(type, row) {
    
    const { ROW_NUM, BIP_ID,tableRowId, isExpanded, COLLECTION_ID,BILLING_PERIOD_NAME, BILLING_START_DATE, BILLING_TYPE,BILL_THROUGH_DATE,ADDED_DATE, ADDED_BY, UPDATED_DATE, UPDATED_BY } = row
    if (type === 'add-row') {
      const newData = [...rowsData]
      const id = await getUniqueIdFromApi('/GetBillingPeriodSeq', 'biP_ID')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const childLength = isExpanded && childData[tableRowId] ? childData[tableRowId].length : 0
      const tempRow = {
        tableRowId: generateRandomString(), BIP_ID: id, COLLECTION_ID: collectionId, BILLING_PERIOD_NAME: '', BILLING_START_DATE: '', BILLING_TYPE: '', BILL_THROUGH_DATE: '', FLAG_IS: 'N', level: 1
      }
      createSaveData(tempRow, 'I')
      newData.splice(index + childLength + 1, 0, tempRow)
      setRowsData(newData)
    } else if (type === 'delete-row') {
       
        try{
          const checkNewlyInsertedRow = saveData.find(d => d.tableRowId === tableRowId)
          if (!checkNewlyInsertedRow || checkNewlyInsertedRow.SAVE_MODE === 'U') {
            await apiCall({
              method: 'DELETE',
              url: '/DeleteBillingPeriodsData',
              params: {
                BIP_ID
              }
            })
          }
          const newData = [...rowsData].filter(d => d.tableRowId !== row.tableRowId)
          setRowsData(newData)
          createSaveData(row, 'D')
           
        } catch(error){
            
          }
        }        
    }
  

    function rowKeyGetter(row) {
    return row.tableRowId;
  }
  function handleFill({ columnKey, sourceRow, targetRow }) {
    return { ...targetRow, [columnKey]: sourceRow[columnKey] };
  }

  function onSelectedRowsChange (val) {
    setSelectedRows(val)
  }

  function handlePaste({
    sourceColumnKey,
    sourceRow,
    targetColumnKey,
    targetRow
  }) {
    if (sourceColumnKey !== targetColumnKey) {
      return targetRow;
    }
    return { ...targetRow, [targetColumnKey]: sourceRow[sourceColumnKey] };
  }
  
  const getChange = (editedRow) => {
    createSaveData(editedRow)
  }

  const onSave = async () => {
    let payload;
    if(periods === 'billing_import' || periods === 'billing_dates' ){ 
      payload =  formSaveData(rowsData, props.udfRawData, props.moduleId || 14, collectionId)
    } else {
      payload = formSaveData(saveData, props.udfRawData, props.moduleId || 14, collectionId)
    }
    dispatch(backDropLoaderOpenAction())

    dispatch(saveBillingPeriodsTableAction({CollectionId: collectionId},payload.insertData))
  }

    const handleAssign = (type) => {
        setOpenModal(type)
        setOpen(false)
    } 

  const onRowsChange = (newRows) => {
    setRowsData(newRows)
  }
  const onSaveOptions = (newRows,periods) => {
    setPeriods(periods)
    setRowsData(newRows)
  }
  const onDelete = () => {
    const temp = Array.from(selectedRows)
    const modalData = temp.map(d => rowsData.find(m => m.tableRowId === d)).map(d =>d.BIP_ID).join();
    dispatch(billingGridDeleteJacobsAction({BipID:modalData}))    

  }
  const onAddNewRow = async () => {
    const id = await getUniqueIdFromApi('/GetBillingPeriodSeq', 'BIP_ID')
    const tempRow = {
        tableRowId: generateRandomString(), BIP_ID: id, COLLECTION_ID: collectionId, BILLING_PERIOD_NAME: '', BILLING_START_DATE: '', BILLING_TYPE: '', BILL_THROUGH_DATE: '', FLAG_IS: 'N', level: 1
      }
      createSaveData(tempRow, 'I')
      setRowsData([tempRow])
  }
  const renderNoData = () => (
    <NoDataFound>
      <Stack spacing={3} mt={2.5} alignItems="center" >
        <div>Oops! There  are no billing periods currently! Please add Billing periods.</div>
        <div>
          <Button size="small" onClick={onAddNewRow} variant="contained" color="secondary" sx={{mr: 2}} >Add Row</Button>
          <Button size="small" onClick={() => handleAssign('setup_billing_period')} variant="contained" color="secondary" sx={{mr: 2}}>Setup Billing Periods</Button>
          <Button size="small" onClick={() => handleAssign('import_billing_period')} variant="contained" color="secondary" >Import</Button>
        </div>
      </Stack>
    </NoDataFound>
  )

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            <Button variant="outlined"  className={"userDefinedBtn"} onClick={() => dispatch(userDefineFieldsModalOpenAction({ moduleId: props?.moduleId || 5 }))} >User Defined Fields</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
          <Button disabled={!selectedRows.size} variant="contained" color="secondary" onClick={onDelete} >Delete</Button>
            <Button  variant="contained" color="secondary" onClick={() => handleAssign('setup_billing_period')} >Setup Bill Period</Button>
            <Button  variant="contained" color="secondary" onClick={() => handleAssign('import_billing_period')} >Export/Import</Button>
            <Button variant="contained" disabled={!saveData?.length && periods === ''} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid  onScroll={handleScroll} otherFunctions={{ onCellMenuItemClick, getChange }} rowHeight={40} headerRowHeight={60}  noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataComponent={renderNoData} style={{ position: 'sticky', left: 0,height: 'calc(80vh*(9/13))'  }}/>} 
        onRowsChange={onRowsChange} onPaste={handlePaste} onFill={handleFill}  rowKeyGetter={rowKeyGetter} selectedRows={selectedRows} onSelectedRowsChange={onSelectedRowsChange} columns={columnsData} rows={rowsData} />
      </Stack>
      {copyAlert && (
        <AlertModal open={copyAlert} widthSize="xs" title="Overwriting existing billing periods" onClose={() => setCopyAlert(false)} confirmText="Ok" onConfirm={() => setCopyAlert(false)} >
            You cannot setup a bill period for which an invoice has already processed. Please select a bill through date after 01-JAN-2021. 
</AlertModal>
      )}
      {openModal === 'setup_billing_period' && <SetupBilling open={openModal === 'setup_billing_period'} onClose={() => setOpenModal('')} onSaveOptions={(d,p) => onSaveOptions(d,p)}/>}
      {openModal === 'import_billing_period' && <ImportCopyViewOptions open={openModal === 'import_billing_period'} onClose={() => setOpenModal('')} onSaveOptions={(d,p) => onSaveOptions(d,p)}/>}
    </div>
  )
}

export default memo(BillingPeriods)

import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { puMappingDeleteAction, puMappingTableAction, savePuMappingTableAction,
  rateGroupTableAction, savePuMappingTableResetAction, puMappingTableFlagResetAction,rateGroupTableFlagResetAction} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import {columns,} from './constants'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import useLazyLoad from '../../../hooks/useLazyLoad'
import AlertModal from '../Modal/AlertModal'


function PuMapping(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } =  useIntialSelector("puMappingTableReducer")
  const { data: rateGroupData, flag: rateGroupFlag } = useSelector(state => state.rateGroupTableReducer)
  const { flag: savePuMappingTableFlag, error: savePuMappingTableError } = useSelector(state => state.savePuMappingTable)
  const {flag: deletePuMappingTableFlag,error : deletePuMappingTableError} = useSelector(state =>state.puMappingDelete)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const [columnsData, setColumnsData] = useState(formColumns)
  const collectionId = useSelector(state => state.getCollectionId)
  const [selectedRows, setSelectedRows] = useState([])
  const [childData, setChildData] = useState({})
  const [saveData, setSaveData] = useState([]) 
  const [openModal, setOpenModal] = useState('')
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  const [periods,setPeriods] = useState('')
  const prevSaveData = useRef([])
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      moduleId: props.moduleId || 15,
      orderBy: 1,
    },
    url: '/GetPuMappingData',
    rows: data,
   
  })
  useEffect(() => {
    if (rateGroupFlag) {
      const rateGroupOptions = rateGroupData.map(d => ({ id: d.ID, description: d.Description }))
      setColumnsData(columnsData.map(d => d.key === 'RATE_GROUP_ID' ? {...d, valueOptions: rateGroupOptions } : d))
 
      dispatch(rateGroupTableFlagResetAction())
    }
  }, [rateGroupFlag])
  

  useEffect(() => {
    dispatch(rateGroupTableAction())
    dispatch(puMappingTableAction({
      moduleId: props.moduleId || 15,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
    }))

  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(puMappingTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (savePuMappingTableError || deletePuMappingTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(savePuMappingTableResetAction())
    }
  }, [savePuMappingTableError,deletePuMappingTableError])

  useEffect(() => {
    if (savePuMappingTableFlag) {
      dispatch(backDropLoaderCloseAction())
      prevSaveData.current = []
      setSelectedRows([])
      setSaveData([])
      dispatch(savePuMappingTableResetAction())
    }
  }, [savePuMappingTableFlag]) 
  useEffect(() => {
    if (deletePuMappingTableFlag) {
      prevSaveData.current = []
      setSelectedRows([])
      setSaveData([])
      resetFrom()
      dispatch(backDropLoaderCloseAction())
      dispatch(puMappingTableAction({
        moduleId: props.moduleId || 15,
        orderBy: 1,
        pageIndex: 0,
        pageSize: 20,
      }))
    }
  }, [deletePuMappingTableFlag]) 
  

  function createSaveData (row, type = '') {
      const oldSaveData = [...prevSaveData.current]
      const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
      const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
      const newSaveData = [
        ...filterData,
        ...(type !== 'D' ? [{ ...row, SAVE_MODE: row.SAVE_MODE }] : [])
      ]
      prevSaveData.current = [...newSaveData]
      setSaveData(newSaveData)
  }

  async function onCellMenuItemClick(type, row) {
   
    const {ADDED_BY,ADDED_DATE,COLLECTION_ID, DATE_FROM,DATE_TO,FLAG_IS,ORGANIZATION_ID, PU_DESC,PU_NAME,PU_NUMBER,PU_SR_NO,
            RATE_GROUP_ID,RATE_GROUP_NAME,ROW_NUM,UPDATED_BY,UPDATED_DATE,level,tableRowId} = row
    if (type === 'add-row') {
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const childLength = childData[tableRowId] ? childData[tableRowId].length : 0
      const tempRow = {
        tableRowId: generateRandomString(), 
        ORGANIZATION_ID: ORGANIZATION_ID,
        RATE_GROUP_ID: 6,
        RATE_GROUP_NAME: 'RAW', 
        PU_SR_NO: PU_SR_NO || 0, 
        ADDED_BY: '',
        ADDED_DATE: '',
        DATE_FROM: null,
        DATE_TO: null,
        FLAG_IS: 'TEMP',
        UPDATED_BY: '',
        UPDATED_DATE: null,
        PU_DESC:'',
        PU_NAME:'',
        PU_NUMBER: '',
        SAVE_MODE: 'I'

      }
      createSaveData(tempRow, 'I')
      newData.splice(index + childLength + 1, 0, tempRow)
      setRowsData(newData)
    } else if (type === 'delete-row') {
       
        try{
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

  function onSelectedRowsChange (checked, val) {
    if (checked) {
      const values = [val]
      setSelectedRows([...selectedRows, ...values])
    } else {
      const values = [val]
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }
  
  const getChange = (editedRow) => {
    createSaveData(editedRow)
  }

  const onSave = async () => {
    if(saveData.length > 0){
      const request = saveData.map((d)=>({
        "pU_SR_NO": d?.PU_SR_NO || 0,
        "organizatioN_ID": d?.ORGANIZATION_ID,
        "ratE_GROUP_ID": d?.RATE_GROUP_ID,
        "savE_MODE": d?.SAVE_MODE      
      }))
      dispatch(backDropLoaderOpenAction())
      dispatch(savePuMappingTableAction({
        collectioN_ID: collectionId,
        data: request
      }))       
    }
  }


  const onRowsChange = (newRows) => {
    setRowsData(newRows)
  }
  const onDelete = () => {
    setDeleteModal(false)
    const modalData = selectedRows.map(d => rowsData.find(m => m.tableRowId === d)).map(d =>d.PU_SR_NO).join(',');
    dispatch(puMappingDeleteAction({PuSrNo:modalData}))    

  }
  const disabledRowSelection = rowsData.filter(d=>(d.PU_SR_NO === null || d.PU_SR_NO === 0) && !childData[d.tableRowId]).map(d=>d.tableRowId)


  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
          <Button disabled={!selectedRows.length} variant="contained" color="secondary" onClick={() => setDeleteModal(true)} >Delete</Button>
            <Button variant="contained" disabled={!saveData?.length && periods === ''} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid 
          onScroll={handleScroll}
          otherFunctions={{ onCellMenuItemClick, getChange, onSelectedRowsChange, disabled: disabledRowSelection, selectedRows }}
          headerRowHeight={60}
          rowHeight={40}
          noRowsFallback={<Loader loading={loading} error={error} noData={true}  style={{ height: 200, position: 'sticky', left: 0 }} />} 
          onRowsChange={onRowsChange}
          style={{ height: '60vh' }}
          rowKeyGetter={rowKeyGetter}
          columns={columnsData}
          rows={loading ? [] : rowsData}
        />
        {deleteModal && (
          <AlertModal title="Delete selected user record's" open={deleteModal} onConfirm={onDelete} onClose={() => setDeleteModal(false)} >
            Are you sure that you want delete the selected record's and all the unsaved changes will be reverted ?
          </AlertModal>
        )}
      </Stack>      
     </div>
  )
}

export default memo(PuMapping)

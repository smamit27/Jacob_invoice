import { Button, Grid, Stack,Switch ,FormControlLabel} from '@mui/material'

import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getItemBilledHeaderAction,getItemNotBilledHeaderAction,clientInvoiceNumberAction,getItemBilledHeaderResetAction,getItemNotBilledHeaderResetAction,itemNotBilledAction,oraclePADraftNumberAction,
          powerInvoiceDetailsPeriodAction,oracleInvoiceDetailsStatusAction, projectInvoiceDetailModalOpen,getItemBilledTotalAction,getItemNotBilledTotalAction} from './logic'
import DataGrid from 'react-data-grid'
import {MAIN_GRID_COLUMNS,formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import useLazyLoad from '../../../hooks/useLazyLoad'
import AdvancedSearch from './AdvancedSearch'
import ChangeHistory from './ChangeHistory'
import useIntialSelector from '../../../hooks/useIntialSelctor'

function InvoiceDetails(props) {
  const dispatch = useDispatch()
  const [mode,setMode] = useState('')
  const [original,setOriginal] = useState([])
  const formColumns = [...MAIN_GRID_COLUMNS, ...(props?.udfGridColumns || [])]
  const [columnsData, setColumnsData] = useState(formColumns)
  const collectionId = useSelector(state => state.getCollectionId)
  const [required, setRequired] = useState('Y')
  const [openModal, setOpenModal] = useState('')
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [childData, setChildData] = useState({})
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const { loading:itemBilledLoading, error:itemBilledError, data:itemBilledData = [], flag:itemBilledFlag } = useIntialSelector("getItemBilledHeaderReducer")
  const { loading:itemNotBilledLoading, error:itemNotBilledError, data:itemNotBilledData = [], flag:itemNotBilledFlag } = useSelector(state => state.getItemNotBilledHeaderReducer)
  const { open: ChangeHistoryOpen } = useSelector(state => state.projectInvoiceDetailModalReducer)
  const { data: itemBilledTotal } = useSelector(state => state.getItemNotBilledTotalReducer)
  const { data: itemNotBilledTotal } = useSelector(state => state.getItemNotBilledTotalReducer)


  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { CollectionID: collectionId, },
    url: '/GetItemsBilledHeaderDetails',
    rows: itemBilledData,
    rowAdditionalData: {
      isExpanded: false
    }
   
  })
  // const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
  //   params: { CollectionID: collectionId, },
  //   url: '/GetItemsNotBilledHeaderDetails',
  //   rows: itemBilledData,
  //   rowAdditionalData: {
  //     isExpanded: false
  //   },
  //   pageIndexKey: 'PageIndex',
  //   pageSizeKey: 'PageSize'
  // })
  

  useEffect(() => {
    
   
    dispatch(oraclePADraftNumberAction({CollectionID: collectionId}))
    dispatch(oracleInvoiceDetailsStatusAction( {Active: 'Y'}))
    dispatch(powerInvoiceDetailsPeriodAction({CollectionId: collectionId}))
    dispatch(clientInvoiceNumberAction({CollectionID: collectionId}))
    dispatch(itemNotBilledAction({Active: 'Y'}))
    dispatch(getItemBilledTotalAction({CollectionID: collectionId}))
    dispatch(getItemBilledHeaderAction({
      CollectionID: collectionId,
      PageIndex: 0,
      PageSize:20      
    }))
    return () => {
      dispatch(getItemNotBilledHeaderResetAction())
      }

  }, [])

  useEffect(() => {
    if (itemBilledFlag && required === 'Y' ) {
      setRowsData(itemBilledData)
    }
   
  }, [itemBilledFlag])
  useEffect(() => {

    if (itemNotBilledFlag && required === 'N' ) {
      setRowsData(itemNotBilledData)
    }
   
  }, [itemNotBilledFlag])

  
  const onAdvancedSearch = (mode,value) => {
    setOpenModal(true)
    setMode(mode)
    setOriginal(value)
  }
  const onProjectInvoiceNumberClick= (val) => {
    dispatch(projectInvoiceDetailModalOpen({...val, PROJECT_NAME: val?.PROJECT_NAME}))

  }
  
  const onExpand = async (val) => {
    const { isExpanded, tableRowId, PROJECT_ID = '',CLIENT_INVOICE_NUMBER= ''} = val
    try {
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      let child = childData[tableRowId] || []
      if (!isExpanded) {
        if (child && child.length) {
          newData.splice(index + 1, 0, ...child)
        } else {
          if(required === 'Y') {
            const response = await apiCall({
              method: 'get',
              url: '/GetItemsBilledSubDetails',
              params: {
                CollectionID: collectionId,
                ProjectID:PROJECT_ID,
                ClientInvoiceNo: CLIENT_INVOICE_NUMBER 
                }
            })
            child = [...response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: tableRowId }))]
            newData.splice(index + 1, 0, ...child)
          } else if(required === 'N'){
            const response = await apiCall({
              method: 'get',
              url: '/GetItemsNotBilledSubDetails',
              params: {
                CollectionID: collectionId,
                ProjectID:PROJECT_ID,
                }
            })
            child = [...response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: tableRowId }))]
            newData.splice(index + 1, 0, ...child)
          }
          newData[index].isExpanded = true
      }

      } else {
        child = newData.splice(index + 1, childData[tableRowId].length)
        newData[index].isExpanded = false
      }
      setChildData({
        ...childData,
        [tableRowId]: child
      })
      setRowsData(newData)
    } catch (error) {
    }
  }

  function createSaveData (row, type = '') {
    const oldSaveData = [...prevSaveData.current]
    const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
    const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
    const newSaveData = [
      ...filterData,
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || 'U', COLLECTION_ID: collectionId, }] : [])
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }

  const getChange = (row) => {
    createSaveData(row)
    if (row.parentRowId && childData[row?.parentRowId]) {
      const child = [...childData[row.parentRowId]].filter(d => d.tableRowId !== row.tableRowId)
      setChildData({
        ...childData,
        [row.parentRowId]: [...child, row]
      })
    }
    
  }

  const onSave =() => {}

  const onItemSelected = (event) => {
  const checkedItem = event.target.checked

  if(checkedItem){
    setRequired('Y')
    dispatch(getItemBilledHeaderAction({
      CollectionID: collectionId,
      PageIndex: 0,
      PageSize:20      
    }))

  } else{
    setRequired('N')
    
  dispatch(getItemNotBilledHeaderAction({
    CollectionID: collectionId,
    PageIndex: 0,
    PageSize:20      
  }))
  dispatch(getItemNotBilledTotalAction({CollectionID: collectionId}))
  }
  }
  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            
          <Button disabled variant="contained" color="secondary"  >Clear Filter</Button>
          <Button  variant="contained" color="secondary" onClick={() => onAdvancedSearch('create',{})} >Advance Search</Button>

          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
          <FormControlLabel
          value={required}
          control={<Switch checked={required === 'Y' || false} onChange={onItemSelected} />}
          label="Items Billed"
          labelPlacement="start"
        />

          <Button variant="contained" color="secondary"  >Data Refresh</Button>
          {/* <Button disabled={!selectedRows.size} variant="contained" color="secondary"  >Save View</Button> */}
            <Button variant="contained" disabled={!saveData?.length } onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        {required ==='Y' ?(
        <DataGrid  
            otherFunctions={{ onExpand, getChange,onProjectInvoiceNumberClick }}
            rowHeight={40} 
            headerRowHeight={60} 
            noRowsFallback={<Loader loading={itemBilledLoading} error={itemBilledError} noData={true}  style={{ height: '70vh', position: 'sticky', left: 0 }} />} 
            style={{ height: '60vh' }} 
            selectedRows={selectedRows} 
            columns={columnsData} 
            rows={rowsData} 
            onScroll={handleScroll} 
            summaryRows={itemBilledTotal}
            />
           ): 
            <DataGrid  
            otherFunctions={{ onExpand, getChange,onProjectInvoiceNumberClick }}
            rowHeight={40}  
            headerRowHeight={60}
            noRowsFallback={<Loader loading={itemNotBilledLoading} error={itemNotBilledError} noData={true}  style={{ height: '70vh', position: 'sticky', left: 0 }} />} 
            style={{ height: '60vh' }} 
            selectedRows={selectedRows} 
            columns={columnsData} 
            rows={rowsData} 
            onScroll={handleScroll} 
            summaryRows={itemNotBilledTotal}
            />
        } 
      </Stack> 
      {openModal && <AdvancedSearch open={openModal} mode={mode} original={original} onClose={() => setOpenModal('')} />}
      {ChangeHistoryOpen && <ChangeHistory />}

     </div>
  )
}

export default memo(InvoiceDetails)

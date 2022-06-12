import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  getProjectInvoiceOverviewAction,getProjectOverviewSummaryTotalAction, 
   saveProjectInvoiceOverviewResetAction,getRoleListAction,powerInvoicePeriodAction,oracleInvoiceStatusAction, getProjectInvoiceOverviewFlagResetAction,projectInvoiceDetailModalOpen} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import {MAIN_GRID_COLUMNS,formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import useLazyLoad from '../../../hooks/useLazyLoad'
import SavedView from  './SavedView'
import AdvancedSearch from './AdvancedSearch'
import ProjectInvoice from './ProjectInvoice'
function InvoiceOverview(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } =  useIntialSelector("getProjectInvoiceOverviewReducer")
  const { open: projectInvoiceOpen } = useSelector(state => state.projectInvoiceDetailModalReducer)
  const { data: total } = useSelector(state => state.getProjectOverviewSummaryTotalReducer)

  const [mode,setMode] = useState('')
  const [original,setOriginal] = useState([])
  const formColumns = [...MAIN_GRID_COLUMNS, ...(props?.udfGridColumns || [])]
  const [columnsData, setColumnsData] = useState(formColumns)
  const collectionId = useSelector(state => state.getCollectionId)

  const [selectedRows, setSelectedRows] = useState(new Set())
  const [openModal, setOpenModal] = useState('')
  const {rowsData, setRowsData, handleScroll} = useLazyLoad({
    params: {
      collectionID: collectionId,
      moduleId: props.moduleId || 14,
      orderBy: 1,
    },
    url: '/GetInvoiceOverviewMainGrid',
    rows: data,
   
  })
 
  

  useEffect(() => {
    dispatch(getProjectInvoiceOverviewAction({
      collectionID: collectionId,
      moduleId: props.moduleId || 14,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
    }))
    dispatch(getRoleListAction())
    dispatch(oracleInvoiceStatusAction( {active: 'Y'}))
    dispatch(powerInvoicePeriodAction({CollectionId: collectionId}))
    dispatch(getProjectOverviewSummaryTotalAction({
      collectionId: collectionId,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,   
      }))
    

  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(getProjectInvoiceOverviewFlagResetAction())
    }
  }, [flag])

  
  const onAdvancedSearch = (mode,value) => {
    setOpenModal(true)
    setMode(mode)
    setOriginal(value)
  }
  const onProjectInvoiceNumberClick= (val) => {
    dispatch(projectInvoiceDetailModalOpen({...val, PROJECT_NAME: val?.PROJECT_NAME}))

  }

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
          <Button disabled variant="contained" color="secondary"  >Clear Filter</Button>
          {/* <SavedView /> */}
          <Button  variant="contained" color="secondary" onClick={() => onAdvancedSearch('create',{})} >Advance Search</Button>

          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
          <Button variant="contained" color="secondary"  >Data Refresh</Button>
          {/* <Button disabled={!selectedRows.size} variant="contained" color="secondary"  >Save View</Button> */}
            {/* <Button variant="contained" disabled={!saveData?.length && periods === ''} onClick={onSave} >Save</Button> */}
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid  
        style={{height: 'calc(80vh*(9/13))' }} 
            otherFunctions={{ onProjectInvoiceNumberClick }} 
            rowHeight={40}  
            headerRowHeight={60}
            noRowsFallback={<Loader loading={loading} error={error} noData={true}  style={{ height: '70vh', position: 'sticky', left: 0 }} />} 
            selectedRows={selectedRows} 
            columns={columnsData} 
            rows={rowsData} 
            onScroll={handleScroll} 
            summaryRows={total}
            />
      </Stack> 
      {openModal && <AdvancedSearch open={openModal} mode={mode} original={original} onClose={() => setOpenModal('')} />}
      {projectInvoiceOpen && <ProjectInvoice />}

     </div>
  )
}

export default memo(InvoiceOverview)

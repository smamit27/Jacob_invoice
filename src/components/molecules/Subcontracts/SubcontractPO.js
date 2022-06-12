import { Modal, Box, styled, Button, Stack,IconButton ,Grid} from '@mui/material'
import React, { useEffect, useState,useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { subcontractPODetailModalOpen,subcontractStatusResetAction,
  clientSubcontractPOModalClose, clientSubcontractPOTableAction, 
  clientSubcontractPOTableResetAction,saveSubcontractorPOAction ,
  getSubcontractorPOSummaryTotalAction,getSubcontractorPOSummaryTotalResetAction,subcontractorPOResetAction} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import {  PO_COLUMNS} from './subcontractConstant'
import { Loader } from '../../atoms';
import Label from '../../atoms/Label'
import DataGrid from 'react-data-grid'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import '../Subcontracts/SubcontractsStyles.css'

function SubcontractPO() {
  const { open,data: modalData = {}} = useSelector(state => state.subcontractModal)
  const { data, loading, error,flag } = useIntialSelector('subcontractPOTableReducer')
  const { flag: saveSubcontractorPOFlag, error: saveSubcontractorPOError } = useSelector(state => state.subcontractorPOReducer)
  const { data: total } = useSelector(state => state.getSubcontractorPOSummaryTotalReducer)
  const [rowsData, setRowsData] = useState(data);
  const collectionId = useSelector(state => state.getCollectionId)
  const { data: statusFormat, flag: statusFormatFlag } = useSelector(state => state.subcontractStatusReducer)
  const [columnsData, setColumnsData] = useState([...PO_COLUMNS])
  const [saveData, setSaveData] = useState([])

  const prevSaveData = useRef([])
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (open) {
       dispatch(clientSubcontractPOTableAction({
        CollectionID: collectionId,
        SubcontractorID : modalData?.id,
        LocalFilter: '',
        GlobalFilter: '',
        Orderby: ''

       }))
       dispatch(getSubcontractorPOSummaryTotalAction({
        CollectionID: collectionId,
        SubcontractorID: modalData?.id,
        LocalFilter: '',
        GlobalFilter: '',
        Orderby: '' 
 
       }))
       
    } else {
      dispatch(clientSubcontractPOTableResetAction())
      dispatch(getSubcontractorPOSummaryTotalResetAction())
    }
  }, [open])
  useEffect(() => {
    if (statusFormatFlag) {
      dispatch(subcontractStatusResetAction())
      const statusFormatOptions = statusFormat.map(d => ({ id: d.ID, description: d.Description }))
      setColumnsData(columnsData.map(d => (d.key === 'BUSINESS_STATUS_1' || d.key === 'BUSINESS_STATUS_2' || d.key === 'BUSINESS_STATUS_3' ||d.key === 'BUSINESS_STATUS_4' ) ? {...d, valueOptions: statusFormatOptions } : d))
    }
  }, [statusFormatFlag])
  useEffect(() => {
    if (saveSubcontractorPOFlag || saveSubcontractorPOError) {
      setSaveData([])
      prevSaveData.current = []
      dispatch(subcontractorPOResetAction())
      dispatch(backDropLoaderCloseAction())    
    }
  }, [saveSubcontractorPOFlag,saveSubcontractorPOError])
  
  useEffect(() => {
   if (data.length) {
      const newData = [...data]
      setRowsData(newData)
    }
    else{
      setRowsData([])

    }
  }, [flag])

  const onClose = () => dispatch(clientSubcontractPOModalClose())
   

  const save = () =>{
    dispatch(backDropLoaderCloseAction())    
    const request = saveData?.map((d)=>({
      "pO_NUMBER": d.PO_NUMBER,
      "teaminG_SUBCONTRACTOR":  d.TEAMING_SUBCONTRACTOR,
      "worK_DESCRIPTION": d.WORK_DESCRIPTION,
      "businesS_STATUS_1": d.BUSINESS_STATUS_1 ? String(d.BUSINESS_STATUS_1) : null,
      "businesS_STATUS_2": d.BUSINESS_STATUS_2 ? String(d.BUSINESS_STATUS_2) : null,
      "businesS_STATUS_3": d.BUSINESS_STATUS_3 ? String(d.BUSINESS_STATUS_3) : null,
      "businesS_STATUS_4": d.BUSINESS_STATUS_4 ? String(d.BUSINESS_STATUS_4) : null,
      "savE_MODE": d.SAVE_MODE
    }))
    dispatch(saveSubcontractorPOAction({
      CollectionId: collectionId,
      SubContractorId: modalData?.id
      }, request))
      dispatch(clientSubcontractPOTableAction({
        SubcontractorID : modalData?.id,
        CollectionID: collectionId,
        LocalFilter: '',
        GlobalFilter: '',
        Orderby: ''
       }))

  }
  

  const onPoDetailClick = (val) => {
    dispatch(subcontractPODetailModalOpen({...val, name: modalData?.name}))
    //dispatch(clientSubcontractPOTableAction())
   // dispatch(clientSubcontractPOModalClose())
  } 
  
function createSaveData (row, type = '') {
  const oldSaveData = [...prevSaveData.current]
  const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
  const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
  const newSaveData = [
    ...filterData,
    ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || row.SAVE_MODE, COLLECTION_ID: collectionId, }] : [])
  ]
  prevSaveData.current = [...newSaveData]
  setSaveData(newSaveData)
}

const getChange = (row) => {
  createSaveData(row)
 }
 const onRowsChange = (newRows) => {
  setRowsData(newRows)
}

  return (
    <Modal onClose={onClose} open={open}>
      <Box sx={style} className='subContractor-Modal'>
        <Header className='subContractor-ModalHeader'>
          <HeaderTitle data-testid='subcon-purchase-orders' className='sub-modal-text'>{modalData?.name} - Purchase Orders</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle"/></IconButton>
        </Header>             
       
        <TableContent >
          <Box m={3} >
            <Grid container  flexWrap="wrap" mb={2}>
              <Grid item  sm lg md xs >
                <Stack spacing={2} direction="row" >
                  <div className='subConLabel'>
                    <Label>Subcontractor Name</Label>
                    <TextView className='bold' >{modalData?.name}</TextView>
                  </div>
                  <div className='subConLabel'>
                    <Label>Work description</Label>
                    <TextView className='bold' >{modalData?.WORK_DESCRIPTION}</TextView>
                  </div>
                </Stack>
              </Grid>
              <Grid item alignSelf="flex-end" >
                <Stack spacing={2} direction="row" flexWrap="wrap" >
                  <Button variant="contained"   onClick={save} disabled={!saveData.length}>Save</Button>
                  </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box ml={3} mr={3} mb={3} className='subContractorTable'>
          <Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }} >
            <DataGrid
              className='rdg-header-white'
              style={{height: '60vh' }} 
              rowHeight={40}
              headerRowHeight={60}
              otherFunctions={{ getChange,onPoDetailClick }}
              onRowsChange={onRowsChange}
              noRowsFallback={<Loader loading={loading} error={error}
              noData={true} 
              style={{ height: 200, position: 'sticky', left: 0, }} />}
              rowKeyGetter={row => row.tableRowId}
              columns={columnsData}
              rows={rowsData}
              summaryRows={rowsData.length > 0 ? total: []}
            />
          </Loader>
          </Box>
        </TableContent>



        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button onClick={onClose} variant="contained" >Done</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default SubcontractPO


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '95%',
  height: '95vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  borderBottom: '1px solid #E1E1E1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  width: '100%'
})
const HeaderTitle = styled('div')({
  color: '#222222',
  fontWeight: '800',
  fontSize: '14px',
  lineHeight: '24px',
  fontFamily: " Jacobs Chronos Bold"
})

const Footer = styled('div')({
  padding: '1.2em 1.5em',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  height: 70,
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  borderTop: '1px solid #E1E1E1',
  width: '100%'
})


const TableContent = styled('div')({
  height: 'calc(95vh - 130px)',
  overflow: 'auto'
})

const TextView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#222222',
  fontSize: '14px',
  lineHeight: '24px',
})



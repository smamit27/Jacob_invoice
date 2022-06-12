import { Modal, Box, styled, Button, Stack, Grid, Select, MenuItem } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getContractCeilingSummaryTotalAction, deleteContractorCeilingFieldsAction, 
         deleteContractorCeilingFieldsResetAction, getAllContractorCeilingAction, 
         getAllContractorCeilingFlagResetAction, getAllContractorCeilingResetAction, 
         createEditContractorCeilingFieldResetAction} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader } from '../../atoms';
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import AlertModal from '../Modal/AlertModal'
import { Icon } from '../../atoms';
import DataGrid, { SelectColumn } from 'react-data-grid'
import {CONTRACTOR_CEILING_TABLE_COLUMNS} from  './constants'
import CreateEditPeriods from './CreateEditPeriods';
import '../ContractorCeilings/ContractorCeilingsStyles.css'



function ContractorCeiling({ open = false, onClose = () => null, isCollectionExist = false }) {
  const [deleteModal, setDeleteModal] = useState(false)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteContractorCeilingFieldsReducer)
  const { data = [], loading, error, flag } = useIntialSelector('getAllContractorCeilingReducer')
  const { data: total } = useSelector(state => state.getContractCeilingSummaryTotalReducer)
  const collectionId = useSelector(state => state.getCollectionId)
  const {data:generateCollectionId} = useSelector(state => state.getGenerateCollectionId);
  const { flag: saveAddEditFlag ,error:saveAddEditError} = useSelector(state => state.createEditContractorCeilingFieldReducer)

  const [rowsData, setRowsData] = useState(data);
  const [disableDelete, setDisableDelete] = useState(true)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [openModal, setOpenModal] = useState('')
  const [mode,setMode] = useState('')
  const [original,setOriginal] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      if(isCollectionExist) {
        isCollectionAlreadyExist(isCollectionExist)
      } else {
       isCollectionNew(isCollectionExist)       
      }         
    } else {
      dispatch(getAllContractorCeilingResetAction())
    }
  }, [open])
  useEffect(() => {
 
    if(saveAddEditFlag || deleteFlag){
      if(isCollectionExist) {
        isCollectionAlreadyExist(isCollectionExist)
      } else {
       isCollectionNew(isCollectionExist)       
      }  
      dispatch(backDropLoaderCloseAction())
      dispatch(createEditContractorCeilingFieldResetAction())
      dispatch(deleteContractorCeilingFieldsResetAction())
      dispatch(getAllContractorCeilingResetAction())
      setDeleteModal(false)
      setSelectedRows(new Set())

}


}, [saveAddEditFlag,deleteFlag])

useEffect(() => {
  if (deleteError || saveAddEditError) {
    dispatch(createEditContractorCeilingFieldResetAction())
    dispatch(deleteContractorCeilingFieldsResetAction())
    dispatch(backDropLoaderCloseAction())
  }
}, [deleteError, saveAddEditError])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      setDisableDelete(true)
      setSelectedRows(new Set())
      dispatch(getAllContractorCeilingFlagResetAction())
      dispatch(getAllContractorCeilingResetAction())
    }
  }, [flag])
  const onCreateEdit = (mode,value) => {
    setOpenModal(true)
    setMode(mode)
    setOriginal(value)
  }
  
const isCollectionAlreadyExist = (isCollectionExist) => {
    dispatch(getAllContractorCeilingAction({
      collectionID: collectionId,
      pageIndex: 0,
      pageSize: 10,
      orderBy: 1
    },isCollectionExist))
    dispatch(getContractCeilingSummaryTotalAction({
      collectionID: collectionId,
      pageIndex: 0,
      pageSize: 10,
      orderBy: 1
    },isCollectionExist))
 
 
}
const isCollectionNew = (isCollectionExist) => {
  dispatch(getContractCeilingSummaryTotalAction({
    collectionID: generateCollectionId[0],
    pageIndex: 0,
    pageSize: 10,
    orderBy: 1
    },isCollectionExist))
    dispatch(getAllContractorCeilingAction({
    Collection_ID: generateCollectionId[0],
    pageIndex: 0,
    pageSize: 10,
    orderBy: 1
    },isCollectionExist))  
}

  const onEdit = (dat) => {
    onCreateEdit('edit', dat)
  }
  const onDone = () => {
    if(isCollectionExist) {
      isCollectionAlreadyExist(isCollectionExist)
    } else {
     isCollectionNew(isCollectionExist)       
    } 
    onClose()
  }
  const onDelete = () => {
    dispatch(backDropLoaderOpenAction())
    const temp = Array.from(selectedRows)
    const modalData = temp.map(d => rowsData.find(m => m.tableRowId === d)).map(d =>d.CONTRACT_CEILING_ID).join(',');
    dispatch(deleteContractorCeilingFieldsAction({ contractCeilingId: modalData },isCollectionExist))
 }

 const onSelectedRowsChange = (val) => {
  setSelectedRows(val)
  setDisableDelete(false)
}

  return (
   
      <Modal open={open}>
        <Box sx={style} className='contractCeilingModal'>
          <Header className='contractCeilingModalHeader'>
            <HeaderTitle  data-testid="contract-ceilings-and-periods">Contract Ceilings and Periods</HeaderTitle>
            <div onClick={onClose}>
              <Icon name="close" />
          </div>
          </Header>
          <Box m={3} >
            <Grid container flexWrap="wrap">
              <Grid item  sm lg md xs >
                <Stack spacing={2} direction="row" >
                  
                </Stack>
              </Grid>
              <Grid item alignSelf="flex-end" >
                <Stack spacing={2} direction="row" >
                  <Button disabled={!selectedRows.size}  variant="contained" color="secondary" onClick={() => setDeleteModal(true)} >Delete Periods</Button>
                  <Button variant="contained" color="secondary" onClick={() => onCreateEdit('create',{})} >Add New Period</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box ml={3} mr={3} mb={3}>
          <TableContent >
            <DataGrid
              className='rdg-header-white'
              rowHeight={40}
              headerRowHeight={60}              
              noRowsFallback={<Loader loading={loading} error={error}
              noData={true} style={{ height: 'calc(85vh - 132px - 9em)', position: 'sticky', left: 0 }} />}
              style={{ height: '60vh' }}
              selectedRows={selectedRows}
              rowKeyGetter={row => row.tableRowId}
              onSelectedRowsChange={onSelectedRowsChange}
              columns={[SelectColumn, ...CONTRACTOR_CEILING_TABLE_COLUMNS]}
              rows={rowsData}
              otherFunctions={{ onEdit }}
              summaryRows={total}              
            />
          </TableContent>
          
        </Box>
          <Footer>
            <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
              <Button onClick={onDone} variant="contained">Done</Button>
            </Stack>
          </Footer>
          {openModal && <CreateEditPeriods open={openModal} mode={mode} original={original} onClose={() => setOpenModal('')} isCollectionExist={isCollectionExist} />}

          {deleteModal && (
            <AlertModal title="Delete selected Contractor Ceiling" open={deleteModal} onConfirm={onDelete} onClose={() => setDeleteModal(false)} >
              Are you sure that you want delete the selected Contractor Ceiling ?
            </AlertModal>
          )}
        </Box>
      </Modal>
  )
}

export default ContractorCeiling


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
  height: '85vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#fff',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  background: 'transparent',
  color: '#222222',
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
  height: 'calc(85vh - 96px - 9em)',
  overflow: 'auto'
})

const ProjectCell = styled('div')({
  color: '#231EDC',
  fontWeight: 'bold',
  textDecoration: 'underline',
  cursor: 'pointer'
})
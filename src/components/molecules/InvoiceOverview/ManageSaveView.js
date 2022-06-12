import { Modal, Box, styled, Button, Stack, Grid,IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  deleteManageSavedViewsAction, manageSaveViewModalClose, getAllManageSavedViewsAction, getAllManageSavedViewsFlagResetAction, getAllManageSavedViewsResetAction, createEditManageSavedViewsFieldResetAction, createEditManageSavedViewsFieldModalCloseAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader } from '../../atoms';
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import AlertModal from '../Modal/AlertModal'
import { Icon } from '../../atoms';
import DataGrid, { SelectColumn } from 'react-data-grid'
import {MANAGE_SAVED_VIEWS} from  './manageSaveViewConstants'
import ManageEditView from './ManageEditView';



function ManageSavedView() {
    const { open } = useSelector(state => state.manageSaveViewModalReducer)

  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteManageSavedViewsReducer)
  const { data:getAllManageSavedViews = [], loading, error, flag } = useIntialSelector('getAllManageSavedViewsReducer')
  const { flag: saveAddEditFlag } = useSelector(state => state.createEditManageSavedViewsReducer)
  const [disableDelete, setDisableDelete] = useState(true)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [openModal, setOpenModal] = useState('')
  const [mode,setMode] = useState('')
  const [original,setOriginal] = useState([])  
  const [localLoading, setLocalLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      dispatch(getAllManageSavedViewsAction({
        collectionID: 457,
        pageIndex: 1,
        pageSize: 10,
        orderBy: 1
      }))
    } else {
      dispatch(getAllManageSavedViewsResetAction())
    }
  }, [open])

  useEffect(() => {
    if (flag) {
      setDisableDelete(true)
      selectedRows.current = []
      dispatch(getAllManageSavedViewsFlagResetAction())
    }
  }, [flag])

  const onCreateEdit = (mode,value) => {
    setOpenModal(true)
    setMode(mode)
    setOriginal(value)
  }
  
  const onSelectedRowsChange = (val) => {
    setSelectedRows(val)
  }


  const onEdit = (dat) => {
    onCreateEdit('edit', dat)
  }

  const onDelete = () => {
    dispatch(backDropLoaderOpenAction())
    dispatch(deleteManageSavedViewsAction(selectedRows.current))
  }
  const onClose = ()=> {
      dispatch(manageSaveViewModalClose())

  }

  const managedSavedViewsData = getAllManageSavedViews

  return (
   
      <Modal open={open}>
        <Box sx={style}>
          <Header>
            <HeaderTitle>Manage Saved Views</HeaderTitle>
            <div onClick={onClose}>
            <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
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
                  <Button disabled={!selectedRows.size} variant="contained" color="secondary" onClick={() => setDeleteModal(true)} >Delete</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box ml={3} mr={3} mb={3}>
          <TableContent >
            <DataGrid
            style={{height: 'calc(80vh*(9/13))' }} 
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataMessage="No User Defined Fields Created" style={{ height: 'calc(85vh - 112px - 9em)', position: 'sticky', left: 0 }} />}
              headerRowHeight={60}
              rowKeyGetter={row => row.tableRowId}
              onSelectedRowsChange={onSelectedRowsChange}
              columns={[SelectColumn, ...MANAGE_SAVED_VIEWS]}
              rows={managedSavedViewsData}
              selectedRows={selectedRows}
              otherFunctions={{ onEdit }}
              
            />
          </TableContent>
        </Box>
          <Footer>
            <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
              <Button onClick={onClose} variant="contained">Close</Button>
            </Stack>
          </Footer>
          {/* {openModal && <ManageEditView  mode={mode} original={original}  />} */}

          {deleteModal && (
            <AlertModal title="Delete selected Contractor Ceiling" open={deleteModal} onConfirm={onDelete} onClose={() => setDeleteModal(false)} >
              Are you sure that you want delete the selected Contractor Ceiling ?
            </AlertModal>
          )}
        </Box>
      </Modal>
  )
}

export default ManageSavedView


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
  fontsize: '14px',
  lineHeight: '24px',
  letterSpacing: '2px'
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
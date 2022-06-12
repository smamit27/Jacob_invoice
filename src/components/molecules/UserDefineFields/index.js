import { Modal, Box, styled, Button, Stack, Grid, Select, MenuItem, IconButton, Checkbox } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { createEditUserDefineFieldModalOpenAction, userDefineFieldsModalCloseAction, deleteUserDefineFieldsAction, deleteUserDefineFieldsResetAction, getAllUdfAction, getAllUdfFlagResetAction, getAllUdfResetAction, createEditUserDefineFieldResetAction, createEditUserDefineFieldModalCloseAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import DataGrid from 'react-data-grid'
import { Loader, ModalTitle } from '../../atoms';
import { UDF_TABLE_COLUMNS } from './constants'
import { getUdfModuleColumnsAction } from '../../views/Setup/logic';
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import AlertModal from '../Modal/AlertModal';
import './UserDefineFieldsStyles.css';
import { IoIosArrowDown } from "react-icons/io";


function UserDefineFields() {
  const [deleteModal, setDeleteModal] = useState(false)
  const { open, data: modalData } = useSelector(state => state.userDefineFieldsModal)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteUserDefineFields)
  const { data: allModules } = useIntialSelector('getAllModules')
  const collectionId = useSelector(state => state.getCollectionId)
  const { data = [], loading, error, flag } = useIntialSelector('getAllUdf')
  const { flag: createEditUdfFlag, error: createEditUdfError } = useSelector(state => state.createEditUserDefineField)
  const [moduleId, setModuleId] = useState(modalData?.moduleId)
  const [selectedRows, setSelectedRows] = useState(new Set())
  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      dispatch(getAllUdfAction({ CollectionID: collectionId }))
      setModuleId(modalData?.moduleId)
    } else {
      dispatch(getAllUdfResetAction())
    }
  }, [open])

  useEffect(() => {
    if (flag) {
      setSelectedRows(new Set())
      dispatch(getAllUdfFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (deleteFlag || createEditUdfFlag) {
      dispatch(getUdfModuleColumnsAction({
        ModuleID: moduleId,
        CollectionID: collectionId
      }))
      dispatch(getAllUdfAction({ CollectionID: collectionId }))
      dispatch(deleteUserDefineFieldsResetAction())
      dispatch(createEditUserDefineFieldResetAction())
      dispatch(createEditUserDefineFieldModalCloseAction())
      dispatch(backDropLoaderCloseAction())
      setDeleteModal(false)
    }
  }, [deleteFlag, createEditUdfFlag])

  useEffect(() => {
    if (deleteError || createEditUdfError) {
      dispatch(deleteUserDefineFieldsResetAction())
      dispatch(createEditUserDefineFieldResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [deleteError, createEditUdfError])

  const onClose = () => dispatch(userDefineFieldsModalCloseAction())

  const onOpenUDFCreateEdit = (titleType, dat = {}) => {
    dispatch(createEditUserDefineFieldModalOpenAction({
      titleType,
      ...dat
    }))
  }
  
  const onSelectedRowsChange = (val) => {
    setSelectedRows(val)
  }

  const getFormatedData = () => {
    return data.filter(d => d?.MODULE_IDS?.split(', ').includes(`${moduleId}`))
  }

  const onModuleChange = (e) => {
    setModuleId(e.target.value)
    setSelectedRows(new Set())
  }

  const onEdit = (row) => {
    onOpenUDFCreateEdit('edit', row)
  }

  const rowKeyGetter = (row) => row.UDF_ID

  const onDelete = () => {
    const deleteData = Array.from(selectedRows)
    dispatch(backDropLoaderOpenAction())
    dispatch(deleteUserDefineFieldsAction({
      data: deleteData.map(d => ({
        "udF_ID": d,
        "modulE_ID": moduleId
      })),
      params: {
        collectionId
      }
    }))
  }

  const udfData = getFormatedData()

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='udf-list' >User define Fields</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <Box m={3} >
          <Grid container flexWrap="wrap">
            <Grid item  sm lg md xs >
              <Stack spacing={2} direction="row" >
                <Select style={{ width: 250 }} value={moduleId} onChange={onModuleChange} size="small" IconComponent={() => <Box mr={2} mt={1}><IoIosArrowDown /></Box> }
>
                  <MenuItem key={-1} disabled value="">Select</MenuItem>
                  {allModules.map((d, i) => (
                    <MenuItem key={i} value={d.MODULE_ID}>{d.MODULE_NAME}</MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>
            <Grid item alignSelf="flex-end" >
              <Stack spacing={2} direction="row" >
                <Button disabled={!selectedRows.size} variant="contained" color="secondary" className='AddNew_width' onClick={() => setDeleteModal(true)} >Delete</Button>
                <Button variant="contained" color="secondary"  className='AddNew_width' onClick={() => onOpenUDFCreateEdit('create')} >Add New</Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box ml={3} mr={3} mb={3}>
          <TableContent >
            <DataGrid
              className='rdg-header-white'
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataMessage="No User Defined Fields Created" style={{ height: 'calc(85vh - 112px - 9em)', position: 'sticky', left: 0 }} />}
              headerRowHeight={60}
              style={{ height: 'calc(85vh - 112px - 9em)' }}
              rowKeyGetter={rowKeyGetter}
              selectedRows={selectedRows}
              onSelectedRowsChange={onSelectedRowsChange}
              columns={UDF_TABLE_COLUMNS}
              rows={udfData}
              otherFunctions={{ onEdit }}
            />
          </TableContent>
        </Box>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button onClick={onClose} variant="contained">Done</Button>
          </Stack>
        </Footer>
        {deleteModal && (
          <AlertModal title="Delete selected user defined field's" open={deleteModal} onConfirm={onDelete} onClose={() => setDeleteModal(false)} >
            Are you sure that you want delete the selected User Defined field's ?
          </AlertModal>
        )}
      </Box>
    </Modal>
  )
}

export default UserDefineFields


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
  borderBottom: '1px solid #E1E1E1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  width: '100%'
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
  // height: 'calc(85vh - 96px - 9em)',
  // overflow: 'auto'
})

const ProjectCell = styled('div')({
  color: '#231EDC',
  fontWeight: 'bold',
  textDecoration: 'underline',
  cursor: 'pointer'
})
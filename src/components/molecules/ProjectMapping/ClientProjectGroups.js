import { Modal, Box, styled, Button, Stack, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataGrid from 'react-data-grid'
import { clientProjectGroupModalCloseAction, clientProjectGroupTableAction, createEditClientProjectGroupModalCloseAction, createEditClientProjectGroupModalOpenAction, createEditClientProjectGroupResetAction, deleteClientProjectGroupsAction, deleteClientProjectGroupsResetAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader, ModalTitle } from '../../atoms';
import { columns } from './constants';
import AsyncTable from '../../atoms/CustomTable/AsyncTable';
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import { getUdfModuleColumnsAction } from '../../views/Setup/logic';


function ClientProjectGroups({ moduleId = 5 }) {
  const collectionId = useSelector(state => state.getCollectionId)
  const { open } = useSelector(state => state.clientProjectGroupModal)
  const { data, loading, error } = useIntialSelector('clientProjectGroupTable')
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteClientProjectGroups)
  const { flag: createEditFlag, error: createEditError } = useSelector(state => state.createEditClientProjectGroup)
  
  const [selectedRows, setSelectedRows] = useState([])

  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(clientProjectGroupTableAction({
        CollectionID: collectionId
      }))
    } else {
      setSelectedRows([])
    }
  }, [open])

  
  useEffect(() => {
    if (deleteFlag || createEditFlag) {
      setSelectedRows([])
      dispatch(getUdfModuleColumnsAction({
        ModuleID: moduleId,
        CollectionID: collectionId
      }))
      dispatch(clientProjectGroupTableAction({
        CollectionID: collectionId
      }))
      dispatch(deleteClientProjectGroupsResetAction())
      dispatch(createEditClientProjectGroupResetAction())
      dispatch(createEditClientProjectGroupModalCloseAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [deleteFlag, createEditFlag])

  useEffect(() => {
    if (deleteError || createEditError) {
      dispatch(deleteClientProjectGroupsResetAction())
      dispatch(createEditClientProjectGroupResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [deleteError, createEditError])

  const onClose = () => dispatch(clientProjectGroupModalCloseAction())

  function onSelectedRowsChange (checked, val) {
    if (checked) {
      const values = [val]
      setSelectedRows([...selectedRows, ...values])
    } else {
      const values = [val]
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }

  const onClientProjectGroupClick = (row) => {
    onOpenClientProjectGroup('view', { ...row })
  }

  const onEdit = (row) => {
    onOpenClientProjectGroup('edit', { ...row })
  }

  const onDelete = () => {
    dispatch(backDropLoaderOpenAction())
    dispatch(deleteClientProjectGroupsAction({ 
      groupID: selectedRows.join(', '),
      CollectionID: collectionId
    }))
  }

  const onOpenClientProjectGroup = (titleType, dat = {}) => {
    dispatch(createEditClientProjectGroupModalOpenAction({
      titleType,
      ...dat
    }))
  }
  
  
  return (
    <Modal  open={open}>
      <Box sx={style} className='clientProjectModal'>
        <Header className='headerText'>
          <ModalTitle data-testid='clients-project-group'>Client Project Groups</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <Box m={3} >
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button variant="contained" color="secondary" disabled={!selectedRows.length} onClick={onDelete} >Delete</Button>
            <Button variant="contained" color="secondary" onClick={() => onOpenClientProjectGroup('new')} >Add New</Button>
          </Stack>
        </Box>
        <Box ml={3} mr={3} mb={3}>
          <TableContent >
            <DataGrid
              className='rdg-header-white'
              rowHeight={40}
              headerRowHeight={60}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              style={{ height: '56vh' }}
              rowKeyGetter={row => row.GROUP_ID}
              otherFunctions={{ onSelectedRowsChange, selectedRows, onClientProjectGroupClick, onEdit, selectorKey: 'GROUP_ID' }}
              columns={columns}
              rows={loading ? [] : data}
            />
          </TableContent>
        </Box>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button onClick={onClose} variant="contained">Done</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default ClientProjectGroups


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '90%',
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
  height: 72,
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
  height: 'calc(95vh - 96px - 9em)',
  overflow: 'auto'
})

const ProjectCell = styled('div')({
  color: '#231EDC',
  fontWeight: 'bold',
  textDecoration: 'underline',
  cursor: 'pointer'
})
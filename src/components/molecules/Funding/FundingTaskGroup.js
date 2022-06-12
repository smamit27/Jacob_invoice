import { Modal, Box, styled, Button, Stack, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import DataGrid, { SelectColumn } from 'react-data-grid'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader, ModalTitle } from '../../atoms';
import { fundingTaskGroupsListAction, fundingTaskGroupsListResetAction } from './logic'
import CustomRowSelector from '../../atoms/Editors/CustomRowSelector'

const columns = [
  {
    key: 'select-row',
    name: '',
    width: 35,
    maxWidth: 35,
    resizable: false,
    "cellClass": "rdg-editor-cell rdg-editor-cell_ckeckbox",
    sortable: false,
    frozen: false,
    headerRenderer: null,
    formatter: CustomRowSelector,
  },
  {
    key: 'TASK_GROUP_NAME',
    name: 'Client Task Group'
  }
]

function FundingTaskGroup({ open, onClose, modalData = {}, onSave, active = [] }) {
  const { loading, error, data } = useIntialSelector('fundingTaskGroupsList')
  const [selectedRows, setSelectedRows] = useState(active)
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      const { CollectionId, ProjectId, CLIENT_FUNDING_DETAILS_1_ACRN,
        CLIENT_FUNDING_DETAILS_2_PHASE, FUNDING_ALLOCATION_AMOUNT,
        FUNDING_ALLOCATION_SUBTOTAL_1, FUNDING_SOURCE_ID
      } = modalData
      dispatch(fundingTaskGroupsListAction({
        params: {
          CollectionId,
          ProjectId
        },
        extraResponse: {
          PRIMARY_FUNDING_SOURCE_ID: FUNDING_SOURCE_ID,
          FUNDING_SOURCE_ID: FUNDING_SOURCE_ID,
          IS_PRORATE_YN: 'N',
          FUNDING_SOURCE_NAME: `${CLIENT_FUNDING_DETAILS_1_ACRN}, ${CLIENT_FUNDING_DETAILS_2_PHASE}, $${FUNDING_ALLOCATION_SUBTOTAL_1 || FUNDING_ALLOCATION_AMOUNT}`,
          PERCENTAGE: 100,
          PRIORITY: 1,
          GROUP_PERCENTAGE_ID: 1,
          SAVE_MODE: 'I'
        }
      }))
    } else {
      dispatch(fundingTaskGroupsListResetAction())
    }
  }, [open])

  function onSelectedRowsChange (checked, val, parentId) {
    if (checked) {
      let values = [val]
      setSelectedRows([...selectedRows, ...values])
    } else {
      let values = [val]
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }

  const saveClick = () => {
    const dat = selectedRows.filter(d => !active.includes(d)).map(d => data.find(m => m.TASK_GROUP_ID === d))
    onSave(dat)
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='select-task-group'>Select Task Group(s)</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <FormContent>
          <Box m={3} >
            <DataGrid
              className='rdg-header-white'
              style={{height: 'calc(90vh - 146px - 6em)' }} 
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 'calc(90vh - 196px - 6em)', position: 'sticky', left: 0 }} />}
              headerRowHeight={40}
              rowKeyGetter={row => row.TASK_GROUP_ID}
              columns={columns}
              rows={data}
              otherFunctions={{ selectedRows, onSelectedRowsChange, disabled: active, selectorKey: 'TASK_GROUP_ID' }}
            />
          </Box>
        </FormContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button type="button" onClick={onClose} >Cancel</Button>
            <Button disabled={!selectedRows?.length} variant="contained" onClick={saveClick} >Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default FundingTaskGroup

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50%',
  height: '90vh',
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


const FormContent = styled('div')({
  height: 'calc(90vh - 80px - 3em)',
  overflow: 'auto'
})

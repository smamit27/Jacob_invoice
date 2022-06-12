import { Modal, Box, styled, Button, Stack, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataGrid from 'react-data-grid'
import { groupBy as rowGrouper } from 'lodash'
import { getAllocateToTaskListAction, getAllocateToTaskListResetAction, getAllocateToTaskListFlagResetAction, saveFundingSourceResetAction, saveFundingSourceAction, deleteFundingSourceAction, deleteFundingSourceResetAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader, ModalTitle } from '../../atoms';
import FundingTaskGroup from './FundingTaskGroup';
import { ALLOCATE_COLUMNS } from './constants';
import ProrateModal from './ProrateModal'
import { sortLevelData } from '../../../helpers'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import Label from '../../atoms/Label'
import NumberFormatter from '../../atoms/Formatters/NumberFormatter'

const getGroupData = (dat, id = 'TASK_GROUP_ID') => {
  const group = rowGrouper(dat, id)
  return Object.keys(group).map(d => id === 'TASK_GROUP_ID' ? Number(d) : d)
}


function sortedData (dat = []) {
  return sortLevelData.from(dat).sortBy("TASK_GROUP_ID")
}

function formRows (dat = [], expandIds = []) {
  const newData = []
  const taskGroup = rowGrouper(dat, 'TASK_GROUP_ID')
  Object.keys(taskGroup).forEach((d, i) => {
    if (taskGroup[d]?.length > 1) {
      const [firstTask] = taskGroup[d]
      newData.push({ tableRowId: `task-${i}`, TASK_GROUP_ID: firstTask.TASK_GROUP_ID, TASK_GROUP_NAME: firstTask.TASK_GROUP_NAME, CAN_PRORATE: true, level: 1, CAN_EXPAND: true, IS_EXPANDED: expandIds.includes(firstTask.TASK_GROUP_ID) })
      if (expandIds.includes(firstTask.TASK_GROUP_ID)) {
        const perGroup = rowGrouper(taskGroup[d], 'GROUP_PERCENTAGE_ID')
        Object.keys(perGroup).forEach((z, j) => {
          if (perGroup[z]?.length > 1) {
            const [firstPer] = perGroup[z]
            newData.push({ tableRowId: `percent-${i}-${j}`, GROUP_PERCENTAGE_ID: firstPer.GROUP_PERCENTAGE_ID, PERCENTAGE: firstPer.PERCENTAGE, level: 2 })
            newData.push(...perGroup[z].map(m => ({...m, level: 3, IS_GROUP: true})))
          } else {
            newData.push(...perGroup[z].map(m => ({ ...m, level: 2 })))
          }
        })
      }
    } else {
      newData.push(...taskGroup[d].map(m => ({ ...m, CAN_PRORATE: true, level: 1, CAN_EXPAND: false })))
    }
  })
  return newData
}

function AllocateToTask({ open, onClose, modalData, onSave }) {
  const { data, loading, error, flag } = useIntialSelector('getAllocateToTaskList')
  const { flag: saveFundingSourceFlag, error: saveFundingSourceError } = useSelector(state => state.saveFundingSource)
  const { flag: deleteFundingSourceFlag, error: deleteFundingSourceError } = useSelector(state => state.deleteFundingSource)
  const [openTask, setOpenTask] = useState(false)
  const [openProrate, setOpenProrate] = useState(null)
  const [rowsData, setRowsData] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
  const [expandIds, setExpandIds] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (open) {
      callApi()
    }
  }, [open])

  useEffect(() => {
    if (saveFundingSourceError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveFundingSourceResetAction())
    }
  }, [saveFundingSourceError])

  useEffect(() => {
    if (deleteFundingSourceError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteFundingSourceResetAction())
    }
  }, [deleteFundingSourceError])

  useEffect(() => {
    if (saveFundingSourceFlag) {
      dispatch(saveFundingSourceResetAction())
      dispatch(backDropLoaderCloseAction())
      onSave(getGroupData(rowsData, 'TASK_GROUP_NAME').join(', '), modalData.tableRowId)
      onClose()
    }
  }, [saveFundingSourceFlag])

  useEffect(() => {
    if (deleteFundingSourceFlag) {
      const temp = selectedRows
      const newData = [...rowsData].filter(d => !temp.includes(d.tableRowId))
      dispatch(deleteFundingSourceResetAction())
      dispatch(backDropLoaderCloseAction())
      onSave(getGroupData(newData, 'TASK_GROUP_NAME').join(', '), modalData.tableRowId)
      setRowsData(newData)
      setExpandIds(getGroupData(newData))
      setSelectedRows([])
    }
  }, [deleteFundingSourceFlag])

  useEffect(() => {
    if (flag) {
      const dat = sortedData([...data])
      setExpandIds(getGroupData(dat))
      setRowsData(sortedData([...dat]))
      dispatch(getAllocateToTaskListFlagResetAction())
    }
  }, [flag])

  function callApi () {
    const {
      CollectionId, AGREEMENT_ID, ProjectId, FUNDING_SOURCE_ID
    } = modalData
    const url = '/GetFundingSourceGroupDetails'
    const params = {
      CollectionId,
      ProjectId,
      AGREEMENT_ID: AGREEMENT_ID,
      PrimaryFundingSourceID: FUNDING_SOURCE_ID
    }
    dispatch(getAllocateToTaskListAction({
      url,
      params
    }))
  }

  const onProrate = (row) => {
    const { TASK_GROUP_ID, TASK_GROUP_NAME } = row
    const childRows = rowsData.filter(d => d.TASK_GROUP_ID === row.TASK_GROUP_ID)
    const { CollectionId, AGREEMENT_ID, ProjectId, FUNDING_SOURCE_ID, CLIENT_FUNDING_DETAILS_1_ACRN, CLIENT_FUNDING_DETAILS_2_PHASE, FUNDING_ALLOCATION_SUBTOTAL_1, FUNDING_ALLOCATION_AMOUNT } = modalData
    setOpenProrate({
      data: childRows,
      detail: {
        PRIMARY_FUNDING_SOURCE_ID: FUNDING_SOURCE_ID,
        TASK_GROUP_ID,
        TASK_GROUP_NAME,
        SAVE_MODE: 'I'
      },
      sourceName: `${CLIENT_FUNDING_DETAILS_1_ACRN}, ${CLIENT_FUNDING_DETAILS_2_PHASE}, $${FUNDING_ALLOCATION_SUBTOTAL_1 || FUNDING_ALLOCATION_AMOUNT}`,
      params: {
        CollectionId,
        ProjectId,
        AgreementID: AGREEMENT_ID,
        PrimaryFundingSourceID: FUNDING_SOURCE_ID
      }
    })
  }

  const onSaveTask = (dat) => {
    const newData = [...rowsData, ...dat]
    setRowsData(sortedData(newData))
    setOpenTask(false)
  }

  const onSaveSource = (dat, detail) => {
    const newData = [...rowsData]
    const temp = newData.filter(d => d.TASK_GROUP_ID !== detail.TASK_GROUP_ID)
    const updatedRows = [...temp, ...(dat)]
    setExpandIds(getGroupData(updatedRows))
    setRowsData(sortedData(updatedRows))
  }
  
  const onSaveClick = (newData = [...rowsData], deleteFlag = false) => {
    const { CollectionId, AGREEMENT_ID, ProjectId } = modalData
    const saveData = newData.map(({
      TASK_GROUP_ID, PRIMARY_FUNDING_SOURCE_ID, FUNDING_SOURCE_ID, IS_PRORATE_YN, GROUP_PERCENTAGE_ID, PERCENTAGE, PRIORITY, SAVE_MODE
    }) => ({
      TASK_GROUP_ID, PRIMARY_FUNDING_SOURCE_ID, FUNDING_SOURCE_ID, IS_PRORATE_YN, GROUP_PERCENTAGE_ID, PERCENTAGE, PRIORITY, SAVE_MODE
    }))
    const query = {
      data: saveData,
      params: {
        CollectionId,
        AgreementID: AGREEMENT_ID,
        PrimaryFundingSourceID: modalData?.FUNDING_SOURCE_ID,
        ProjectID: ProjectId,
      }
    }
    dispatch(backDropLoaderOpenAction())
    if (deleteFlag) {
      dispatch(deleteFundingSourceAction(query))
    } else {
      dispatch(saveFundingSourceAction(query))
    }
  }
  const onDelete = () => {
    const temp = selectedRows
    const newData = [...rowsData].filter(d => !temp.includes(d.TASK_GROUP_ID))
    onSaveClick(newData, true)
  }

  function onSelectedRowsChange (checked, val) {
    if (checked) {
      let values = [val]
      setSelectedRows([...selectedRows, ...values])
    } else {
      let values = [val]
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }

  const onExpand = (row) => {
    const id = row?.TASK_GROUP_ID
    if (expandIds.includes(id)) {
      setExpandIds(expandIds.filter(d => d !== id))
    } else {
      setExpandIds([...expandIds, id])
    }
  }

  const getLabel = () => {
    const { FundingSubTotal1, FUNDING_ALLOCATION_AMOUNT, FUNDING_ALLOCATION_SUBTOTAL_1 } = modalData
    if (FundingSubTotal1) {
      return {
        text: 'Allocation of funding subtotal 1',
        value: FUNDING_ALLOCATION_SUBTOTAL_1
      }
    }
    return {
      text: 'Allocation of funding',
      value: FUNDING_ALLOCATION_AMOUNT
    }
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='allocate-task-group' >Allocate to Client Task Group</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <Box m={3} >
          <Stack width="100%" spacing={2} direction="row" justifyContent="space-between" >
              <div>
                <Label>{getLabel().text}</Label>
                <TextView className='bold' >
                  <NumberFormatter type="Currency" value={getLabel().value || ''} />
                </TextView>
              </div>
              <Stack spacing={2} direction="row" alignItems='center' >
                <Button disabled={!selectedRows?.length} size='small' variant="contained" color="secondary" onClick={() => onDelete()} >Delete</Button>
                <Button disabled={loading} size='small' variant="contained" color="primary" onClick={() => setOpenTask(true)} >Select Task Groups</Button>
              </Stack>
          </Stack>
        </Box>
        <Box ml={3} mr={3} mb={3}>
          <TableContent >
            <DataGrid
              className='rdg-header-white'
              style={{height: 'calc(90vh - 125px - 9em)' }} 
              rowHeight={40}
              headerRowHeight={60}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}   
              rowKeyGetter={row => row.tableRowId}
              otherFunctions={{ onProrate, selectedRows, onSelectedRowsChange, selectorKey: 'TASK_GROUP_ID', onExpand }}
              columns={ALLOCATE_COLUMNS}
              rows={formRows(rowsData, expandIds)}
              defaultColumnOptions={{ resizable: true }}
            />
            {!!openProrate && <ProrateModal onSave={onSaveSource} open={!!openProrate} prorateData={openProrate} onClose={() => setOpenProrate(null)} />}
            {!!openTask && <FundingTaskGroup active={rowsData.map(d => d.TASK_GROUP_ID)} onSave={onSaveTask} open={openTask} modalData={modalData} onClose={() => setOpenTask(false)} />}
          </TableContent>
        </Box>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button disabled={!rowsData.length} onClick={() => onSaveClick()} variant="contained">Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default AllocateToTask


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
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


const TableContent = styled('div')({
  height: 'calc(90vh - 106px - 9em)',
  overflow: 'auto'
})

const ProjectCell = styled('div')({
  color: '#231EDC',
  fontWeight: 'bold',
  textDecoration: 'underline',
  cursor: 'pointer'
})

const TextView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#222222',
  fontSize: '14px',
  lineHeight: '24px',
})

import { Modal, Box, styled, Button, Stack, IconButton } from '@mui/material'
import DataGrid from 'react-data-grid'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { SEARCH_COLUMNS } from './constants'
import { Loader, ModalTitle } from '../../atoms'
import { searchEmployeesAction, searchEmployeesFlagResetAction } from './logic'
import { errorStatusNotificationAction } from '../StatusNotification/logic'
import { apiCall } from '../../../services/httpService'

function SearchEmployee({ active = [], open = false, onClose = () => null, params = {}, onSave = () => null, saveData = [] }) {
  const { loading, error, data = [], flag } = useIntialSelector('searchEmployees')
  const collectionId = useSelector(state => state.getCollectionId)
  const [selectedRows, setSelectedRows] = useState([])
  const [otherSelectedRows, setOtherSelectedRows] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(searchEmployeesAction(params))
      // dispatch(searchEmployeesAction({
      //   EmpName: params?.EMPLOYEE_NAME,
      //   EmpNumber: params?.EMPLOYEE_NUMBER,
      //   EmailAddress: params?.EMPLOYEE_EMAIL,
      //   HrLocation: params?.EMPLOYEE_LOCATION
      // }))
    }
  }, [open])

  useEffect(() => {
    if (flag) {
      const activeRows = active.filter(d => data.findIndex(z => z.EMPLOYEE_ID === d.EMPLOYEE_ID) !== -1)
      const otherActiveRows = active.filter(d => data.findIndex(z => z.EMPLOYEE_ID === d.EMPLOYEE_ID) === -1)
      setSelectedRows(activeRows.map(d => d.EMPLOYEE_ID))
      setOtherSelectedRows(otherActiveRows)
      searchEmployeesFlagResetAction()
    }
  }, [flag])

  async function onSelectedRowsChange (checked, val) {
    if (checked) {
      let valid = false
      const check = saveData.map(d => d.EMPLOYEE_ID)
      const EmployeeName = data.find(d => d.EMPLOYEE_ID === val).EMPLOYEE_NAME 
      if (check.includes(val)) {
        dispatch(errorStatusNotificationAction({
          type: 'billing-title-cde',
          message: `Employee Name (${EmployeeName}) already belongs to current Collection`
        }))
      } else {
        try {
          const [res] = await apiCall({
            method: 'get',
            url: '/ValidateEmployeeDetails',
            params: { CollectionID: collectionId, EmployeeName: EmployeeName, EmployeeID: val }
          })
          if (res && res.FINAL_STATUS === 'FAILED') {
            dispatch(errorStatusNotificationAction({
              type: 'employee-name',
              message: res.ERROR_OUT_MSG
            }))
          } else {
            valid = true
          }
        } catch (error) {
          dispatch(errorStatusNotificationAction({
            type: 'employee-name',
            message: error.message
          }))
        }
      }
      if (valid) {
        const values = [val]
        setSelectedRows([...selectedRows, ...values])
      }
    } else {
      const values = [val]
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }

  const onDone = () => {
    const selectedData = selectedRows.map(d => data.find(m => m.EMPLOYEE_ID === d))
    onSave([...selectedData, ...otherSelectedRows])
    onClose()
  }

  const disabled = [...active.map(d => d.EMPLOYEE_ID)]

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='select-employees'>Select Employee(s)</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent>
          <Box m={3}>
            <DataGrid
              className='rdg-header-white'
              rowHeight={40}
              headerRowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              rowKeyGetter={row => row.EMPLOYEE_ID}
              columns={SEARCH_COLUMNS}
              rows={data}
              style={{height: 'calc(80vh*(9/13))' }} 
              otherFunctions={{ onSelectedRowsChange, selectedRows, selectorKey: 'EMPLOYEE_ID', disabled }}
            />
          </Box>
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button disabled={!selectedRows.length} onClick={onDone} variant="contained">Done</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default SearchEmployee


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '60%',
  height: '85vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  borderBottom: '1px solid #E1E1E1',
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
  height: 'calc(85vh - 80px - 3em)',
  overflow: 'auto'
})

const BootstrapButton = styled('div')({
  textDecoration: 'underline',
  fontSize: 14,
  lineHeight: 1.5,
  cursor: 'pointer'
});
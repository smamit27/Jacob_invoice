import { Modal, Box, styled, Button, Stack, Grid, FormControl, OutlinedInput, IconButton } from '@mui/material'
import React, { useState ,useEffect} from 'react'
import DataGrid, { SelectColumn } from 'react-data-grid'
import {  getUniqueIdFromApi } from '../../../services/httpService'
import { useDispatch, useSelector } from 'react-redux'
import Label from '../../atoms/Label';
import { Loader } from '../../atoms'
import { SEARCH_EMPLOYEE_COLUMN } from './constants';
import {searchEmployeeIdAction,searchEmployeeIdFlagResetAction} from './logic'
///import SearchEmployee from './SearchEmployee'
import { generateRandomString } from '../../../helpers';
import ModalTitle from '../../atoms/Modal/ModalTitle'

const INPUT = {
  ...{
    'EMPLOYEE_NUMBER': "",
  }
}

function AddEmployee({ active = [],open = false, onClose = () => null, onSave = () => null }) {
    const dispatch = useDispatch()
    const [otherSelectedRows, setOtherSelectedRows] = useState([])

 const [input, setInput] = useState(INPUT)
 const {loading, error,data=[], flag } = useSelector(state => state.searchEmployeeIdReducer)
  const [selectedRows, setSelectedRows] = useState(new Set())

  const onChange = (val, key) => {
    setInput(d => ({
      ...d,
      [key]: val
    }))
  }
  useEffect(() => {
    if (flag) {
      const activeRows = active.filter(d => data.findIndex(z => z.persoN_ID === d.persoN_ID) !== -1)
      const otherActiveRows = active.filter(d => data.findIndex(z => z.persoN_ID === d.persoN_ID) === -1)
      setSelectedRows(new Set(activeRows.map(d => d.persoN_ID)))
      setOtherSelectedRows(otherActiveRows)
      searchEmployeeIdFlagResetAction()
    }
  }, [flag])
  const onSearch = () => {
      dispatch(searchEmployeeIdAction({personId:Number(input.EMPLOYEE_NUMBER)}))
      dispatch(searchEmployeeIdFlagResetAction())
  }

  const onSaveClick = async () => {
    const temp = Array.from(selectedRows)
    const selectedData = temp.map(d => data.find(m => m.persoN_ID === d))
    const id = await getUniqueIdFromApi('/GetEmployeeRateGroupOverrideSeq', 'ERG_ID')
    const mapped = selectedData.map(d => ({EMPLOYEE_NAME: d.fulL_NAME,
                                            EMPLOYEE_NUMBER:d.employeE_Number,
                                            EMPLOYEE_PU: d.performancE_UNIT,
                                            EMPLOYEE_LEGAL_ENTITY: d.legalentity,
                                            START_DATE: '',
                                            END_DATE : '',
                                            RATE_GROUP_OVERRIDE: '',
                                            ERG_ID: id,
                                            SAVE_MODE: 'I',
                                            tableRowId: generateRandomString() }))
    onSave([...mapped, ...otherSelectedRows],active)
    onClose()
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='add-employee' >Add Employee(s)</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent>
            <Box m={3}>
            <Grid container spacing={3} alignItems="flex-end" mb={3} >
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <FormControl fullWidth >
                  <Label>Search employee Id</Label>
                  <OutlinedInput placeholder="Search" value={input.EMPLOYEE_NUMBER} onChange={(e) => onChange(e.target.value, 'EMPLOYEE_NUMBER')} size="small" fullWidth  />
                </FormControl>
              </Grid>             
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <Button onClick={onSearch} variant="contained" size="small" color="secondary" disabled={!input?.EMPLOYEE_NUMBER} >Search</Button>
              </Grid>
            </Grid>
            </Box>
            <Box m={3}>

            {data.length > 0 && (
              <DataGrid
              rowHeight={40}
              headerRowHeight={60}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              style={{ height: 'calc(85vh - 80px - 6em)' }}
              columns={[SelectColumn, ...SEARCH_EMPLOYEE_COLUMN]}
              rowKeyGetter={row => row.persoN_ID}
              rows={data}
              selectedRows={selectedRows}
              onSelectedRowsChange={setSelectedRows}
            /> )}
            </Box>
     </TableContent>

        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button onClick={onSaveClick} disabled={!selectedRows.size} variant="contained">Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default AddEmployee


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
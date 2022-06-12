import { Modal, Box, styled, Button, Stack, Grid, FormControl, OutlinedInput, IconButton } from '@mui/material'
import React, { useState } from 'react'
import DataGrid from 'react-data-grid'
import Label from '../../atoms/Label';
import { Loader, ModalTitle } from '../../atoms'
import { SEARCH_COLUMNS } from './constants';
import SearchEmployee from './SearchEmployee'

const INPUT = {
  ...{
    'EMPLOYEE_NAME': "",
    'EMPLOYEE_NUMBER': "",
    'EMPLOYEE_EMAIL': "",
    'EMPLOYEE_LOCATION': "",
  }
}

function AddEmployee({ open = false, onClose = () => null, onSave = () => null, saveData = [] }) {
  const [input, setInput] = useState(INPUT)
  const [advanced, setAdvanced] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const [employees, setEmployees] = useState([])

  const onChange = (val, key) => {
    setInput(d => ({
      ...d,
      [key]: val
    }))
  }

  const onAdvancedSearch = () => {
    setAdvanced(!advanced)
    setInput(INPUT)
  }

  const onSearch = () => {
    setOpenSearch(true)
  }

  const onSearchedData = (dat) => {
    setInput(INPUT)
    setEmployees(dat)
  }

  const onRowDelete = (dat) => {
    setEmployees(employees.filter(d => d.EMPLOYEE_ID !== dat.EMPLOYEE_ID))
  }

  const onSaveClick = () => {
    onSave(employees)
    onClose()
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='add-employees' >Add Employee(s)</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent>
          <Box m={3}>
            <Grid container spacing={3} alignItems="flex-end" mb={3} >
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <FormControl fullWidth >
                  <Label>Search employee name</Label>
                  <OutlinedInput placeholder="Search" value={input.EMPLOYEE_NAME} onChange={(e) => onChange(e.target.value, 'EMPLOYEE_NAME')} size="small" fullWidth  />
                </FormControl>
              </Grid>
              {advanced && (<>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                  <FormControl fullWidth >
                    <Label>Search employee number</Label>
                    <OutlinedInput placeholder="Search" value={input.EMPLOYEE_NUMBER} onChange={(e) => onChange(e.target.value, 'EMPLOYEE_NUMBER')} size="small" fullWidth  />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                  <FormControl fullWidth >
                    <Label>Search email address</Label>
                    <OutlinedInput placeholder="Search" value={input.EMPLOYEE_EMAIL} onChange={(e) => onChange(e.target.value, 'EMPLOYEE_EMAIL')} size="small" fullWidth  />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                  <FormControl fullWidth >
                    <Label>Search HR location</Label>
                    <OutlinedInput placeholder="Search" value={input.EMPLOYEE_LOCATION} onChange={(e) => onChange(e.target.value, 'EMPLOYEE_LOCATION')} size="small" fullWidth  />
                  </FormControl>
                </Grid>
              </>)}
              <Grid item xs={12} sm={12} md={6} lg={6} >
                <Button onClick={onSearch} variant="contained" size="small" color="secondary" disabled={!input?.EMPLOYEE_NAME} >Search</Button>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <BootstrapButton onClick={onAdvancedSearch} >{!advanced ? 'Advanced search' : 'Basic Search'}</BootstrapButton>
              </Grid>
            </Grid>
            {!!employees.length && (
              <DataGrid
                className='rdg-header-white'
                style={{height: 'calc(80vh*(9/13))' }} 
                rowHeight={40}
                headerRowHeight={60}
                rowKeyGetter={row => row.EMPLOYEE_ID}
                columns={[
                  ...SEARCH_COLUMNS,
                  {
                    resizable: false,
                    width: 50,
                    "key": "",
                    "name": "",
                    "formatter": ({ row, otherFunctions }) => {
                      const { onRowDelete = () => null } = otherFunctions
                      return <IconButton onClick={() => onRowDelete(row)} ><i className="lar la-times-circle" /></IconButton>
                    }
                  },
                ]}
                rows={employees}
                otherFunctions={{ onRowDelete }}
              />
            )}
          </Box>
          {openSearch && <SearchEmployee saveData={saveData} active={employees} onSave={onSearchedData} params={input} open={openSearch} onClose={() => setOpenSearch(false)} />}
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button onClick={onSaveClick} disabled={!employees.length} variant="contained">Save</Button>
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
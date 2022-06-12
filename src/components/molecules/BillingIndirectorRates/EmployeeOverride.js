import { Modal, Box, styled, Button, Stack, Grid, FormControl, OutlinedInput, IconButton } from '@mui/material'
import React, { useEffect, useState,useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataGrid from 'react-data-grid'
import { SEARCH_COLUMNS,formEmployeeSaveData } from './constants';
import AddEmployee from './AddEmployee'
import {rateGroupTableAction,rateGroupTableFlagResetAction} from '../PuMapping/logic'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import useLazyLoad from '../../../hooks/useLazyLoad'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import {getEmployeeRateGroupAction,saveEmployeeOverrideAction} from './logic'
import ModalTitle from '../../atoms/Modal/ModalTitle'


function EmployeeOverride({ open = false, onClose = () => null, onSave = () => null }) {
  const dispatch = useDispatch()
  const { data: rateGroupData, flag: rateGroupFlag } = useSelector(state => state.rateGroupTableReducer)
  const { data = [], flag } = useSelector(state => state.getEmployeeRateGroupReducer)
  const [selectedProjectNum, setSelectedProjectNum] = useState([])
  const [openSearch, setOpenSearch] = useState(false)
  const [employees, setEmployees] = useState([])
  const formColumns = [...SEARCH_COLUMNS]
  const [columnsData, setColumnsData] = useState(formColumns)
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const [selectedRows, setSelectedRows] = useState(new Set())
  // const [childData, setChildData] = useState({})

  const collectionId = useSelector(state => state.getCollectionId)

  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      collectionID: collectionId,
      moduleId:  13,
      orderBy: 1,
    },
    url: '/GetEmployeeRateGroup',
    rows: data,

  })
  useEffect(() => {
    dispatch(rateGroupTableAction())
    dispatch(getEmployeeRateGroupAction({
      collectionID: collectionId,
      moduleId: 13,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 1000,
    }))

  }, [])
  useEffect(() => {
    if(flag){
      setSelectedProjectNum(data.map((d)=>({...d,"SAVE_MODE": 'U'})))

    }

  }, [flag])
  useEffect(() => {
    if (rateGroupFlag) {
      const rateGroupOptions = rateGroupData.map(d => ({ id: d.ID, description: d.Description }))
      setColumnsData(columnsData.map(d => d.key === 'RATE_GROUP_OVERRIDE' ? {...d, valueOptions: rateGroupOptions } : d))
      dispatch(rateGroupTableFlagResetAction())
    }
  }, [rateGroupFlag])

  const onSearchedData = (dat) => {
    setSelectedProjectNum(dat)
    createSaveData(dat)
    //onClose()


  }

  const onAddEmployee = () => {
    setOpenSearch(true)

  }

  const onSaveClick = () => {
    const payload = formEmployeeSaveData(selectedProjectNum, 13, collectionId)
    dispatch(backDropLoaderOpenAction())
    dispatch(saveEmployeeOverrideAction(payload))
 
  }
  const onRowsChange = (newRows, ...args) => {
    setRowsData(newRows)
    setSelectedProjectNum(newRows)

  }
  
  function createSaveData (row, type = '') {
    const oldSaveData = [...prevSaveData.current]
    const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
    const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
    const newSaveData = [
      ...filterData,
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.type || 'U' }] : [])
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }
  function rowKeyGetter(row) {
    return row.tableRowId;
  }
 

  function onSelectedRowsChange (val) {
    setSelectedRows(val)
    setSelectedProjectNum(val)
  }

  
  const getChange = async (editedRow, key) => {
    try {   
        createSaveData(editedRow)
    } catch (error) {

    }
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='employee-rate-group-override' >Employee Rate Group Override</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" mt={1} mr={2}>
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <Button size="small" variant="contained" color="secondary" onClick={onAddEmployee} >Add Employee</Button>
          </Stack>
        </Grid>
      </Grid>
        <TableContent>
          <Box m={3}>
            {!!selectedProjectNum && (
             
        <DataGrid
          onScroll={handleScroll}
          otherFunctions={{ getChange }}
          rowHeight={40}
          headerRowHeight={60}
          noRowsFallback={<Loader noData={true} style={{ height: '70vh', position: 'sticky', left: 0 }} />}
          onRowsChange={onRowsChange}
           style={{ height: '80vh' }}
          rowKeyGetter={rowKeyGetter}
          selectedRows={selectedRows}
          onSelectedRowsChange={onSelectedRowsChange}
          columns={[...columnsData]}
          rows={selectedProjectNum}
        />
             )}
          </Box>
          {openSearch && <AddEmployee active={selectedProjectNum} onSave={onSearchedData} open={openSearch} onClose={() => setOpenSearch(false)} />}
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button onClick={onClose} >Cancel</Button>
            <Button onClick={onSaveClick} disabled={!selectedProjectNum.length} variant="contained">Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default EmployeeOverride


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '80%',
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
  // borderBottom: '1px solid #E1E1E1',
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
  height: 'calc(78vh - 80px - 3em)',
  overflow: 'auto'
})

const BootstrapButton = styled('div')({
  textDecoration: 'underline',
  fontSize: 14,
  lineHeight: 1.5,
  cursor: 'pointer'
});